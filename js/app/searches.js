/* github.com/andrewbaldock/soundora */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
  			$.ajaxSetup({ headers: { 'X-DreamFactory-Session-Token':aB.sessionId}  });
  	
  			aB.baseurl = "https://dsp-song.cloud.dreamfactory.com/rest";
				aB.apikey = '?app_name=soundora';

			
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
				url: aB.baseurl + '/db/userSearches' + aB.apikey + '&filter=userid%3D' + '5',
				parse : function(resp) {
          return resp;
        },
				initialize: function(){		
					this.fetch();
					aB.loopcounter++;
					console.log('bb ajax fired ' + aB.loopcounter)
				}
			});
			
			
			var SearchView = Backbone.View.extend({
				el: $('#savedsearches'),
				initialize: function(){
					this.render();
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
