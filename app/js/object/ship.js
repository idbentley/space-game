var ship = (function(){
	var $el;
	
	var physicalImpl;
	
	var assets = {
		sprites: {
			ship: "/app/images/sprite/ship.gif"
		}
	};

	var turningState = 'none';
	var thrustingState = 'none';


	function init(initPos){
		physicalOptions = {
			maxTurningVelocity: 0.2,
			turningAccel: 0.01,
			maxVeloctiy: 0.3,
			forwardAccel: 0.1,
			reverseAccel: -0.05,
		};
		console.log(initPos);
		if(initPos){
			console.log(initPos);
			physicalOptions.initialPos = initPos;
		}
		physicalImpl = physicalObject(physicalOptions);
		$el = $("<div class='small-sprite'></div>").appendTo($("#game-board-container"));
		$el.css("background-image", "url(" + assets.sprites.ship + ")");

	}
	

	function draw(){
		var angleInDegrees = physicalImpl.angle() * 180 / Math.PI;
		$el.css("transform", "translate(500px, 400px), rotate(" + angleInDegrees + "deg)");
		var xOffset = -1 * physicalImpl.pos().e(1);
		var yOffset = -1 * physicalImpl.pos().e(2);
		$("#game-board-container").css("background-position", + xOffset + "px " + yOffset + "px");
	}
	function takeStep(dt){
		physicalImpl.takeStep(1.0, turningState, thrustingState);
			
	}
	triggers = {
		fireThrusters: function(dir){thrustingState = dir;},
		fireRotation:  function(dir){turningState = dir;}
	}
	return {
		init: init,
		draw: draw,
		takeStep: takeStep,
		triggers: triggers
	}
})();
