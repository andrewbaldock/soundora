/* github.com/andrewbaldock/soundora */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
  		$.ajaxSetup({ headers: { 
  			'X-DreamFactory-Session-Token':aB.sessionId, 
  			'X-DreamFactory-Application-Name':'soundora'
  		}});
			
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
				//url: aB.baseurl +'/db/users/1' + aB.apikey + '&field=userid',
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=query",
				parse : function(resp) {
				  console.log(resp);
          return resp;
        },
				initialize: function(){		
					this.fetch();
					console.log('getting user stations')
				}
			});
			
			// Our main app view.
			var SearchView = Backbone.View.extend({
				model: Search,
				el: $('#savedsearches'),
				initialize: function(){
					$(this.el).html('<h3>Your Stations</h3><div id="searches"></div>');
					this.render();
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
				},
				render: function(){
					$(this.el).append('<div class="asearch-wrap"><em class="icon-remove-circle delete"></em><a class="asearch" href="#">' + this.model.get('query') + '</a></div>');
				}
			});
			
						
			var SearchListView = Backbone.View.extend({
				collection: SearchList,
				el: $('#savedsearches'),
				initialize: function(){
					$(this.el).html('<h3>Your Searches</h3><div id="searches"></div>');
					this.model.bind("reset", this.render, this);
					this.render();
				},
				render: function(){
					$(this.el).append('<div class="asearch-wrap"><em class="icon-remove-circle delete"></em><a class="asearch" href="#">' + this.model.get('query') + '</a></div>');
				}
			});
			
			// create single search item					
			var search = new Search(
				{userid:aB.userid, query:'interscope'}
			);
			
			// create new collection
			var searchList = new SearchList({});
			
		
			
			var searchView = new SearchView({
				model:search
			});

			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
