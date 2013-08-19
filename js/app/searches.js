/* github.com/andrewbaldock/soundora */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
  		/*
			$.AJAX: Tell $.ajax to send dreamfactory headers 
			-----------------------------------------------------------------*/
  		$.ajaxSetup({ headers: { 
  			'X-DreamFactory-Session-Token':aB.sessionId, 
  			'X-DreamFactory-Application-Name':'soundora'
  		}});
  		
  		/*
			MODEL: individual Search item
			-----------------------------------------------------------------*/
			aB.Search = Backbone.Model.extend({
				defaults: {
					attributes: {
						query:'',
						userid:aB.userid
					}
				}
			});
			
			/*
			VIEW / model: Item view for a single search - uses templates
			-----------------------------------------------------------------*/
			var SearchView = Backbone.View.extend({
				model:aB.Search,
				/* tagName: "li", */     // auto-wrap in an html element
				template: _.template($("#searches-template").html()),
				render: function() {
						this.$el.html(this.template(this.model));
						return this;
				},
				events: {
					'click .asearch': 'doSearch',
					'click .delete': 'deleteSearch'
				},
				doSearch: function(){
					console.log('play station ' + this.model.query);
					$('input#query').val( this.model.query);
					$('#thequery button').click();
				},
				deleteSearch: function(event){
					console.log( 'delete search ' + this.model.query );
					console.log(this);
				}
			});

			/*
			COLLECTION: list of Searches
			-----------------------------------------------------------------*/
			var SearchCollection = Backbone.Collection.extend({
				model: aB.Search,
			/*---------------------------------------------------------------------------------*/
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query",
			/*---------------------------------------------------------------------------------*/
				parse: function(resp) {
						console.log('pre-parse: "resp":');
						console.log(resp);
						_.each(resp.record, function(data) {
										console.log('SearchCollection parse: inside each, here is "data":');
										console.log(data);
										this.models.push( new aB.Search({model: data}) ); // genius, essential
						}, this);
						console.log(this);
				},
				initialize: function() {
					console.log('collection initialize: "this":');
					console.log(this);
				}
			});
			
			/*
			VIEW / collection: List view to render the search collection into
			-----------------------------------------------------------------*/
			var SearchCollectionView = Backbone.View.extend({
				el: $('#savedsearches'),
				initialize: function() {
						// not sure these are doing anything
						this.collection.on("reset", this.render, this);
    				this.collection.on("add", this.render, this);
    				this.collection.on("remove", this.render, this);
    				this.collection.on("push", this.render, this);
						this.render();
				},
				render: function() {
						console.log('post-parse: SearchCollectionView "this.collection":');
						console.log(this.collection);
						
						var results = this.collection.models;
            console.log('backbone got ' + results.length + ' search records');
						
						if (results.length === 0) {
							this.$el.html('<h3>Search for an Artist, Song, or Genre<br>to create Soundora Stations</h3>');
						} else {
								this.$el.html('<h3>Your Stations</h3>');
								
								var self = this;
								_.each(results, function(data) {
										console.log('inside each, here is "data":');
										console.log(data);
										self.$el.append( new SearchView({model: data.attributes.model}).render().el);  // genius, essential
								}, this);
						
						 }
					}
			});

			

			/*
			START get remote data and begin. (use this OR section below)
			----------------------------------------------------------------*/
			if(aB.userid != 'none') {
			  aB.remotedata = true;
			  
			  if(typeof aB.searchCollection == 'undefined') {
					aB.searchCollection = new SearchCollection();
				}

				aB.searchCollection.fetch({
						success: function() {
								console.log('backbone collection activated: user logged in');
								if(typeof aB.searchCollectionView == 'undefined') {
									aB.searchCollectionView = new SearchCollectionView({collection: aB.searchCollection});
								} else {
									//push new results into existing collectionview
									aB.searchCollectionView.reset();
								}
						},
						error: function() {
								console.log('backbone collection activated: oh noes fetch fail');
						}
				}); 
			} else { 
				console.log('backbone collection activated: user not logged in');
			};
		
			//to ADD a record, this works awesome
			/*
			aB.searchCollection.models.push( new aB.Search({model: {"id":"5","query":"inside my love disco"} }) );
			aB.searchCollectionView.render();
			*/


			
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
