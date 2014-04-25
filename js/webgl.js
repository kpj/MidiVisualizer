var scene = undefined;
var camera = undefined;
var renderer = undefined;
var controls = undefined;

var y_position = 0;


function initWebGL() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75, 
		window.innerWidth / window.innerHeight, 
		0.1, 
		1000
	);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);

	controls = new THREE.TrackballControls(camera);
	controls.noPan = true;
	controls.staticMoving = false;

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.target = new THREE.Vector3(0.8, 1, 0.5);
	scene.add(light);

	// fix camera
	camera.position.z = 5;

	// gogogo
	render();
}

function render() {
	onRender();

	controls.update();

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function onRender() {
	if(!MIDI.Player.playing)
		return;

	camera.position.y -= config.speed;
	y_position -= config.speed;

	controls.target = new THREE.Vector3(0, y_position, 0);
}

function drawOnNote(data) {
	var geometry = new THREE.CubeGeometry(0.2, 0.2, 0.2);
	var material = new THREE.MeshBasicMaterial({
		color: getColor(data.note)
	});
	var cube = new THREE.Mesh(geometry, material);

	cube.position.x = -10 + data.note / 10;
	cube.position.y = y_position;

	if(config.all_dimensions)
		cube.position.z = data.velocity / 100;

	scene.add(cube);


	// delete old nodes
	if(scene.children.length > config.maxObjectNum) {
		scene.remove(scene.children[0]);
	}
}

function d2h(d) {
	var str = '00' + d.toString(16);
	return str.substr(str.length - 2)
}
function getColor(note) {
	var startColor = config.startColor;
	var endColor = config.endColor;

	var step = note/100;

	var c0 = Math.floor(startColor[0]+(endColor[0] - startColor[0])*step); 
	var c1 = Math.floor(startColor[1]+(endColor[1] - startColor[1])*step); 
	var c2 = Math.floor(startColor[2]+(endColor[2] - startColor[2])*step);

	return '#' + d2h(c0) + d2h(c1) + d2h(c2);
}