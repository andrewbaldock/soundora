/* github.com/andrewbaldock/soundora */

define(["jquery", "json2", "backbone", "app/df_auth"], function($,Backbone,df_auth) {
  aB.fn.Searches = function() {
  	require(['backbone','app/df_auth'], function (Backbone, df_auth) {

			Backbone.sync = function(method, model, success, error){
				console.log('backbone sync');
			}
		
			var Search = Backbone.Model.extend({
				idAttribute: "id",
				urlRoot: "https://dsp-song.cloud.dreamfactory.com/rest/db/userSearches/",
				defaults: {
					query: 'interscope',
					userid: aB.userid
				}
			});

			var List = Backbone.Collection.extend({
				model: Search,
				url: "https://dsp-song.cloud.dreamfactory.com/rest/db/userSearches/",
				parse : function(resp) {
          return resp;
        },
				initialize: function(){		// Deferred load
					this.fetch();
				}
			});
			
			var searchView = Backbone.View.extend({
				//tagName: 'li', // name of (orphan) root tag in this.el
				
				events: {
					'click a': 'doSearch',
					'click .delete': 'deleteSearch'
				},
				
				initialize: function(){
					_.bindAll(this, 'render', 'add', 'delete'); // every function that uses 'this' as the current object should be in here
					this.model.bind('add', this.render);
					this.model.bind('delete', this.unrender);
				},
				render: function(){
					$(this.el).append('<div class="asearch-wrap"><em class="icon-remove-circle delete"></em><a class="asearch" href="#">' + +this.model.get('query')+ + '</a></div>');	
					return this; // for chainable calls, like .render().el
					console.log('backbone rendered a search');
				},
				unrender: function(){
					$(this.el).remove();
					console.log('backbone unrendered a search');
				}
				
			});

			/* ListView class: Our main app view. */
			var ListView = Backbone.View.extend({
				el: $('#savedsearches'), // attaches `this.el` to an existing element.
				initialize: function(){
					// fixes loss of context for 'this' within methods
					_.bindAll(this, 'render', 'addSearch', 'doSearch', 'deleteSearch'); 
					this.collection = new List();
					// bind Backbone's Add event to my appendSearch function
					this.collection.bind('add', this.appendSearch); 
					this.render(); // not all views are self-rendering. This one is.
				},

				render: function(){
					// run upon view init
					var self = this; // so it can be accessed from the callback below
					$(this.el).html('<h3>Your Searches</h3>');
					
					// in case collection is not empty
					_(this.collection.models).each(function(search){ 
						self.appendSearch(search);
					}, this);
					
					console.log('backbone view loaded into dom');
				},
				
				addSearch: function(){
					var search = new Search();
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
				}
				
			}); //end ListView class

			// listView instance: Instantiate main app view. 
			aB.listView = new ListView();
			
    	})	
  };
});
