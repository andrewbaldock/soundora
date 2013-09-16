/* github.com/andrewbaldock/skylabfm */
aB.loopcounter=0;
define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {
  	
			//////////////////////////
			// 
			//  0. AJAX
			// 
			//////////////////////////
  		$.ajaxSetup({ headers: { 
  			'X-DreamFactory-Session-Token':aB.sessionId, 
  			'X-DreamFactory-Application-Name':'soundora'
  		}});
  		
			//////////////////////////
			// 
			//  1. MODEL
			// 
			//////////////////////////
			aB.Search = Backbone.Model.extend({
				defaults: {
					userid:aB.userid
				},
				// urlRoot: aB.baseurl + "/db/searches"
				// above not working, fix is: github.com/jashkenas/backbone/issues/789
				url: function() {
        	return  aB.baseurl + "/db/searches" + (this.has("id") ? "/" + this.get("id") : "");
    		}
			});
			
			//////////////////////////
			// 
			//  2. COLLECTION
			// 
			//////////////////////////
			var SearchCollection = Backbone.Collection.extend({
				model: aB.Search,
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query",
				parse: function(resp) {
						console.log('pre-parse: "resp.record":');
						console.log(resp.record);
						return resp.record;
				} 
			});
			
			//////////////////////////
			// 
			//  3. VIEW
			// 
			//////////////////////////
			var SearchView = Backbone.View.extend({
				el: $('#savedsearches'),
				initialize: function(){
        	this.el = $(this.el);
        },
				events: {
					'click .asearch': 'doSearch',
					'click .delete': 'deleteSearch',
					// Debug
        	'click #print-collection': 'printCollection'
				},
				template: $('#searches-template').html(),
				render: function(id,query) {
						var templ = _.template(this.template);
						var id = 
						this.el.append(templ({id: id,query: query}));
				},
				// additem function goes here
				doSearch: function(e){
					var query = this.$(e.target).text();
					console.log('play station ' + query);
					$('input#query').val( query);
					$('#thequery button').click();
				},
				showAll: function(){
					$('#savedsearches').html('');
					aB.searchCollection.each(function(item){
						aB.searchView.render(item.get('id'),item.get('query'));
					});
				},
				deleteSearch: function(e) {
					var id = this.$(e.target).parent('div').data("id");
					var query = this.$(e.target).text();
					console.log('deleting id ' + id);
					var wut = aB.searchCollection.get(id);
					wut.destroy();
					aB.searchCollection.remove(id);
					// Remove from DOM
					$(e.target).parent('div')
							.fadeOut(300,function() {
									$(this).remove();
							});
				},
    		printCollection: function(){
        	this.collection.each(function(item) {
            console.log(item.get('query'));
        	});
    		}
			});

	
			//////////////////////////
			// 
			//  4. START
			// 
			//////////////////////////
			if(typeof aB.searchCollection == 'undefined') {
				aB.searchCollection = new SearchCollection();
			} else {
				//searchcollection exixsts.  refresh its url in case user is logged in
				if(aB.userid != 'none') {
					aB.searchCollection.url = aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query";
				}
			}
			aB.loadSearches = function(){
				aB.searchCollection.fetch({
						success: function() {
								console.log('backbone got ' + aB.searchCollection.length + ' search records');
								if(typeof aB.searchView == 'undefined') {
									aB.searchView = new SearchView({collection: aB.searchCollection});
									/*aB.searchCollection.each(function(item){
										aB.searchView.render(item.get('id'),item.get('query'));
									}); */
									aB.searchView.showAll();
								} else {
									//push new results into existing collectionview
									aB.searchView.render();
								}
						},
						error: function() {
								console.log('backbone collection activated: oh noes fetch fail');
						}
				}); 
			}
			aB.loadSearches();
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
