/* github.com/andrewbaldock/soundora */

define(["jquery", "underscore", "app/df_auth", "json2", "player", "backbone", "app/searches",  "app/soundcloud"], function($) {
    
    $(function() {
    

 /*   
    	// breaks for 1-column, 0-sidebar layout
    	aB.theseAreTheBreaks = function(win_x) {
    		if (win_x <= 461)			{return 335}
				else if(win_x <= 615)	{return 490}
				else if(win_x <= 769)	{return 650}
				else if(win_x <= 924)	{return 795}
				else if(win_x <= 1077){return 950}
				else if(win_x <= 1230){return 1103}
				else if(win_x <= 1383){return 1256}
				else if(win_x <= 1536){return 1409}
				else if(win_x <= 1689){return 1562}
				else if(win_x <= 1842){return 1715}
				else if(win_x <= 1995){return 1868}
				else if(win_x <= 2148){return 2021}
    	} 
    	
  */  	
    
    	//keep window sizing happy
    	aB.resizeHandler = function() {
    		//clear the old height and width
 /*   	  var $results = $('#results').hide();
    	  $results.css('height','').css('width','');
    	  // get new values
    	  // width
    		var win_x = $(window).width();
    		var results_new_x = aB.theseAreTheBreaks(win_x);
    		var player_new_x = results_new_x-42;
    		var query_new_x = results_new_x/3;
    		//height
    		$results.y = $results.height();
    		var leftpanel_new_y = $results.y+260;
				// verbose!!
				//console.log('results dimensions now: ' + results_new_x + 'x ' + $results.y + 'y');
				// apply the changes
				$('#player').css('width',player_new_x+'px');
				$results.css('height',$results.y+'px').css('width',results_new_x+'px');
				$('#leftpanel').css('height', leftpanel_new_y+'px');
				$('#query').css('width',query_new_x);
				$results.show();
	 */				
			
    	};
 /*     
    	$(window).bind('resize', function () {
				aB.resizeHandler();
			});
 */	   
      aB.fn.soundcloud();
      aB.fn.df_auth();
      aB.fn.Searches();
      
			//show utils are loaded in console.
			if(typeof $ !='undefined') {console.log("jquery loaded");}
			if(typeof JSON !='undefined') {console.log("json2 loaded");}
			if(typeof _ !='undefined') {console.log("underscore loaded");}
			if(typeof Backbone !='undefined') {console.log("backbone loaded");}
		
			function toggleSpinner(){
				$('#spinner').slideUp('fastest');
			}
			toggleSpinner();

			$('.signin-link').click(function(e){
      		e.preventDefault;
      		$('#signin-panel').toggle('fastest');
      });
      			
        
    });
});
