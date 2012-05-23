$(function(){
	var WIDTH = 400;
	var HEIGHT = 300;
	var VIEW_ANGLE = 45;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 0.1;
	var FAR = 10000;
	
	var $board = $("#game-board-container");
	
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);
	var scene = new THREE.Scene();

	scene.add(camera);
	
	camera.position.z = 10;
	
	renderer.setSize(WIDTH, HEIGHT);
	
	$board.append(renderer.domElement);
	var plane = new THREE.Geometry();
	plane.vertices.push(new THREE.Vector3(-50, 50, -1));
	plane.vertices.push(new THREE.Vector3(50, 50, -1));
	plane.vertices.push(new THREE.Vector3(50, -50, -1));
	plane.vertices.push(new THREE.Vector3(-50, -50, -1));
	plane.faces.push(new THREE.Face4(0, 1, 2, 3));
	plane.computeBoundingSphere();

	//var backgroundImage = THREE.ImageUtils.loadTexture("images/stars.jpg", {}, function(){renderer.render(scene, camera)});

	var backgroundPlane = new THREE.Mesh(
		plane, 
		new THREE.MeshBasicMaterial({color: 0x000000, map: THREE.ImageUtils.loadTexture("images/stars.jpg")})
	//	new THREE.LineBasicMaterial({color: 0x000000})
	//	new THREE.MeshBasicMaterial({color: 0x000000})
		);
//	backgroundPlane.position.z = -1;
	backgroundPlane.overdraw = true;
	backgroundPlane.doubleSided = true;
	scene.add(backgroundPlane);

	var shipMaterial = new THREE.LineBasicMaterial();
	var shipGeometry = new THREE.Geometry();
	shipGeometry.vertices.push(new THREE.Vector3(0, 1, 0));
	shipGeometry.vertices.push(new THREE.Vector3(-0.5, -1, 0));
	shipGeometry.vertices.push(new THREE.Vector3(0.5, -1, 0));
	shipGeometry.faces.push(new THREE.Face3(0,1,2));
	shipGeometry.computeBoundingSphere();
	var ship = new THREE.Mesh(
		shipGeometry,
		shipMaterial);
	ship.doubleSided = true;
	scene.add(ship);
	
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 0;
	pointLight.position.y = 0;
	pointLight.position.z = 130;
	scene.add(pointLight);

	renderer.render(scene, camera);
});
