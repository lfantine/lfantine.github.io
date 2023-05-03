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
	fpsInterval: 0,
	game_status: 0,
	ON: true,
}

let Lobby = {
	time_interval: 0,
	last_time: 0,
	player: {
		f_0: new Image(),
		f_1: new Image(),
		f_2: new Image(),
		f_3: new Image(),
		f_4: new Image(),
		f_5: new Image(),
		f_6: new Image(),
		f_7: new Image(),
		f_8: new Image(),
		f_9: new Image(),
		f_count: 0,
		f_number: 10,
		width: 32,
		height: 32,
		x: 0,
		y: 0,
		pos: 0,
		x_dir: 0,
		y_dir: 0,
		mov: 0
	},
	frame: 0,
	water_lvl: {
		x: 35,
		y: 28
	},
	plain_lvl: {
		x: 545,
		y: 40
	},
	sand_lvl: {
		x: 300,
		y: 25
	},
	rock_lvl: {
		x: 535,
		y: 345
	},
	w_ttl: new Image(),
	s_ttl: new Image(),
	r_ttl: new Image(),
	p_ttl: new Image()
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
	music.lobby.volume = 0.5;
	Lobby.player.f_0.src = "../Ct-mario/lobby_player_anim/player_lobby_f_0.png";
	Lobby.player.f_1.src = "../Ct-mario/lobby_player_anim/player_lobby_f_1.png";
	Lobby.player.f_2.src = "../Ct-mario/lobby_player_anim/player_lobby_f_2.png";
	Lobby.player.f_3.src = "../Ct-mario/lobby_player_anim/player_lobby_f_3.png";
	Lobby.player.f_4.src = "../Ct-mario/lobby_player_anim/player_lobby_f_4.png";
	Lobby.player.f_5.src = "../Ct-mario/lobby_player_anim/player_lobby_f_5.png";
	Lobby.player.f_6.src = "../Ct-mario/lobby_player_anim/player_lobby_f_6.png";
	Lobby.player.f_7.src = "../Ct-mario/lobby_player_anim/player_lobby_f_7.png";
	Lobby.player.f_8.src = "../Ct-mario/lobby_player_anim/player_lobby_f_8.png";
	Lobby.player.f_9.src = "../Ct-mario/lobby_player_anim/player_lobby_f_9.png";
	Lobby.w_ttl.src = "../Ct-mario/water_title.png";
	Lobby.p_ttl.src = "../Ct-mario/plain_title.png";
	Lobby.s_ttl.src = "../Ct-mario/sand_title.png";
	Lobby.r_ttl.src = "../Ct-mario/rock_title.png";
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
	param.game_status = 0;
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
	param.ON = true;
	game();
	Lobby.player.x = 35;
	Lobby.player.y = 28;
	music.lobby.loop = true;
}

function game(){
	canva.clearRect(0, 0, board.width, board.height);

	// Frame calc

	console.log("game");

	canva.clearRect(0, 0, board.width, board.height);
	// Go in paint
	if (param.game_status == -1){
		// Leave
		document.getElementById('start').classList.remove('no');
		board.obj.classList.add('no');
	}
	if (param.game_status == 0){
		Lobby.last_time = Date.now();
		lobby_menu();
	}
}

// ========= Time function ========

// ======= LOBBY PANEL =======

