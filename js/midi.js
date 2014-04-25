function initListener() {
	MIDI.Player.addListener(
		function(data) {
			drawOnNote(data);
		}
	);
}

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