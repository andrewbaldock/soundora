/* GOOGLE SIGNIN
*/
var goog={};
goog.clientId = '881156022619';
goog.apiKey = 'AIzaSyD4ZGwVyyh2RN40PFeifk6QecZvk3O-BGk';
goog.scopes = 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email';

// Use a button to handle authentication the first time.
function handleClientLoad() {
	gapi.client.setApiKey(goog.apiKey);
	window.setTimeout(checkAuth,1);
}

function checkAuth() {
	//gapi.auth.authorize({client_id: goog.clientId, scope: goog.scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		// Load the API and make an API call.  Display the results on the screen.

		gapi.client.load('plus', 'v1', function() {
			var request = gapi.client.plus.people.get({
				'userId': 'me'
			});
			request.execute(function(resp) {
				goog.user = resp;
				if (typeof resp.image.url != 'undefined') {
					var theoutput = '<div id="theuser"><img class="userimg" src="' + resp.image.url + '"></div>';
				} else {
					var theoutput = '<div id="theuser"><em class="userimg" class="icon-search"></em></div>';
				}
				if( $('#theuser').length < 1) {
					$('#username').html(resp.displayName);
					$('#user').html(theoutput)
				}
				aB.user=resp;	
				aB.usertype='google';
				aB.userid=goog.user.id+'g';
				aB.username=goog.user.displayName;
				
				//now that we have aB.userid, can load up searches
				aB.fn.Searches();
			});
		});
	
	}
}

// asyc g+ signin init
(function() {
	 var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	 po.src = 'https://apis.google.com/js/client:plusone.js';
	 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

function authDF(){
	// LOGIN
	// authenticate dreamfactory.com cloud app backend with system user
	$.ajax({
		type: "POST",
		url: aB.baseurl + '/user/session?app_name=soundora',
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify({email:'andrewbaldock@yahoo.com',password:___._+'0r4'}),
		success: function (response) {
				console.log("got dreamfactory token " + response.session_id);
				aB.sessionId = response.session_id;	
		},
		error: function (response, textStatus, xError) {
				console.log(response.responseText);
		} 
	});
}

// g+ callback
function googCallback(authResult) {
	if (authResult['access_token']) {
		// Successfully authorized
		// Hide the sign-in button now that the user is authorized, for example:
		//document.getElementById('signinButton').setAttribute('style', 'display: none');

		$('#logged-out').hide();
		$('#signin-panel').hide();
		$('#logged-in').show();
		goog.token = authResult.access_token;
		gapi.auth.authorize({client_id: goog.clientId, scope: goog.scopes, immediate: true}, handleAuthResult);
		console.log('google authenticated');
		
		authDF();	
		
	} else if (authResult['error']) {
		
		// There was an error.
		// Possible error codes:
		//   "access_denied" - User denied access to your app
		//   "immediate_failed" - Could not automatically log in the user
		// console.log('There was an error: ' + authResult['error']);
		$('#logged-in').hide();
		$('#logged-out').show();
	}
}  

function disconnectUser() {
	var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + goog.token;
	$.ajax({
		type: 'GET',
		url: revokeUrl,
		async: false,
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(nullResponse) {
			// Do something now that user is disconnected
			// The response is always undefined.
				$('#logged-in').hide();
				$('#signin-panel').hide();
				$('#logged-out').show();
				$('#savedsearches').html('<h3><a href="#" class="signin-link">Sign in</a><br>to see your<br>stations</h3>');
				
				$('.signin-link').off();
				
				$('.signin-link').click(function(e){
					e.preventDefault;
					if ($("#signin-panel").is(":hidden")) {
						$("#signin-panel").slideDown("slow");
					} else {
						$("#signin-panel").slideUp("slow");
					}
				});
      	
      	console.log('google signed out');
		},
		error: function(e) {
			// Handle the error
			// console.log(e);
			// You could point users to manually disconnect if unsuccessful
			// https://plus.google.com/apps
			
		}
	});
} 