function lobby_menu(){
	// Console the room where we are 
	// console.log("lobby");
	// clear the canva
	canva.clearRect(0, 0, board.width, board.height);
	// DRAW THE BACKGROUND
	canva.drawImage(board.lobbyImg, 0, 0, 640, 480);
	// add the evenListener
	document.addEventListener("keydown",lobby_event);
	// PLAY MUSIC
	music.lobby.play();

	//draw level repere
	if (Lobby.player.x == Lobby.water_lvl.x && Lobby.player.y == Lobby.water_lvl.y){
		canva.drawImage(Lobby.w_ttl, 25, 70, 70, 40);
	}
	else if (Lobby.player.x == Lobby.plain_lvl.x && Lobby.player.y == Lobby.plain_lvl.y){
		canva.drawImage(Lobby.p_ttl, 510, 80, 70, 40);
	}
	else if (Lobby.player.x == Lobby.sand_lvl.x && Lobby.player.y == Lobby.sand_lvl.y){
		canva.drawImage(Lobby.s_ttl, 270, 80, 70, 40);
	}
	else if (Lobby.player.x == Lobby.rock_lvl.x && Lobby.player.y == Lobby.rock_lvl.y){
		canva.drawImage(Lobby.r_ttl, 510, 400, 70, 40);
	}

	// There you need to draw the actual version of image
	lobby_drawPlayer();
	
	// FRAME CALC
	Lobby.time_interval = Date.now() - Lobby.last_time;
	if (Lobby.time_interval < param.fpsInterval)
	{
		lobby_loop();
		return ;
	}
	Lobby.last_time = Date.now();
	// console.log("fps");

	// fluid movement to next place
	if (Lobby.player.mov > 0){
		Lobby.player.x += Lobby.player.x_dir;
		Lobby.player.y += Lobby.player.y_dir;
		Lobby.player.mov--;
		if(Lobby.player.mov == 0){
			Lobby.player.y = Math.round(Lobby.player.y * 100) / 100;
			Lobby.player.x = Math.round(Lobby.player.x * 100) / 100;
			console.log("Player x: " + Lobby.player.x + " y: " + Lobby.player.y);
		}
	}

	Lobby.frame++;
	if (Lobby.frame >= param.fps)
		Lobby.frame = 0;

	// Make variation on level and animation
	Lobby.player.f_count = parseInt(Lobby.frame / (param.fps / Lobby.player.f_number));

	// loop
	lobby_loop();
}
function lobby_loop(){
	if (param.ON && param.game_status == 0){
		requestAnimationFrame(lobby_menu);
	}
	else
	{
		// LEAVE
		music.lobby.pause();
		music.lobby.currentTime = 0;
		Lobby.frame = 0;
		Lobby.player.x = 50;
		Lobby.player.y = 50;
		Lobby.player.f_count = 0;
		document.removeEventListener("keydown",lobby_event);
		requestAnimationFrame(game);
	}
}
function lobby_drawPlayer()
{
	if (Lobby.player.f_count == 0)
	{
		canva.drawImage(Lobby.player.f_0, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 1)
	{
		canva.drawImage(Lobby.player.f_1, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 2)
	{
		canva.drawImage(Lobby.player.f_2, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 3)
	{
		canva.drawImage(Lobby.player.f_3, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 4)
	{
		canva.drawImage(Lobby.player.f_4, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 5)
	{
		canva.drawImage(Lobby.player.f_5, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 6)
	{
		canva.drawImage(Lobby.player.f_6, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 7)
	{
		canva.drawImage(Lobby.player.f_7, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 8)
	{
		canva.drawImage(Lobby.player.f_8, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
	else if (Lobby.player.f_count == 9)
	{
		canva.drawImage(Lobby.player.f_9, Lobby.player.x, Lobby.player.y, Lobby.player.width, Lobby.player.height);
		return ;
	}
}
function lobby_event(e){
	if (e.code == "Escape")
	{
		param.game_status = -1;
	}
	else if (e.code == "ArrowUp")
	{
		Lobby.player.pos = 1;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.sand_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.sand_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "ArrowLeft")
	{
		Lobby.player.pos = 0;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.water_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.water_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "ArrowRight")
	{
		Lobby.player.pos = 2;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.plain_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.plain_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "ArrowDown")
	{
		Lobby.player.pos = 3;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.rock_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.rock_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "Enter" || e.code == "Space"){

	}
	console.log(e.code);
}

// ======== DEBUG PANEL ===========

function other_menu(){
	canva.drawImage(board.titleImg, 0, 0, 640, 480);
	// music.lobby.play();

	console.log("other");

	// loop
	if (param.ON && param.game_status == 1){
		requestAnimationFrame(other_menu);
	}
}