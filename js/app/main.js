/* github.com/andrewbaldock/soundora */

define(["jquery", "jquery.easing", "underscore", "app/df_auth", "json2", "soundcloud", "player",  "backbone", "app/soundcloud" ], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
      
      aB.fn.soundcloud();
      aB.fn.df_auth();
      aB.fn.easing();
      
			//show utils are loaded in console.
			if(typeof $ !='undefined') {console.log("jquery loaded");}
			if(typeof JSON !='undefined') {console.log("json2 loaded");}
			if(typeof _ !='undefined') {console.log("underscore loaded");}
			if(typeof Backbone !='undefined') {console.log("backbone loaded");}
		
			function toggleSpinner(){
				$('#spinner').slideUp('fastest');
			}
			toggleSpinner();

			//APP BEGINS HERE
      		
      		
      		
        
    });
});
