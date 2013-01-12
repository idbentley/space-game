$(function(){
	var assets = {
		backgrounds: {
			stars: "/app/images/big-stars.png"
		}
	};
	$("#game-board-container").css("background-image", "url(" + assets.backgrounds.stars + ")");
	
	//Add ship to playing field.
	ship.init($V([200, 200]));
	//Attach to manual controls.
	manualEngine(ship);

	setInterval(function(){
		ship.takeStep(1.0);
		ship.draw();
		
	}, 40);
});
