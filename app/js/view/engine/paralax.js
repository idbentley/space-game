view = view || {engine: {}};
view.engine.paralax = (function(){
	var p;
	var width;
	var length;
	var h1;
	var h2;
	function calculateCorners(){
		var frontPlane = plane3(
			vec3(p.x - (length/2.0), p.y - (width/2.0), 0),
			vec3(p.x + (length/2.0), p.y - (width/2.0), 0),
			vec3(p.x + (length/2.0), p.y + (width/2.0), 0),
			vec3(p.x - (length/2.0), p.y + (width/2.0), 0));
		return frontPlane;
	}
	function calculateReferencePoints(p′){
		var frontPlane = calculateCorners();
		var yDifference = p.y - p′.y;
		var xDifference = p.x - p′.x;
		p6 = vec3(p2.x, p′.y + yDifference, 0);
		p7 = vec3(p′.x + xDifference, p2.y, 0);
		p8 = vec3(p4.x, p′.y + yDifference, 0);
		p9 = vec3(p′.x + xDifference, p4.y + yDifference, 0);
	}

	function calculateAngles(p){
		var θ1 = dot(p, p6);
		var θ2 = dot(p, p8);
		var ɣ1 = dot(p, p9);
		var ɣ2 = dot(p, p7);
		var h = h1 + h2;
		var p2′ = vec3(p1.x - (tan(θ1) * h), p1.y - (tan(ɣ1) * h), -h2);
		var p3′ = vec3(p1.x + (tan(θ2) * h), p1.y - (tan(ɣ1) * h), -h2);
		var p4′ = vec3(p1.x - (tan(θ1) * h), p1.y + (tan(ɣ2) * h), -h2);
		var p5′ = vec3(p1.x + (tan(θ2) * h), p1.y + (tan(ɣ2) * h), -h2);
	}

})();
