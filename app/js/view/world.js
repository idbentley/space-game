

var physicalObject = function(constraints){
	var zeroVec = $V([0, 0]);
	var xAxis = $V([0, 1]);
	var pos = $V([500, 400]);
	var dir = $V([0, 1]);
	var vel = $V([0, 0]);

	var turningVel = 0;

	if(constraints == undefined){
		constraints = {
			maxForwardVelocity: 0,
			forwardAccel: 0,
			maxTurningVelocity: 0,
			turningAccel: 0
		};
	}

	function takeStep(dt, turning, thrusting){
		if(turning == 'left'){
			turningVel = turningVel - ( constraints.turningAccel * dt);
			if(turningVel < -1 * constraints.maxTurningVelocity){
				turningVel = -1 * constraints.maxTurningVelocity;
			}
		}
		if(turning == 'right'){
			turningVel = turningVel + (constraints.turningAccel * dt);
			if(turningVel > constraints.maxTurningVelocity){
				turningVel = constraints.maxTurningVelocity;
			}
		}
		dir = dir.rotate(turningVel, zeroVec);
		if(thrusting == 'forward'){
			vel = vel.add(dir.x(constraints.forwardAccel).x(dt));
			if(vel.modulus > constraints.maxVelocity){
				vel = vel.toUnitVector().x(constraints.maxVelocity);
			}
		}
		if(thrusting == 'reverse'){
			vel = vel.add(dir.x(constraints.reverseAccel).x(dt));
			if(vel.modulus < -1 * constraints.maxForwardVelocity){
				vel = vel.toUnitVector().x(constraints.maxForwardVelocity).x(-1);
			}
		}
		pos = pos.add(vel);
	}

	function angle(){
		var angleBetween = dir.angleFrom(xAxis);
		if(dir.e(1) > xAxis.e(1)){
			return -1 * angleBetween;
		}else{
			return angleBetween;
		}
	}
	function position(){
		return pos;
	}
	return {
		pos: position,
		dir: dir,
		takeStep: takeStep,
		angle: angle
	}
};

var ship = (function(){
	var $el;
	
	var physicalImpl = physicalObject({
		maxTurningVelocity: 0.4,
		turningAccel: 0.001,
		maxVeloctiy: 0.5,
		forwardAccel: 0.1,
		reverseAccel: -0.05
	});
	
	var assets = {
		sprites: {
			ship: "/app/images/sprite/ship.gif"
		}
	};

	var turningState = 'none';
	var thrustingState = 'none';

	function init(){
		$el = $("<div class='small-sprite'></div>").appendTo($("#game-board-container"));
		$el.css("background-image", "url(" + assets.sprites.ship + ")");

		setupDirectionalTriggers();	
	}
	function setupDirectionalTriggers(){
		$(window).on('keydown', function(event){
			switch(event.keyCode){
				case 39:
					//Right Arrow
					turningState = 'right';
					break;
				case 37:
					//Left Arrow
					turningState = 'left';
					break;
				case 40:
					//Down Arrow
					thrustingState = 'reverse';
					break;
				case 38:
					//Up Arrow
					thrustingState = 'forward';
					break;
			}
		});
		$(window).on('keyup', function(event){
			switch(event.keyCode){
				case 39:
					//Right Arrow
					turningState = 'none';
					break;
				case 37:
					//Left Arrow
					turningState = 'none';
					break;
				case 40:
					//Down Arrow
					thrustingState = 'none';
					break;
				case 38:
					//Up Arrow
					thrustingState = 'none';
					break;
			}
		});
	}

	function draw(){
		var angleInDegrees = physicalImpl.angle() * 180 / Math.PI;
		$el.css("transform", "translate(500px, 400px), rotate(" + angleInDegrees + "deg)");
		var xOffset = -1 * physicalImpl.pos().e(1);
		var yOffset = -1 * physicalImpl.pos().e(2);
		console.log(xOffset, yOffset);
		$("#game-board-container").css("background-position", + xOffset + "px " + yOffset + "px");
		//$el.css("transform", "translate(" +physicalImpl.pos().e(1) + "px, " + physicalImpl.pos().e(2) + "px), rotate(" + angleInDegrees + "deg)");
		//{x: physicalImpl.pos.e(1), y: physicalImpl.pos.e(2), rotate: angleInDegrees}, 'linear', };
	}
	function takeStep(dt){
		physicalImpl.takeStep(1.0, turningState, thrustingState);
			
	}
	return {
		init: init,
		draw: draw,
		takeStep: takeStep
	}
})();

$(function(){
	var assets = {
		backgrounds: {
			stars: "/app/images/big-stars.png"
		}
	};
	$("#game-board-container").css("background-image", "url(" + assets.backgrounds.stars + ")");
	ship.init();
	setInterval(function(){
		ship.takeStep(1.0);
		ship.draw();
		
	}, 40);
});
