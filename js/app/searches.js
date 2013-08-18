/* github.com/andrewbaldock/soundora */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
  		// todo: get real df user id
  		aB.df_userid = 1;
  		
  		/* 
  		/db/users?filter=userid%3D'111684386200137446092g'&fields=id%2Cuserid
  		aB.baseurl + "/db/searches?filter=userid%3D'111684386200137446092g'&fields=query
  		*/
  		
  		/* WORKS
  		aB.baseurl + "/db/searches?filter=userid%3D'" + aB.df_userid + "'&fields=query",  // final, fine tuned URL
  		*/
  		
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
					query:''
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
					console.log(event);
					// TODO
				}
			});

			/*
			COLLECTION: list of Searches
			-----------------------------------------------------------------*/
			var SearchCollection = Backbone.Collection.extend({
				model: aB.Search,
			//url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.df_userid + "'&fields=query",  // final, fine tuned URL
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query",
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
							this.collection.on("add", this.render, this);
							this.render();
					},
					render: function() {
							console.log('post-parse: SearchCollectionView "this.collection":');
							console.log(this.collection);
							//var results = this.collection.models[0].attributes.record;
							var results = this.collection.models;
							console.log('converting to "results":');
							console.log(results);
							if(aB.remotedata) {
								console.log('backbone got ' + results.length + ' search records via ajax');
							} else {
								console.log('backbone made ' + results.length + ' search records locally');
							}
							
							if (results.length === 0) {
								this.$el.html('<h3>Search for an Artist, Song, or Genre<br>to create Soundora Stations</h3>');
							} else {
							
								this.$el.html('<h3>Your Stations</h3>');
								//console.log(this.collection.url);
								
								_.each(results, function(data) {
										// here is the heavy lifting of getting onto view
										console.log('inside each, here is "data":');
										console.log(data.attributes.model);
										this.$el.append( new SearchView({model: data.attributes.model}).render().el);  // genius, essential
								}, this);
							
							}
					}
			});

			

			/*
			START get remote data and begin. (use this OR section below)
			----------------------------------------------------------------*/
			if(aB.userid != 'none') {
			  aB.remotedata = true;
				aB.searchCollection = new SearchCollection();

				aB.searchCollection.fetch({
						success: function() {
								console.log('backbone collection activated: user logged in');
								new SearchCollectionView({collection: aB.searchCollection});
						},
						error: function() {
								console.log('backbone collection activated: oh noes fetch fail');
						}
				}); 
			} else { 
				console.log('backbone collection activated: user not logged in');


				/*
				TEST with local data - use this OR section above
				-----------------------------------------------------------------
				aB.remotedata=false;
				var search1 = new aB.Search({query:'localdatafunk'});
				var search2 = new aB.Search({query:'hillbullylocaldata'});
				var searchCollection = new SearchCollection([search1, search2]);
				// start!
				var view = new SearchCollectionView({collection: searchCollection}).render();
				// End of test code
			*/
			};

			
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
