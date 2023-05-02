// sleep time expects milliseconds
function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}



// format <span class="games">1 : you made 5 !</span>

function back(){
	const bk = document.getElementById('bbut');
	bbut.classList.add("bye");
	sleep(1500).then(() => {
		window.open("../index.html", "_self");
	});
}

// Background 

let board;
let boardwidth = 360;
let boardheight = 640;
let context;

// Bird

let birdHeight = 24;
let birdwidth = 34;

let birdX = boardwidth/8;
let birdY = boardheight/2;

let birdimage ;

// Pipes

let pipeArray = [];
let pipeWidth = 64;
let pipeheight = 512;
let pipeX = boardwidth;
let pipeY = 0;

let TopPipeImg;
let BotPipeImg;

// Game Physics

let velocityX = -1; // pipe left speed
let velocityY = 0;
let gravity = 0.1;
let jump_force = 3;

let pipeInterval = boardheight/4;

let gameOver = false;
let score = 0;

let interval;
let requestId;

window.onload = () => {
	board = document.getElementById('board');
	board.height = boardheight;
	board.width = boardwidth;
	context = board.getContext("2d");

	// draw bird

	// context.fillStyle = "green";
	// context.fillRect(birdX, birdY, birdwidth, birdHeight);

	// load image
	birdimage = new Image();
	birdimage.src = "../CONTENT/flappybird.png";
	TopPipeImg = new Image();
	TopPipeImg.src = "../CONTENT/toppipe.png";
	BotPipeImg = new Image();
	BotPipeImg.src = "../CONTENT/bottompipe.png";
	birdimage.onload = () => {
		context.drawImage(birdimage, birdX, birdY, birdwidth, birdHeight)
	}
	
	launch_game();
}

function launch_game(){
	context.clearRect(0, 0, boardwidth, boardheight);
	context.drawImage(birdimage, birdX, birdY, birdwidth, birdHeight);
	context.fillStyle = "white";
	context.font="45px sans-serif";
	context.fillText("press space", boardwidth/5, boardheight/2);
	document.addEventListener("keydown", starting);
	document.addEventListener("click", startingCl);
}

function start_game(){
	document.removeEventListener("keydown", starting);
	document.removeEventListener("click", startingCl);
	requestId = requestAnimationFrame(update);
	interval = setInterval(placesPipes, 1500); // every 1.5s
	document.addEventListener("keydown", movebird);
	document.addEventListener("click", movebirdCl);
	gameOver = false;
}

function restart(){
	document.removeEventListener("keydown", movebird);
	document.removeEventListener("click", movebirdCl);
	while (pipeArray.length > 0)
	{
		pipeArray.shift();
	}
	clearInterval(interval);
	cancelAnimationFrame(requestId);
	context.clearRect(0, 0, boardwidth, boardheight);
	birdX = boardwidth/8;
	birdY = boardheight/2;
	velocityY = 0;
	score = 0;
	launch_game();
}

function starting(e){
	if (e.code == "Space" || e.code == "ArrowUp"){
		start_game();
	}
}

function startingCl(){
	start_game();
}

function update(){
	if (gameOver){
		context.fillStyle = "black";
		context.font="45px sans-serif";
		context.fillText("Game Over", boardwidth/5, boardheight/2);
		sleep(1500).then(() => {
			restart();
			return ;
		});
		return ;
	}
	requestAnimationFrame(update);
	context.clearRect(0, 0, boardwidth, boardheight);

	// bird
	velocityY += gravity;
	// birdY += velocityY;
	birdY = Math.max(birdY + velocityY, 0);
	context.drawImage(birdimage, birdX, birdY, birdwidth, birdHeight);

	if (birdY > boardheight){
		gameOver = true;
	}

	//pipes

	for (let i = 0; i < pipeArray.length; i++) {
		let pipe = pipeArray[i];
		pipe.x += velocityX;
		context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
		let bird = {
			x: birdX,
			y: birdY,
			height: birdHeight,
			width: birdwidth
		}
		if (!pipe.passed && bird.x > pipe.x + pipe.width) {
			score += 0.5;
			pipe.passed = true;
		}

		if (detectCollision(bird, pipe))
			gameOver = true;
	}

	//pipe clear
	while (pipeArray.length > 0 && pipeArray[0].x < 0 - pipeWidth) {
		pipeArray.shift();
	}

	// add score
	context.fillStyle = "white";
	context.font="45px sans-serif";
	context.fillText(score, 5, 45);
}

function placesPipes() {
	if (gameOver){
		return ;
	}
	let randomPipeY = pipeY - pipeheight/4 - Math.random()*(pipeheight/2);

	let topPipe = {
		img : TopPipeImg,
		x: pipeX,
		y: randomPipeY,
		width: pipeWidth,
		height: pipeheight,
		passed: false
	}
	let bottomPipe = {
		img : BotPipeImg,
		x: pipeX,
		y: randomPipeY + pipeheight + pipeInterval,
		width: pipeWidth,
		height: pipeheight,
		passed: false
	}

	pipeArray.push(topPipe);
	pipeArray.push(bottomPipe);
}

function movebird(e){
	if (e.code == "Space" || e.code == "ArrowUp")
	{
		// JUMP
		velocityY = -jump_force;
	}
}

function movebirdCl(){
	velocityY = -jump_force;
}

function detectCollision(a, b){
	return a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.y < b.y + b.height &&
			a.y + a.height > b.y;
}