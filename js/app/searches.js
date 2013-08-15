/* github.com/andrewbaldock/soundora */

define(["jquery", "json2", "backbone"], function($,Backbone) {
  aB.fn.Searches = function() {
  	  require(['backbone'], function (Backbone) {
  	  
  	  
  	    		var Search = Backbone.Model.extend({
    					defaults: {
      					query: 'interscope',
      					userId: aB.userid
   				 		}
 					  });
  	  
  	  			var List = Backbone.Collection.extend({
    					model: Search
  					});
  	  
						/* ListView class: Our main app view. */
						var ListView = Backbone.View.extend({
							el: $('#listview'), // attaches `this.el` to an existing element.

							events: {
								'click a': 'doSearch',
								'click .delete': 'deleteSearch'
							},

							initialize: function(){
								// fixes loss of context for 'this' within methods
								_.bindAll(this, 'render', 'doSearch', 'deleteSearch'); 
								this.collection = new List();
								// bind Backbone's Add event to my appendSearch function
      					this.collection.bind('add', this.appendSearch); 
								this.render(); // not all views are self-rendering. This one is.
							},


							render: function(){
							 var self = this; // so it can be accessed from the callback below
								$(this.el).append('<h3>Your Searches</h3>');
								_(this.collection.models).each(function(seearch){ // in case collection is not empty
        					self.appendSearch(search);
     					  }, this);
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
      					this.collection.add(search);
    					},
    					
							appendSearch: function(search){
								$(this.el).append('<div class="asearch-wrap"><em class="icon-remove-circle delete"></em><a class="asearch" href="#">' + +search.get('query')+ + '</a></div>');
							}
 						  
						}); //end ListView class

						// listView instance: Instantiate main app view. 
						aB.listView = new ListView();
						
						

    	})	
    
  };
});
