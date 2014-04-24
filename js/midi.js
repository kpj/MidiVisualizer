function initListener() {
	MIDI.Player.addListener(
		function(data) {
			drawOnNote(data);
		}
	);
}