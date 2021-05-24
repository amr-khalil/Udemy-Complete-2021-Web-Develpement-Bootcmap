var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


var x = canvas.width/2;
var y = 30;
var radius = 20;
var dx = 2;
var dy = 2;
var status = 0;

var paddleHeight = 20;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY=  canvas.height - paddleHeight;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 150;
var brickHeight = 40;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = canvas.width/2 - (brickColumnCount*(brickWidth+brickPadding))/2;

var score = 0;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', MouseMoveHandler, false);

function keyDownHandler(event){
	if(event.key == 'Right' || event.key == 'ArrowRight'){
		rightPressed = true;
	}
	else if(event.key == 'Left' || event.key == 'ArrowLeft'){
		leftPressed = true;
	}
}

function keyUpHandler(event){

	if(event.key == 'Right' || event.key == 'ArrowRight'){
		rightPressed = false;
	}
	else if(event.key == 'Left' || event.key == 'ArrowLeft'){
		leftPressed = false;
	}
}

function mouseMoveHandler(event){
	var relativeX = event.clientX - canvas.offsetLeft;
	var
}



function drawScore(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#000000';
	ctx.fillText('Score: ' + score, 8, 20)
}

function ball(){
	ctx.beginPath();
	ctx.arc(x,y, radius, 0,2*Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.closePath();
}

function paddle(){
	ctx.beginPath();
	ctx.rect(paddleX, paddleY, paddleWidth ,paddleHeight);
	ctx.fillStyle = 'orange';
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score ++;

                    if(score == brickRowCount*brickColumnCount){
                    	alert('YOU WIN, CONGRATULATIONS!');
                    	document.location.reload();
                    	clearInterval(interval);
                    }
                }

            }

        }
    }
}



function draw(){
	// Delete the old canvas
	ctx.clearRect(0,0, canvas.width, canvas.height);
	// Draw a new ball
	ball();
	paddle();
	drawBricks();
	drawScore();
	collisionDetection();
	//b = new Ball(95,50,40,'blue');
	//b.draw();
	// Canvas width range
	if (x + dx > canvas.width-radius || x + dx < radius){
		// go in another direction
		dx = -dx;
	}
	// Canvas height range
	if (y + dy < radius) {
		// go in another direction
		dy = -dy;
	}
	else if(y +dy > canvas.height - radius){
		if (x > paddleX && x < paddleX + paddleWidth) {
			if (y = y - paddleHeight) {
                dy = -dy;
            }
		}
		else{
			//document.querySelector('h1').innerText = 'GAME OVER';
			//document.querySelector('h1').style.color = 'red';
			//alert('GAME OVER');
			//document.location.reload();
			clearInterval(interval);
		}
	}

	 if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }


	
	
	x += dx;
	y += dy;	
}

var interval = setInterval(draw, 10);




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
