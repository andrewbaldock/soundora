/* github.com/andrewbaldock/soundora */
		
define(["jquery", "soundcloud", "player", "app/df_auth"], function($) {
  aB.fn.soundcloud = function(soundcloud) {
      require(['soundcloud'], function (soundcloud) {
      	

				//begin interaction
				$('#thequery').slideDown();

				/*
				BUTTON CLICK
				--------------------------------------------------------------*/
      	$('#thequery button').click(function(soundcloud){
      		$('#player-wrapper').hide();
      		$('#spinner').show();
      	
      		var usrInput = $('#thequery input').val(); 
      		aB.tracks = {};
      		aB.tracksarray = [];
      		aB.tracks.played = 0;
      		
      		//fire up soundcloud
      		SC.initialize({
    				client_id: '3b56bf42a48bcfe2379a7950bc9dcf95',
    				redirect_uri: "http://andrewbaldock.com/soundora/callback.html"
  				});
					
					console.log('searching on ' + usrInput);
					//dreamfactory save search 
					//if(aB.dfconnect && aB.loggedin) {
					//	aB.fn.df_auth.saveSearch(usrInput);
					//}
					
					var $results = $('#results').html('');

					SC.get('/tracks', { q: usrInput }, function(result) {
							console.log(result + ' ' + result.length);
							// put 'em in teh dom
							
							for (var i=0;i<result.length;i++){ 			
								var track = result[i];
								aB.tracks['trk' + (i+1)] = track; //push to global aB object
								aB.tracksarray.push(track); //push to global aB object
								
								//choose the artwork
								var art = track.artwork_url;
								if (art === null) {
									art = track.user.avatar_url;
								}/* else {
									$('html').css('background','url("' + art + '") #333!important').css('background-size','100% 100%');
								} */
								
								$results.append(
									'<div class="track-wrap" style="background-image:url(' + track.waveform_url + ');"><div class="track" style="background-image:url(' + art + ');" data-trk="' + (i+1) + '" id="trk' + track.id + '"><div class="text"><span>' + track.user.username + '</span><br><p>' + track.title + '</p></div></div></div>'
								);
								
							}; //end for loop
							console.log('#tracks: ' + aB.tracksarray.length);
							var sc_options = '&show_artwork=true&auto_play=true&show_comments=true&enable_api=true&sharing=true&color=00BCD3'
							
							
							// give each search a classname of its text
							var usrInputClass = usrInput.toLowerCase().replaceAll(' ' , '_');
							$('.asearch').each( function() {
									var className = $(this).text().toLowerCase();
									className = className.replaceAll(' ','_');
									$(this).addClass(className);
									//console.log('gave a search the classname of ' + className);
							});
							//prevent dupes
							console.log('user looked for: ' +usrInput);
							if ($('.' + usrInputClass).length === 0 ) {
								console.log('save ' + usrInput + ' into collection now');
								
								// WORKS: // aB.searchCollection.models.push( new aB.Search({model: {"id":"","query":usrInput} }) );
								
								//aB.searchView.render(null,usrInput);
								var mod = new aB.Search({"query":usrInput });
								
								mod.save({},{success: function(model) {
									console.log('save model to db:success');
									aB.searchCollection.fetch(				{
										success: function() {
											aB.searchView.showAll()
											aB.arranger();
										},
										error: function() {}
									});		
								}});
	

							} else {
								console.log('DUPE');
							}
				
				
							// Show what track is currently playing
							aB.fn.updatePlaying = function (trackId){
								$('.track').removeClass('isPlaying');
								var trkId = '#trk' + trackId;
								$(trkId).addClass('isPlaying');
							}
						
							// advance track
							aB.fn.advanceTrack = function (){
								console.log('advancing...');
								$('.track').removeClass('isPlaying');
								aB.tracks.played = aB.tracks.played + 1;
								var nextId = '#trk' + aB.tracks['trk' + aB.tracks.played].id;
								$(nextId).click();
							}
						
						  $('.track').click(function(){
								var Id = this.id.replace('trk','');
								var url = 'http://api.soundcloud.com/tracks/' + Id;
								
								var iframe = document.querySelector('#widget');
								iframe.src = 'https://w.soundcloud.com/player/?url=' + url + sc_options;		
								
								aB.widget = SC.Widget(iframe);	
								
								aB.widget.unbind(SC.Widget.Events.FINISH, function(eventData) {
										//unbound
								});

								setTimeout(function(){
									aB.widget.bind(SC.Widget.Events.FINISH, function(eventData) {
										console.log('song has finished');
										aB.fn.advanceTrack();
									});
								},5000); 

								aB.fn.updatePlaying(Id); // css
								
							});
							
							$('#spinner').hide('fastest');
							
							$('#thequery').fadeIn();
							

							//launch the player
							require(['player'], function (player) {
								if (aB.tracks.trk1.kind != undefined) {
									//expose the player
									$('#player-wrapper').show('slowest');
									$('body').addClass('inplay');
									console.log('readying track ' + aB.tracks.trk1.id);
									
									//play first result
									aB.fn.updatePlaying(aB.tracks.trk1.id);
									aB.tracks.played = 1;
									
									var firstSong = '#trk' + aB.tracks.trk1.id;
									$(firstSong).click();
								 }
							 });//end require;
							
						}); // end SC.get	
						
  					// reload searches - deprecated
  					// aB.fn.df_auth();
      	}); // end click
      	
				//interesting random queries
				aB.seeds = ['pixies magnetic monkey','bondax you know'];
				var seed = aB.seeds[Math.floor(Math.random()*aB.seeds.length)]; // get a random item
				//$('#query').val(seed);
      	
      	//if ?play url parameter is present then autostart
      	var autostart = aB.fn.getUrlParam('play');
				if(autostart != false) {
					autostart = autostart.replaceAll('+', ' ');
					autostart = autostart.replaceAll('%20', ' ');
					$('#query').val(autostart);
					$('#thequery button').click();
				} else {
					$('#thequery input#query').focus();
				}
      	
      	//handle return key
      	$('window').on('keydown', function(event) { if (event.which === 13 || event.keyCode === 13) { e.preventDefault();$('#thequery button').click(); } });
      	
      	console.log('soundcloud loaded');
      	$('#results').show();
      	
      }); //end outer require
  };
});
