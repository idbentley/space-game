view = view || {engine: {}};
view.engine.paralax = (function(){
	var p1;
	var p2;
	var p3;
	var p4;
	var p5;
	var p6;
	var p7;
	var p8;
	var p9;
	var p1′;
	var width;
	var length;
	var h1;
	var h2;
	function calculateCorners(){
		p2 = vec3(p1.x - (length/2.0), p1.y - (width/2.0), 0);
		p3 = vec3(p1.x + (length/2.0), p1.y - (width/2.0), 0);
		p4 = vec3(p1.x + (length/2.0), p1.y + (width/2.0), 0);
		p5 = vec3(p1.x - (length/2.0), p1.y + (width/2.0), 0);
	}
	function calculateReferencePoints(p){
		calculateCorners();
		var yDifference = p.y - p1.y;
		var xDifference = p.x - p1.x;
		p6 = vec3(p2.x, p1.y + yDifference, 0);
		p7 = vec3(p1.x + xDifference, p2.y, 0);
		p8 = vec3(p4.x, p1.y + yDifference, 0);
		p9 = vec3(p1.x + xDifference, p4.y + yDifference, 0);
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

});
