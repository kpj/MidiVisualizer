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
	loadPlugin();

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