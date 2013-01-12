var physicalObject = function(options){
	options = $.extend({
		maxForwardVelocity: 0,
		forwardAccel: 0,
		maxTurningVelocity: 0,
		turningAccel: 0,
		initialPos: $V([500, 400])
	}, options);

	var xAxis = $V([0, 1]);
	var zeroVec = $V([0, 0]);
	console.log(options);
	var pos = options.initialPos;
	var dir = $V([0, 1]);
	var vel = $V([0, 0]);

	var turningVel = 0;


	function takeStep(dt, turning, thrusting){
		if(turning == 'left'){
			turningVel = turningVel - ( options.turningAccel * dt);
			if(turningVel < -1 * options.maxTurningVelocity){
				turningVel = -1 * options.maxTurningVelocity;
			}
		}
		if(turning == 'right'){
			turningVel = turningVel + (options.turningAccel * dt);
			if(turningVel > options.maxTurningVelocity){
				turningVel = options.maxTurningVelocity;
			}
		}
		dir = dir.rotate(turningVel, zeroVec);
		if(thrusting == 'forward'){
			vel = vel.add(dir.x(options.forwardAccel).x(dt));
			if(vel.modulus > options.maxVelocity){
				vel = vel.toUnitVector().x(options.maxVelocity);
			}
		}
		if(thrusting == 'reverse'){
			vel = vel.add(dir.x(options.reverseAccel).x(dt));
			if(vel.modulus < -1 * options.maxForwardVelocity){
				vel = vel.toUnitVector().x(options.maxForwardVelocity).x(-1);
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
