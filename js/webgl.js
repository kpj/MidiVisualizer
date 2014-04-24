var scene = undefined;
var camera = undefined;
var renderer = undefined;

var cubes = [];


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


	// fix camera
	camera.position.z = 5;
}

function render() {
	onRender();

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function createCube(x) {
	var geometry = new THREE.CubeGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true
	});
	var cube = new THREE.Mesh(geometry, material);

	cube.position.x = x;

	scene.add(cube);
	cubes.push(cube);
}

function onRender() {
	for(var i = 0 ; i < cubes.length ; i++) {
		var cube = cubes[i];

		if(cube.scale.x > 0) cube.scale.x -= 0.05;
		if(cube.scale.y > 0) cube.scale.y -= 0.05;
		if(cube.scale.z > 0) cube.scale.z -= 0.05;

		cube.rotation.x += Math.random()/100;
		cube.rotation.y += Math.random()/100;
	}
}

function drawOnNote(data) {
	var pos = Math.round(data.note / 20);
	pos = (pos > 4) ? 4 : pos;

	var cube = cubes[pos];

	cube.scale.x = 2;
	cube.scale.y = 2;
	cube.scale.z = 2;
}