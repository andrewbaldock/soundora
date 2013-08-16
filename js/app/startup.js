/* github.com/andrewbaldock/soundora */

// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, this app's custom code.

// declare the aB object
aB={fn:{}};
aB.userid = 'none';
aB.baseurl = "https://dsp-soundora.cloud.dreamfactory.com/rest";
aB.apikey = '?app_name=soundora';

requirejs.config({
    "baseUrl": "js/lib",
    shim: {   // Using shim we define dependencies between our libraries
    	'underscore': {
      	exports: '_'
    	},
    	'backbone': {
      	deps: [
        	'underscore',
        	'jquery'
      	],
      exports: 'Backbone'
    	}
  	},
    "paths": {
      "app": "../app",
      "jquery" : 			"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",
      //"jquery" : 			"//cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min",
      "json2" : 			"//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min",
      "underscore" :  "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
      "backbone" : 		"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
      "soundcloud" :  "//connect.soundcloud.com/sdk",
      "player" : 			"https://w.soundcloud.com/player/api"
    }
});

// Load the main app module to start the app
___={_:'s0und'};
requirejs(["app/main"]);
