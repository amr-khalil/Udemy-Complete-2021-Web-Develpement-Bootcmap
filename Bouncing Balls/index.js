var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height/2;
var radius = 10;
var dx = 1;
var dy = 1;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) /2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event){
	if(event.key == 'Right' || event.key == 'ArrowRight'){
		rightPressed = true;

	}
	else if(event.key == 'Left' || event.key == 'ArrowLeft'){
		leftPressed = true;

	}
}

function keyUpHandler(event){
	
}



function ball(){
	ctx.beginPath();
	ctx.arc(x,y, radius, 0,2*Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.closePath();
}

function draw(){
	// Delete the old canvas
	ctx.clearRect(0,0, canvas.width, canvas.height);
	// Draw a new ball
	ball();
	//b = new Ball(95,50,40,'blue');
	//b.draw();
	// Canvas width range
	if (x+radius >= canvas.width || x-radius<=0){
		// go in another direction
		dx = -dx;
	}
	// Canvas hieght range
	else if (y+radius >= canvas.height || y-radius<=0) {
		// go in another direction
		dy = -dy;
	}
	
	x += dx;
	y += dy;	
}

setInterval(draw, 10);




function Ball(x, y, radius, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	
	this.draw = function(){

	ctx.beginPath();
	ctx.arc(this.x,this,y, this.radius,0,2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();

	}
	

}