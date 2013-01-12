function manualEngine(obj){
	var directionalKeyCodes = {
	37: 'left',
	38: 'forward',
	39: 'right',
	40: 'reverse'
	};
	var rotationalKeys = [37,39];
	var thrustKeys = [38,40];
	var triggers = obj.triggers;
	$(window).on('keydown', function(event){
		if(thrustKeys.indexOf(event.keyCode) != -1){
			console.log("thrusting ", directionalKeyCodes[event.keyCode.toString()]);
			triggers.fireThrusters(directionalKeyCodes[event.keyCode.toString()]);
		}
		if(rotationalKeys.indexOf(event.keyCode) != -1){
			triggers.fireRotation(directionalKeyCodes[event.keyCode.toString()]);
		}
	});
	$(window).on('keyup', function(event){
		if(thrustKeys.indexOf(event.keyCode) != -1){
			triggers.fireThrusters('none');
		}
		if(rotationalKeys.indexOf(event.keyCode) != -1){
			triggers.fireRotation('none'); 
		}
	});
}
