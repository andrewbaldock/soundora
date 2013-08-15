/* github.com/andrewbaldock/soundora */

define(["jquery", "json2", "backbone"], function($,Backbone) {
  aB.fn.Searches = function() {
  	  require(['backbone'], function (Backbone) {
  	  
  	  
  	    		var Search = Backbone.Model.extend({
    					defaults: {
      					query: 'interscope'
   				 		}
 					  });
  	  
  	  			var List = Backbone.Collection.extend({
    					model: Search
  					});
  	  
						/* ListView class: Our main app view. */
						var ListView = Backbone.View.extend({
							el: $('#listview'), // attaches `this.el` to an existing element.

							events: {
								'click a': 'performSearch',
								'click .delete': 'deleteSearch'
							},

							initialize: function(){
								_.bindAll(this, 'render', 'deleteSearch'); // fixes loss of context for 'this' within methods

								 this.render(); // not all views are self-rendering. This one is.
							},


							render: function(){
								$(this.el).append('<div class="asearch-wrap"><em data-searchid="" class="icon-remove-circle delete"></em><a class="asearch" href="#"><!--search--></a></div>');
							},
							
							performSearch: function(){
      					console.log(this)
    					},
							
							deleteSearch: function(){
      					console.log('delete');
    					}
							
							
						});

						// listView instance: Instantiate main app view. 
						aB.listView = new ListView();
						
						

    	})	
    
  };
});
