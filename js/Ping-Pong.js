//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Finishing_up

var canvas3 = document.getElementById("canvas2");
var ctx3 = canvas3.getContext("2d");
var ballRadius = 10;
var x2 = canvas3.width/2;
var y2 = canvas3.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas3.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var lives = 3;
var bricks = [];

function init(){
	score = 0;
	lives = 3;
	brickColumnCount = 3;
	frameCount = 0;

	bricks = [];
	for(var c=0; c<brickColumnCount; c++) {
	  bricks[c] = [];
	  for(var r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x2: 0, y2: 0, status: 1 };
	  }
	}
	gameON = 1;
	gamePause = 1;
	//x2 = canvas3.width/2;
	x2 = COPpaddleX+brickWidth/2;
     y2 = canvas3.height-30;
}

//document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);
document.getElementById("Game-container").addEventListener("click", function() {
   //gameON = gameON == 0? 1 : 0;
   if (gameON == 1)	gamePause = gamePause == 0? 1 : 0;
});
var startBtn = document.getElementById('startBtn');

function newBrick() {
  return {
	x: 0,
	y: 0,
	status: 1
  };
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas3.offsetLeft;
  if(relativeX > 0 && relativeX < canvas3.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x2 > b.x2 && x2 < b.x2+brickWidth && y2 > b.y2 && y2 < b.y2+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
			gameON = 0;
            //document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx3.beginPath();
  ctx3.arc(x2, y2, ballRadius, 0, Math.PI*2);
  ctx3.fillStyle = "#f005DD";
  ctx3.fill();
  ctx3.closePath();
}
function drawPaddle() {
  ctx3.beginPath();
  ctx3.rect(paddleX, canvas3.height-paddleHeight, paddleWidth, paddleHeight);
  ctx3.fillStyle = "#000000";
  ctx3.fill();
  ctx3.closePath();
}

function moreBricks() {
  bricks.unshift([]);
  newBrick();
  brickColumnCount++;
  for (r = 0; r < brickRowCount; r++) {
	bricks[0].unshift(newBrick());
  }
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x2 = brickX;
        bricks[c][r].y2 = brickY;
        ctx3.beginPath();
        ctx3.rect(brickX, brickY, brickWidth, brickHeight);
        ctx3.fillStyle = "#0095DD";
        ctx3.fill();
        ctx3.closePath();
      }
    }
  }
}
function drawScore() {
  ctx3.font = "16px Arial";
  ctx3.fillStyle = "#0095DD";
  ctx3.fillText("Score: "+score, 8, 20);
}
function drawLives() {
  ctx3.font = "16px Arial";
  ctx3.fillStyle = "#0095DD";
  ctx3.fillText("Lives: "+lives, canvas3.width-65, 20);
}
init();
var frameCount = 0;
const FRAME_COUNT_NEW_LINE = 500;
function draw2(getgameON) {
	
	ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
	//https://stackoverflow.com/questions/52326656/startscreen-on-javascript-game-clickable-play-button
	startBtn.style.display = 'none';
	if (gamePause == 1) pauseImg.style.display = 'block';
	else pauseImg.style.display = 'none';
	
	
	frameCount += 1;
	if (frameCount === FRAME_COUNT_NEW_LINE && gamePause == 0) {
		frameCount = 0;
		moreBricks();
	}
	  
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	paddleX = COPpaddleX;
	
	gameON = getgameON;

  if(x2 + dx > canvas3.width-ballRadius || x2 + dx < ballRadius) {
    dx = -dx;
  }
  
  if(y2 + dy < ballRadius) {
    dy = -dy;
  }
  else if(y2 + dy > canvas3.height-ballRadius) {
    if(x2 > paddleX && x2 < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
		gameON = 0;
		init();
        //document.location.reload();
      }
      else {	//another live
        //x2 = canvas3.width/2;
		x2 = COPpaddleX + paddleWidth/2;
        y2 = canvas3.height-20;
        dx = 2;
        dy = -2;
        //paddleX = (canvas3.width-paddleWidth)/2;
		paddleX = COPpaddleX;
      }
    }
  }

  if(rightPressed && paddleX < canvas3.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
 
	if (gamePause==0 && gameON == 1){ 	
		x2 += dx;
		y2 += dy;
	}
	requestAnimationFrame(draw2.bind(null, gameON));
}

//draw2();