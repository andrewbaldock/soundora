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
  		
  		/*
			MODEL: individual Search item
			-----------------------------------------------------------------*/
			aB.Search = Backbone.Model.extend({
				defaults: {
					userid:aB.userid
				},
				create: function() {
					this.save();
				},
				remove: function() {
					this.destroy();
				},
/*---------------------------------------------------------------------------------*/
				url: aB.baseurl + "/db/searches"
			/*---------------------------------------------------------------------------------*/
			});
			
			/*
			VIEW / model: Item view for a single search - uses templates
			-----------------------------------------------------------------*/
			var SearchView = Backbone.View.extend({
				model:aB.Search,
				/* tagName: "li", */     // auto-wrap in an html element
				template: _.template($("#searches-template").html()),
				url: aB.baseurl + "/db/searches",
				render: function() {
						this.$el.html(this.template(this.model));
						return this;
				},
				events: {
					'click .asearch': 'doSearch',
					'click .delete': 'deleteSearch'
				},
				doSearch: function(){
					console.log('play station ' + this.model.query);
					$('input#query').val( this.model.query);
					$('#thequery button').click();
				},
				deleteSearch: function(event){
					console.log( 'delete search ' + this.model.query );
					console.log(this);
					console.log(this.model.id);
					
					aB.searchCollection.remove(this.model);
/*
					//COMPLETELY UNBIND THE VIEW
					this.undelegateEvents();
					this.$el.removeData().unbind(); 
					//Remove view from DOM
					this.remove();  
					Backbone.View.prototype.remove.call(this);
	*/				
				}
			});

			/*
			COLLECTION: list of Searches
			-----------------------------------------------------------------*/
			var SearchCollection = Backbone.Collection.extend({
				model: aB.Search,
			/*---------------------------------------------------------------------------------*/
				url: aB.baseurl + "/db/searches?filter=userid%3D'" + aB.userid + "'&fields=id,query",
			/*---------------------------------------------------------------------------------*/
				parse: function(resp) {
						//console.log('pre-parse: "resp":');
						//console.log(resp);
						aB.mcount = 0;
						_.each(resp.record, function(data) {
										//console.log('SearchCollection parse: inside each, here is "data":');
										//console.log(data);
										aB['model'+ aB.mcount] = new aB.Search({model: data}); 
										this.models.push( aB['model'+ aB.mcount] ); // genius, essential
										aB.mcount=aB.mcount+1;
						}, this);
						//console.log(this);
				},
				initialize: function() {
					//console.log('collection initialize: "this":');
					//console.log(this);
				},
				remove: function(model){
					console.log('inside collection remove');
					console.log(model.id);

					
					//xmodel.destroy();
				}
			});
			
			/*
			VIEW / collection: List view to render the search collection into
			-----------------------------------------------------------------*/
			var SearchCollectionView = Backbone.View.extend({
				el: $('#savedsearches'),
				initialize: function() {
						// not sure these are doing anything
						this.collection.on("reset", this.render, this);
    				this.collection.on("add", this.render, this);
    				this.collection.on("remove", this.render, this);
    				this.collection.on("push", this.render, this);
						this.render();
				},
				remove: function() {
					var zmodel = this.model.get(this.model.id);
					zmodel.destroy();
				},
				render: function() {
						//console.log('post-parse: SearchCollectionView "this.collection":');
						//console.log(this.collection);
						
						var results = this.collection.models;
            console.log('backbone got ' + results.length + ' search records');
						
						if (results.length === 0) {
							this.$el.html('<h3>Welcome!</h3>');
						} else {
								this.$el.html('');
								
								var self = this;
								_.each(results, function(data) {
										//console.log('inside each, here is "data":');
										//console.log(data);
										self.$el.append( new SearchView({model: data.attributes.model}).render().el);  // genius, essential
								}, this);
						
						 }
						 aB.arranger();
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
								console.log('backbone collection activated: user logged in');
								if(typeof aB.searchCollectionView == 'undefined') {
									aB.searchCollectionView = new SearchCollectionView({collection: aB.searchCollection});
								} else {
									//push new results into existing collectionview
									aB.searchCollectionView.render();
								}
						},
						error: function() {
								console.log('backbone collection activated: oh noes fetch fail');
						}
				}); 
		//	} else { 
		//		console.log('backbone collection activated: user not logged in');
		//	};
		
			//to ADD a record, this works awesome
			/*
			aB.searchCollection.models.push( new aB.Search({model: {"id":"5","query":"inside my love disco"} }) );
			aB.searchCollectionView.render();
			*/


			
			
    }) // end require	
  };  // end aB.fn.Searches
});  // end define
