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
			});
			
			/*
			VIEW / model: Item view for a single search - uses templates
			-----------------------------------------------------------------*/
			var SearchView = Backbone.View.extend({
				model:aB.Search,
				/* tagName: "li", */     // auto-wrap in an html element
				template: _.template($("#searches-template").html()),
				render: function() {
						// console.log(this.model); //verbose
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
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=query",
				parse: function(resp) {
						return resp;
				}
			});
			
			/*
			VIEW / collection: List view to render the search collection into
			-----------------------------------------------------------------*/
			var SearchCollectionView = Backbone.View.extend({
					el: $('#savedsearches'),
					initialize: function() {
							this.collection.bind("add", this.render, this);
					},
					render: function() {
							var results = this.collection.models[0].attributes.record;
							console.log('backbone got ' + results.length + ' search records via ajax');
							if (results.length === 0) {
								this.$el.html('<h3>Search for an Artist, Song, or Genre<br>to create Soundora Stations</h3>');
							} else {
								this.$el.html('<h3>Your Stations</h3>');
								console.log(this.collection.url);
								_.each(results, function(data) {
										// here is the heavy lifting of getting onto view
										this.$el.append( new SearchView({model: data}).render().el); 
								}, this);
							
							}
					}
			});

			

			/*
			START get remote data and begin. (use this OR section below)
			------------------------------------------------------------------*/
			if(aB.userid != 'none') {
			
				aB.searchCollection = new SearchCollection();

				aB.searchCollection.fetch({
						success: function() {
								console.log('backbone collection activated: user logged in');
								new SearchCollectionView({collection: aB.searchCollection}).render();
						},
						error: function() {
								console.log('backbone collection activated: oh noes fetch fail');
						}
				});
			} else { 
				console.log('backbone collection activated: user not logged in');
			}


			/*
			TEST with local data - use this OR section above
			------------------------------------------------------------------
			var search1 = new Search({query:'interscope'});
			var search2 = new Search({query:'pixies magnetic monkey'});
			var searchCollection = new SearchCollection([search1, search2]);
			// start!
			var view = new SearchCollectionView({collection: searchCollection}).render();
			// End of test code
			*/
			

			
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
