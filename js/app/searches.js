/* github.com/andrewbaldock/soundora */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
  		$.ajaxSetup({ headers: { 'X-DreamFactory-Session-Token':aB.sessionId}  });
			
			/* a Search is:
				- 'query' = the query terms,
				- 'aB.userid' the social id of user,
				- a method to perform search,
				- a method to delete search
			*/
			var Search = Backbone.Model.extend({
				defaults: {
					query: null,
					userid: aB.userid
				}
			});
			
			var SearchList = Backbone.Collection.extend({
				model: Search,
				url: aB.baseurl + "/db/searches" + aB.apikey + "&filter=userid%3D'" + escape(aB.userid) + "'",
				parse : function(resp) {
          return resp;
        },
				initialize: function(){		
					this.fetch();
					aB.loopcounter++;
					console.log('bb ajax fired')
				}
			});
			
			
			var SearchView = Backbone.View.extend({
				el: $('#savedsearches'),
				initialize: function(){
					this.render();
				},
				addSearch: function(){
					var search = new aB.Search();
					//get the search from the search field
					var userinput = $('input#query').val().toLowerCase(); 
					
					//isDupe routine from stackoverflow.com/questions/6416958/
					var isDupe = this.any(function(_search) { 
							return _search.get('query') === search.get('query');
					});
					if (isDupe) {
						console.log('dupe search detected, not creating');
						return false;
					};
					search.set({
						query: userinput 
					});
					// add search to collection; event 'add' fires appendSearch per init. to update the view
					this.collection.add(search); 
					console.log('search added');
				},
				doSearch: function(search){
					console.log('do search');
					$('input#query').val( search.get('query') );
					$('#thequery button').click();
				},
				deleteSearch: function(search){
					console.log( 'delete search' + search.get('query') );
					this.collection.delete(search);
				},
				appendSearch: function(search){
					var searchView = new searchView({
						model: search
					});
					//relegate actual item redering to searchView
					$(this.el).append(searchView.render().el);
				},
				render: function(){
					$(this.el).html('<h3>Your Searches</h3><div id="searches"></div>');
					$(this.el).append('<div class="asearch-wrap"><em class="icon-remove-circle delete"></em><a class="asearch" href="#">' + this.model.get('query') + '</a></div>');
				}
			});
			
			// create single search item					
			var search = new Search(
				{userid:aB.userid, query:'interscope'}
			);
			
			// create new collection
			var searchList = new SearchList({});
			
			searchList.fetch({ 
				
			});
			
			var searchView = new SearchView({
				model:search,
				events: {
					'click a': 'doSearch',
					'click .delete': 'deleteSearch'
				}
			});

			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
