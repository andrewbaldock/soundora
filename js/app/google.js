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
				if( $('#theuser').length == 0) {
					$('#username').html(resp.displayName);
					$('#user').html(theoutput)
				}
				aB.user=resp;
				aB.usertype="google";
				aB.userid='google'+goog.user.id;
				aB.username=goog.user.displayName;
				// attach dreamfactory database
				aB.fn.df_auth();
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

// g+ callback
function googCallback(authResult) {
	if (authResult['access_token']) {
		// Successfully authorized
		// Hide the sign-in button now that the user is authorized, for example:
		//document.getElementById('signinButton').setAttribute('style', 'display: none');
		console.log('google authenticated');
		$('#logged-out').hide();
		$('#signin-panel').hide();
		$('#logged-in').show();
		goog.token = authResult.access_token;
		gapi.auth.authorize({client_id: goog.clientId, scope: goog.scopes, immediate: true}, handleAuthResult);
		
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
		},
		error: function(e) {
			// Handle the error
			// console.log(e);
			// You could point users to manually disconnect if unsuccessful
			// https://plus.google.com/apps
			
		}
	});
} 
