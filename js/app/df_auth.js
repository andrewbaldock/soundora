/* github.com/andrewbaldock/soundora */

define(["jquery", "json2"], function($) {
  aB.fn.df_auth = function() {
      
      // authenticate dreamfactory.com cloud app backend with system user
      
      $.ajax({
        type: "POST",
        url: 'https://dsp-song.cloud.dreamfactory.com/rest/user/session?app_name=soundora',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:___._+'0r4'}),

        success: function (response) {
        		console.log("dreamfactory authenticated");
        		aB.sessionId = response.session_id;
        		
        		//now load users
        		$.ajax({
							type: "GET",
							url: 'https://dsp-song.cloud.dreamfactory.com/rest/db/users?app_name=soundora',
							dataType: "json",
							contentType: "application/json",
							success: function (response) {
								console.log("got users:");
								console.log(response);
								aB.users = response;
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
