/* github.com/andrewbaldock/soundora */

define(["jquery", "jquery.easing", "underscore", "app/df_auth", "json2", "soundcloud", "player",  "backbone", "app/soundcloud" ], function($) {
    
    $(function() {
    
    //stickyjs.com
    (function($){var defaults={topSpacing:0,bottomSpacing:0,className:'is-sticky',wrapperClassName:'sticky-wrapper',center:false,getWidthFrom:''},$window=$(window),$document=$(document),sticked=[],windowHeight=$window.height(),scroller=function(){var scrollTop=$window.scrollTop(),documentHeight=$document.height(),dwh=documentHeight-windowHeight,extra=(scrollTop>dwh)?dwh-scrollTop:0;for(var i=0;i<sticked.length;i++){var s=sticked[i],elementTop=s.stickyWrapper.offset().top,etse=elementTop-s.topSpacing-extra;if(scrollTop<=etse){if(s.currentTop!==null){s.stickyElement.css('position','').css('top','');s.stickyElement.parent().removeClass(s.className);s.currentTop=null}}else{var newTop=documentHeight-s.stickyElement.outerHeight()-s.topSpacing-s.bottomSpacing-scrollTop-extra;if(newTop<0){newTop=newTop+s.topSpacing}else{newTop=s.topSpacing}if(s.currentTop!=newTop){s.stickyElement.css('position','fixed').css('top',newTop);if(typeof s.getWidthFrom!=='undefined'){s.stickyElement.css('width',$(s.getWidthFrom).width())}s.stickyElement.parent().addClass(s.className);s.currentTop=newTop}}}},resizer=function(){windowHeight=$window.height()},methods={init:function(options){var o=$.extend(defaults,options);return this.each(function(){var stickyElement=$(this);var stickyId=stickyElement.attr('id');var wrapper=$('<div></div>').attr('id',stickyId+'-sticky-wrapper').addClass(o.wrapperClassName);stickyElement.wrapAll(wrapper);if(o.center){stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"})}if(stickyElement.css("float")=="right"){stickyElement.css({"float":"none"}).parent().css({"float":"right"})}var stickyWrapper=stickyElement.parent();stickyWrapper.css('height',stickyElement.outerHeight());sticked.push({topSpacing:o.topSpacing,bottomSpacing:o.bottomSpacing,stickyElement:stickyElement,currentTop:null,stickyWrapper:stickyWrapper,className:o.className,getWidthFrom:o.getWidthFrom})})},update:scroller};if(window.addEventListener){window.addEventListener('scroll',scroller,false);window.addEventListener('resize',resizer,false)}else if(window.attachEvent){window.attachEvent('onscroll',scroller);window.attachEvent('onresize',resizer)}$.fn.sticky=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments)}else{$.error('Method '+method+' does not exist on jQuery.sticky')}};$(function(){setTimeout(scroller,0)})})(jQuery);
    
    
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
    
    	//keep window sizing happy
    	aB.resizeHandler = function() {
    		//clear the old height and width
    	  var $results = $('#results').hide();
    	  $results.css('height','').css('width','');
    	  // get new values
    		var win_x = $(window).width();
    		var results_new_x = aB.theseAreTheBreaks(win_x);
    		var player_new_x = results_new_x-42;
    		$results.y = $results.height();
				// verbose!!
				// console.log('results dimensions now: ' + results_new_x + 'x ' + $results.y + 'y');
				$('#player').css('width',player_new_x+'px');
				$results.css('height',$results.y+'px').css('width',results_new_x+'px');

				$results.show();
    	};
    
    	$(window).bind('resize', function () {
				aB.resizeHandler();
			});
    
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
