/* github.com/andrewbaldock/soundora */

require(["jquery", "easing", "jquery.beta", "underscore", "app/df_auth", "json2", "soundcloud", "player",  "backbone", "app/soundcloud" ], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
      
      aB.fn.df_auth();
      aB.fn.soundcloud();
      
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
