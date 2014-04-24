function play(data) {
	$('#info_text').text('Loading track');
	$('#info').show();

	MIDI.Player.stop();
	MIDI.Player.loadFile(
		data, 
		function() {
			$('#info').hide();
			console.log('Song loaded');

			MIDI.Player.start();
		}
	);
}

window.onload = function() {
	/*
	 * Other stuff
	 */
	$('#file_upload').attr('disabled', true);
	$('#toggle').attr('disabled', true);
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

			$('#info').hide();
			$('#toggle').attr('disabled', false);
			$('#file_upload').attr('disabled', false);
		}
	});

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

	/* 
	 * Initialize file buttons
	 */
	$('#toggle').on('click', function(event) {
		if(MIDI.Player.playing)
			MIDI.Player.pause();
		else
			MIDI.Player.resume();
	});
}