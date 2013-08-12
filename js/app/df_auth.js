/* github.com/andrewbaldock/soundora */

define(["jquery", "json2"], function($) {
  aB.fn.df_auth = function() {
  
  		var baseurl = "https://dsp-song.cloud.dreamfactory.com/rest";
  		var apikey = '?app_name=soundora';
      
      function getSearches(dfuserid){
        		$.ajax({
							type: "GET",
							url: baseurl + '/db/userSearches' + apikey + '&filter=userID%3D' + dfuserid,
							dataType: "json",
							contentType: "application/json",
							success: function (response) {
								console.log('got searches for user' + dfuserid);
								aB.searches = response;
								console.log(aB.searches);
							},
							error: function (response, textStatus, xError) {
								console.log(response);
							},
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
							}
						}); 
							
			};
      
      function addUser(name,socialid) {
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
			}
			
      // authenticate dreamfactory.com cloud app backend with system user
      $.ajax({
        type: "POST",
        url: baseurl + '/user/session' + apikey,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:___._+'0r4'}),

        success: function (response) {
        		console.log("dreamfactory authenticated");
        		aB.sessionId = response.session_id;
        		
						// load up users
        		$.ajax({
							type: "GET",
							url: baseurl + '/db/users' + apikey,
							dataType: "json",
							contentType: "application/json",
							success: function (response) {
								/*console.log("got users:");
								console.log(response); */
								aB.users = response;
								
								// check logged in state
								aB.loggedin = false;
								aB.dfconnect = false;
								if(aB.userid != 'none') {aB.loggedin = true;}
							
								// look for user in dreamfactory
								var userfound = false;
								if(aB.loggedin == true) {
									//is user in database?	
									var j=aB.users.record.length;							
									for (var i=0;i<j;i++){ 
										if (typeof aB.users.record[i].socialid =='undefined') {
											var chkid = null;
										} else
											var chkid = aB.users.record[i].socialid;
											if(chkid == aB.userid) {
												userfound = true;
												console.log('user found in dreamfactory');
												aB.dfrecid = aB.users.record[i].userid
										}
									}; // end loop 
								};
							
								if(userfound == true) {			
									//load up user searches right here
									aB.dfconnect = true;
									getSearches(aB.dfrecid);
									
								} else {
									//create a new user here
									console.log('make a new user here');
									addUser(aB.username,aB.userid);
								};
							// end success
							},
							error: function (response, textStatus, xError) {
								console.log(response);
							},
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-DreamFactory-Session-Token', aB.sessionId);
							}
						}); 					
						
						
        },
        
        error: function (response, textStatus, xError) {
            console.log(response.responseText);
        } 
        
    	});
    	
    	console.log('dreamfactory loaded');
  };
});
