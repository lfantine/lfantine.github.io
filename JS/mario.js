// sleep time expects milliseconds
function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}



// format <span class="games">1 : you made 5 !</span>

function back(){
	const bk = document.getElementById('bbut');
	bk.classList.add("bye");
	sleep(1500).then(() => {
		window.open("../index.html", "_self");
	});
}


// ============== MARIO ============//


// BOARD
let canva;
let board = {
	obj: document.getElementById('board'),
	width: 640,
	height: 480,
	titleImg: new Image(),
	lobbyImg: new Image(),
};

let param = {
	fps: 60,
	fpsInterval: 0
}

let player_menu = {
	x: 0,
	y: 0,
	speed: 3,
	img: new Image(),
	pos: 1
}

//SOUND
let sound = {
	oneUp: new Audio("../Ct-mario/sound/1-up.wav"),
	gameOver: new Audio("../Ct-mario/sound/game-over.wav"),
	piece: new Audio("../Ct-mario/sound/piece.wav"),
}

let music = {
	lobby: new Audio("../Ct-mario/lobby.mp3"),
}

function load_Image(){
	board.lobbyImg.src = "../Ct-mario/lobby.png";
	player_menu.img.src = "../Ct-mario/mario.png"
	music.lobby.volume = 0.5;
}

function launch_game() {
	document.getElementById('start').classList.add('no');
	board.obj.classList.remove('no');
	board.obj.width = board.width;
	board.obj.height = board.height;
	sound.piece.volume = 0.2;
	sound.piece.play();
	canva = board.obj.getContext("2d")
	board.titleImg.src = "../Ct-mario/TitleScreen.png";
	board.titleImg.onload = () => {
		canva.drawImage(board.titleImg, 0, 0, 640, 480);
	}
	load_Image();
	param.fps = 60;
	param.fpsInterval = 1000/param.fps;
	sleep(1500).then(() => {
		start_game();
	});
}

function drawRotated(degrees, img){
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    canva.save();
    // move to the center of the canvas
    canva.translate(canvas.width/2,canvas.height/2);
    // rotate the canvas to the specified degrees
    canva.rotate(degrees*Math.PI/180);
    // draw the image
    // since the context is rotated, the image will be rotated also
    canva.drawImage(img,-img.width/2,-img.width/2);
    // we’re done with the rotating so restore the unrotated context
    canva.restore();
}

function start_game(){
	canva.clearRect(0, 0, board.width, board.height);
	canva.drawImage(board.lobbyImg, 0, 0, 640, 480);
	music.lobby.play();
}