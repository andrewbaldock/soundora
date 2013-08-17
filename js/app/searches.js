/* github.com/andrewbaldock/soundora */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
  		// todo: get real df user id
  		aB.df_userid = 1;
  		
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
			var Search = Backbone.Model.extend({
				defaults: {
					query: 'a search'
				}
			});
			
			/*
			VIEW / model: Item view for a single search - uses templates
			-----------------------------------------------------------------*/
			var SearchView = Backbone.View.extend({
				/* tagName: "li", */     // auto-wrap in an html element
				template: _.template($("#searches-template").html()),
				render: function() {
						this.$el.html(this.template(this.model.toJSON()));
						return this;
				},
				events: {
					'click a': 'doSearch',
					'click .delete': 'deleteSearch'
				},
				doSearch: function(){
					console.log('play station ' + this.model.get('query'));
					$('input#query').val( this.model.get('query') );
					$('#thequery button').click();
				},
				
				deleteSearch: function(search){
					console.log( 'delete search' + this.model.get('query') );
					this.collection.delete(search);
				}
			});

			/*
			COLLECTION: list of Searches
			-----------------------------------------------------------------*/
			var SearchCollection = Backbone.Collection.extend({
				model: Search,
				url: "http://localhost:4000/get/employee",
				parse: function(resp) {
						console.log('response inside parse' + resp);
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
							_.each(this.collection.models, function(data) {
									this.$el.append(new SearchView({
											model: data
									}).render().el);
							}, this);
							return this;
					}
			});

			

			/*
			START get remote data and begin - use this OR section below
			------------------------------------------------------------------
			var searchCollection = new SearchCollection();

			searchCollection.fetch({
					success: function() {
							console.log(searchCollection.toJSON());
							new SearchCollectionView({collection: searchCollection}).render();
					},
					error: function() {
							console.log('oh noes fetch fail');
					}
			});
			*/

			/*
			TEST with local data - use this OR section above
			------------------------------------------------------------------*/
			var search1 = new Search({query:'interscope'});
			var search2 = new Search({query:'pixies magnetic monkey'});
			var searchCollection = new SearchCollection([search1, search2]);
			// start!
			var view = new SearchCollectionView({collection: searchCollection}).render();
			// End of test code
			
			
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
