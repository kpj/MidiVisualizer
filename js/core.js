function play(data) {
	$('#file_upload').hide();
	$('#info').show();

	$('#info_text').text('Initializing WebGL');
	initWebGL();

	$('#info_text').text('Loading MIDI-Plugin');
	MIDI.loadPlugin({
		soundfontUrl: "./libs/midi/soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			console.log('MIDI-Plugin loaded');
			initListener();

			$('#info_text').text('Loading track');
			MIDI.Player.loadFile(
				data, 
				function() {
					$('#info').hide();
					console.log('Song loaded');

					// webgl stuff
					render();
					for(var i = 0 ; i < 5 ; i++)
						createCube(-10 + i*4);

					MIDI.Player.start();
				}
			);
		}
	});
}

window.onload = function() {
	/* 
	 * Initialize file upload
	 */
	$('#file_upload').on('change', function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				 play(e.target.result);
			};

			reader.readAsDataURL(this.files[0]);
		}
	});
}