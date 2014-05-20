function initListener() {
	MIDI.Player.addListener(
		function(data) {
			drawOnNote(data);
		}
	);
}

function loadPlugin() {
	MIDI.loadPlugin({
		soundfontUrl: "./libs/midi/soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {
			console.log('MIDI-Plugin loaded');
			initListener();

			$('#info').hide();
			$('#file_upload').filestyle('disabled', false)
		}
	});
}

function play(data) {
	$('#info_text').text('Loading track');
	$('#info').show();

	MIDI.Player.stop();
	MIDI.Player.loadFile(
		data, 
		function() {
			$('#info').hide();
			$('#toggle').attr('disabled', false);
			console.log('Song loaded');

			MIDI.Player.start();
		}
	);
}