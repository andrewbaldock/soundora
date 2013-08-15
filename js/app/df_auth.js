/* github.com/andrewbaldock/soundora */

define(["jquery", "json2"], function($) {
  aB.fn.df_auth = function() {
  
  		var baseurl = "https://dsp-song.cloud.dreamfactory.com/rest";
  		var apikey = '?app_name=soundora';
  		
  		// DELETE A SEARCH
  		aB.fn.df_auth.deleteItem = function(id) {
/*
				$.ajax({
						dataType:'json',
						type : "DELETE",
						url:baseurl + '/db/userSearches/' + id + apikey,
						cache:false,
						processData: false,
						success:function (response) {
								console.log('deleted search id: ' + id);
								aB.fn.df_auth.getSearches(); //refresh view
						},
						error: function(response) {
								console.log("There was an error deleting the search");
						},
						beforeSend: function (xhr) {
								xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
						}
   			 });
*/   			 
			};
   
  		
  		// CREATE SEARCH
  		aB.fn.df_auth.saveSearch =  function(searchterm){
/*  				//check for dupes
  				var isdupe = false;
  				if(aB.searchcount > 0) {
  					for (var i=0;i<aB.searchcount;i++){ 
  						var aterm = aB.searches.record[i].query;
  						if (searchterm === aterm) {
  							isdupe=true;
  							console.log('this search exists in the db');
  							return;
  						}
  					}
  				};
  				if(!isdupe){console.log('saving new search');
						var item = {"record":[{"userid":aB.dfrecid,"query":searchterm}]};
						$.ajax({
								dataType:'json',
								type : "POST",
								url:baseurl + '/db/userSearches' + apikey,
								data:JSON.stringify(item),
								cache:false,
								processData: false,
								success:function (response) {
										
										console.log('dreamfactory: search saved');
										aB.dfconnect = true;
										//aB.fn.df_auth();
										
								},
								error: function(response) {
										$('#itemname').val('');
										console.log("There was an error saving the search.");
								},
								beforeSend: function (xhr) {
									xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
								}
						});
					}		
*/			};
			
			
			// SHOW SEARCHES
			aB.fn.df_auth.exposeSearches = function() {
	/*			$('#savedsearches').html('');
				for (var i=0;i<aB.searchcount;i++){ 
					var search = aB.searches.record[i].query;
					var searchid = aB.searches.record[i].searchid;
					$('#savedsearches').append('<div class="asearch-wrap"><em data-searchid="' + searchid + '" class="icon-remove-circle"></em><a class="asearch" href="#">' + search + '</a></div>');
				}; // end loop 
				
				//make them clickable
				$('.asearch').click(function(){
					var text = this.text;
					$('#player-wrapper').hide();
					$('#query').val(text);
					$('#thequery button').click();
				});
				
				$('.asearch-wrap em').click(function(){
					var $rch = $(this);
					$rch.parent().css('background-color','red');
					var srch = this;
					var srchid = srch.getAttribute('data-searchid');
					aB.fn.df_auth.deleteItem(srchid);
				});
 */ 			};
		
      // RETRIEVE SEARCHES
      aB.fn.df_auth.getSearches = function(){
/*        		$.ajax({
							type: "GET",
							url: baseurl + '/db/userSearches' + apikey + '&filter=userID%3D' + aB.dfrecid,
							dataType: "json",
							contentType: "application/json",
							success: function (response) {
								console.log('got searches for user' + aB.dfrecid);
								aB.searches = response;
								aB.searchcount = aB.searches.record.length;
								console.log('searches found ' + aB.searchcount);
								console.log(aB.searches.record);
								//show the searches
								aB.fn.df_auth.exposeSearches();
							},
							error: function (response, textStatus, xError) {
								console.log(response);
							},
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
							}
						}); 
							
 */ 			};
      
      // ADD USER
 /*     function addUser(name,socialid) {
					var item = {"record":[{"name":name,"socialid":socialid}]};
					$.ajax({
							dataType:'json',
							type : "POST",
							url:baseurl + '/db/users' + apikey,
							data:JSON.stringify(item),
							cache:false,
							processData: false,
							success:function (response) {
									
									console.log('user created in dreamfactory');
									aB.dfconnect = true;
							},
							error: function(response) {
									$('#itemname').val('');
									console.log("There was an error creating the user.");
							},
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
							}
					});
			} */
			
			// LOGIN
      // authenticate dreamfactory.com cloud app backend with system user
      $.ajax({
        type: "POST",
        url: baseurl + '/user/session' + apikey,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:___._+'0r4'}),

        success: function (response) {
        		console.log("got dreamfactory token");
        		aB.sessionId = response.session_id;						
        },
        
        error: function (response, textStatus, xError) {
            console.log(response.responseText);
        } 
        
    	});
    	
    
  };
});
