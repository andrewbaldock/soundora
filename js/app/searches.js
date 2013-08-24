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
  		
			//////////////////////////
			// 
			//  1. MODEL
			// 
			//////////////////////////
			aB.Search = Backbone.Model.extend({
				defaults: {
					id:null,
					query:null,
					userid:aB.userid
				},
				url: aB.baseurl + "/db/searches"
			});
			
			
			//////////////////////////
			// 
			//  2. COLLECTION
			// 
			//////////////////////////
			var SearchCollection = Backbone.Collection.extend({
				model: aB.Search,
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query" ,
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
        	this.render();
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
						this.el.children('ul').append(templ({id: id,query: query}));
				},
				// additem function goes here
				doSearch: function(){
					console.log('play station ' + this.model.query);
					$('input#query').val( this.model.query);
					$('#thequery button').click();
				},
				deleteSearch: function(e) {
					var thisid = this.$(e.currentTarget).parent('div').data("id");
					var thisitem = this.collection.get(thisid);
					this.collection.remove(thisitem);
					// Remove from DOM
					$(e.target).parent('li')
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

			/*
			START get remote data and begin. (use this OR section below)
			----------------------------------------------------------------*/

			  if(typeof aB.searchCollection == 'undefined') {
					aB.searchCollection = new SearchCollection();
				} else {
					//searchcollection exixsts.  refresh its url in case user is logged in
					if(aB.userid != 'none') {
						aB.searchCollection.url = aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query";
					}
				
				}
			  

				aB.searchCollection.fetch({
						success: function() {
								console.log('backbone got ' + aB.searchCollection.length + ' search records');
								if(typeof aB.searchView == 'undefined') {
									aB.searchView = new SearchView({collection: aB.searchCollection});
								} else {
									//push new results into existing collectionview
									aB.searchView.render();
								}
						},
						error: function() {
								console.log('backbone collection activated: oh noes fetch fail');
						}
				}); 


			
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
