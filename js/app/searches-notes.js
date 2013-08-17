			
			// a single search
			var Search = Backbone.Model.extend({
				defaults: {
					query: 'a search',
					userid: aB.userid
				}
			});
			
			// view for a single search
			var SearchView = Backbone.View.extend({
				model: Search,
				el: $('#savedsearches'),
				initialize: function(){
					this.render();
				},
				tagName: "li",
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
			
			// collection of searches
			var SearchList = Backbone.Collection.extend({
				model: Search, 
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.df_userid + "'&fields=query",  // final, fine tuned URL
				initialize: function(){		
					// creating this collection fetches data from server
					//this.fetch();
					//console.log('getting user stations')
				},
				parse : function(resp) {
					console.log('parsing response');
				  console.log(resp);
        }
			});
			
			// list view of collection of searches					
			var SearchListView = Backbone.View.extend({
				collection: SearchList,
				el: $('#savedsearches'),
				initialize: function(){
					
					this.collection.fetch({
						success: function(response){
							console.log('got SearchListView response');
							console.log(response);
						}
					}); 
					this.collection.on('reset', this.render, this);
					this.collection.on('add', this.add, this);
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
			
			var searchListView = new SearchListView({
				collection:searchList
			});

			var searchView = new SearchView({
				model:search
			});

						