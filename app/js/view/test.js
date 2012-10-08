    window.requestAnimFrame = (function(callback){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
    })();
 
    function animate(lastTime, angularSpeed, three){
        // update
        var date = new Date();
        var time = date.getTime();
        var timeDiff = time - lastTime;
        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
        lastTime = time;
 
        // render
        three.renderer.render(three.scene, three.camera);
 
        // request new frame
        requestAnimFrame(function(){
            animate(lastTime, angularSpeed, three);
        });
    }
 
    window.onload = function(){
        var angularSpeed = 0.2; // revolutions per second
        var lastTime = 0;
 
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
 
        // camera
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = -10;
        //camera.position.z = 40;
//	camera.position.z = 1;
	camera.rotation.x = Math.PI / 2;
	//camera.rotation.z = -1 * Math.PI;

        // scene
        var scene = new THREE.Scene();
 
	var backgroundImage = THREE.ImageUtils.loadTexture("images/stars.jpg");
	var backgroundMaterial = new THREE.MeshLambertMaterial({
		map: backgroundImage
	});
        // plane
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(17, 17), backgroundMaterial);
        plane.overdraw = true;
	plane.position.y = 1;
	plane.rotation.z = Math.PI;
        scene.add(plane);
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.position.set( 0, -1, 0 );
	scene.add( directionalLight );
	scene.add(camera);
        // create wrapper object that contains three.js objects
        var three = {
            renderer: renderer,
            camera: camera,
            scene: scene,
            plane: plane
        };
 
        animate(lastTime, angularSpeed, three);
    };
