/* github.com/andrewbaldock/soundora */

define(["jquery", "underscore", "app/df_auth", "json2", "player", "backbone", "app/searches",  "app/soundcloud"], function($) {
    
    $(function() {
    
			//Get URL Params function
			aB.fn.getUrlParam = function (paramName) {
				paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
				var regexS = "[\\?&]" + paramName + "=([^&#]*)";
				var regex = new RegExp(regexS);
				var results = regex.exec(window.location.href);
				if (results === null) { 
					return false; 
				} else {
					return results[1];
				}
			};

			//replaceAll function
			String.prototype.replaceAll = function(str1, str2, ignore) {
				return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
			};
  
    	/* $('.signin-link').click(function(e){
      	e.preventDefault;
      	if ($("#signin-panel").is(":hidden")) {
					$("#signin-panel").slideDown("fast");
				} else {
					$("#signin-panel").slideUp("fast");
				}
      }); */
      
      
      
      var $div = $("#signin-panel");
			var height = $div.height();
			$div.hide().css({ height : 0 });

			$('.signin-link').click(function () {
				if ( $div.is(':visible') ) {
					$div.animate({ height: 0 }, { duration: 500, complete: function () {
							$div.hide();
						} 
					});
				} else {
					$div.show().animate({ height : height }, { duration: 500 });
				}
		
				return false;
			});
      
      
      
      

    	
      aB.fn.soundcloud();
      aB.fn.df_auth();
      aB.fn.Searches();
      
			//show utils are loaded in console.
			if(typeof $ !='undefined') {console.log("jquery loaded");}
			if(typeof JSON !='undefined') {console.log("json2 loaded");}
			if(typeof _ !='undefined') {console.log("underscore loaded");}
			if(typeof Backbone !='undefined') {console.log("backbone loaded");}
		
			(function toggleSpinner(){
				$('#spinner').slideUp('fastest');
			}());
			
			$('#searchclear').click(function(){
				$('#query').val('').focus();
			});
		

      			
    });
});

