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
	img_loading: new Image(),
	img_GameO: new Image(),
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

let player = {
	img: {
		idle: {
			right: new Image(),
			left: new Image(),
		},
		move:{
			right: {
				f1: new Image(),
				f2: new Image(),
				f3: new Image(),
			},
			left: {
				f1: new Image(),
				f2: new Image(),
				f3: new Image(),
			},
			f_nb: 0,
		},
		jump: {
			right: {
				f1: new Image(),
				f2: new Image(),
				f3: new Image(),
			},
			left: {
				f1: new Image(),
				f2: new Image(),
				f3: new Image(),
			},
			f_nb: 0,
		},
		dead: new Image(),
	},
	x: 0,
	x_onmap: 0,
	y: 0,
	W: 32,
	H: 64,
	last_dir: 'l',
	gravity: 0,
	state: 2,
	mov_r: 0,
	mov_l: 0,
	is_mov: false,
	speed: 10,
	is_ground: false,
	is_jump: false,
	jump_force: 10,
	checkpoint: {
		x: 0,
		y: 0,
		x_off: 0,
	},
	live: 3,
	die: false,
	dead: false,
}

class lvl_obj{
	name;
	img;
	o_x;
	x;
	y;
	H;
	W;
	f_nb;
	couch;
	constructor(src, x, y, H, W, name, couch) {
		this.name = name;
		this.o_x = x,
		this.x = x;
		this.y = y;
		this.H = H;
		this.W = W;
		this.img = new Image();
		this.img.src = src;
		this.f_nb = 0;
		this.couch = couch;
	}
}

let LVL = {
	frame: 0,
	last_time: 0,
	t_inter: 0,
	x_offset: 0,
	Map: [],
	Props: [],
	enemy: [],
	BG: {
		bg: new Image(),
		heart: new Image(),
		bg_W: 6500,
		bg_H: 480,
		x: 0,
		y: 0,
	},
	frame: 0,
	win: false,
	anim_win: false,
}

//SOUND
let sound = {
	oneUp: new Audio("../Ct-mario/sound/1-up.wav"),
	gameOver: new Audio("../Ct-mario/sound/game-over.wav"),
	piece: new Audio("../Ct-mario/sound/piece.wav"),
	complet: new Audio("../Ct-mario/sound/complet.wav"),
	degat: new Audio("../Ct-mario/sound/mamamia.mp3"),
	checkpoint: new Audio("../Ct-mario/sound/checkpoint.wav"),
	jump: new Audio("../Ct-mario/sound/saut.wav"),
	break: new Audio("../Ct-mario/sound/break.mp3"),
}

let music = {
	lobby: new Audio("../Ct-mario/lobby.mp3"),
	plain: new Audio("../Ct-mario/plain.mp3"),
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
	player.img.move.right.f1.src = "../Ct-mario/player/moves/move-right1.png";
	player.img.move.right.f2.src = "../Ct-mario/player/moves/move-right2.png";
	player.img.move.right.f3.src = "../Ct-mario/player/moves/move-right3.png";
	player.img.move.left.f1.src = "../Ct-mario/player/moves/move-left1.png";
	player.img.move.left.f2.src = "../Ct-mario/player/moves/move-left2.png";
	player.img.move.left.f3.src = "../Ct-mario/player/moves/move-left3.png";
	player.img.jump.right.f1.src = "../Ct-mario/player/moves/jump-right1.png";
	player.img.jump.right.f2.src = "../Ct-mario/player/moves/jump-right2.png";
	player.img.jump.right.f3.src = "../Ct-mario/player/moves/jump-right3.png";
	player.img.jump.left.f1.src = "../Ct-mario/player/moves/jump-left1.png";
	player.img.jump.left.f2.src = "../Ct-mario/player/moves/jump-left2.png";
	player.img.jump.left.f3.src = "../Ct-mario/player/moves/jump-left3.png";
	player.img.dead.src = "../Ct-mario/player/dead.png";
	player.img.idle.right.src = "../Ct-mario/player/idle-right.png"
	player.img.idle.left.src = "../Ct-mario/player/idle-left.png"
	param.img_loading.src = "../Ct-mario/Loading.png";
	param.img_GameO.src = "../Ct-mario/Level/GameOver.png";
	LVL.BG.heart.src = "../Ct-mario/map-elem/heart.png";
}

function launch_game() {
	document.getElementById('start').classList.add('no');
	board.obj.classList.remove('no');
	board.obj.width = board.width;
	board.obj.height = board.height;
	sound.piece.volume = 0.2;
	sound.piece.play();
	sound.degat.volume = 0.6;
	sound.degat.playbackRate = 1.75;
	canva = board.obj.getContext("2d")
	board.titleImg.src = "../Ct-mario/TitleScreen.png";
	board.titleImg.onload = () => {
		canva.drawImage(board.titleImg, 0, 0, 640, 480);
	}
	load_Image();
	param.fps = 60;
	param.fpsInterval = 1000/param.fps;
	param.game_status = 0;
	sound.complet.volume = 0.3;
	sound.jump.volume = 0.15;
	sound.jump.playbackRate = 1.5;
	sound.break.playbackRate = 1.5;
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
	// reset LVL stat;
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
	reset_lvl();
	if (param.game_status == 4)
	{
		// GameOver
		GameOver_menu();
	}
	if (param.game_status == 5)
	{
		// WIN
		Win_menu();
	}
	if (param.game_status == 1)
	{
		LVL.last_time = Date.now();
		load_plain();
	}
}

// ======= GameOver PANEL =======

function GameOver_menu() {
	canva.clearRect(0, 0, board.width, board.height);
	canva.drawImage(param.img_GameO, 0, 0, 640, 480);
	sleep(1500).then(() => {
		param.game_status = 0;
		requestAnimationFrame(game);
	});
}

function Win_menu() {
	canva.clearRect(0, 0, board.width, board.height);
	canva.drawImage(param.img_loading, 0, 0, 640, 480);
	sleep(1500).then(() => {
		param.game_status = 0;
		requestAnimationFrame(game);
	});
}

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
		Lobby.player.pos = 2;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.sand_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.sand_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "ArrowLeft")
	{
		Lobby.player.pos = 1;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.water_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.water_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "ArrowRight")
	{
		Lobby.player.pos = 3;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.plain_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.plain_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "ArrowDown")
	{
		Lobby.player.pos = 4;
		Lobby.player.mov = (param.fps / 2);
		Lobby.player.x_dir = (Lobby.rock_lvl.x - Lobby.player.x) / (param.fps / 2);
		Lobby.player.y_dir = (Lobby.rock_lvl.y - Lobby.player.y) / (param.fps / 2);
	}
	else if (e.code == "Enter" || e.code == "Space"){
		if (Lobby.player.x == Lobby.water_lvl.x && Lobby.player.y == Lobby.water_lvl.y){
			
		}
		else if (Lobby.player.x == Lobby.plain_lvl.x && Lobby.player.y == Lobby.plain_lvl.y){
			param.game_status = 1;
		}
		else if (Lobby.player.x == Lobby.sand_lvl.x && Lobby.player.y == Lobby.sand_lvl.y){
			
		}
		else if (Lobby.player.x == Lobby.rock_lvl.x && Lobby.player.y == Lobby.rock_lvl.y){
			
		}
	}
	console.log(e.code);
}

// ======= WATER LEVEL =======

// ======= PLAIN LEVEL =======

function load_plain(){
	canva.drawImage(param.img_loading, 0, 0, 640, 480);

	// LEVEL DESIGN
	LVL.BG.bg.src = "../Ct-mario/Level/plain-bg.png";

	// FLoor ====
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 0, 400, 100, 600, "sol 1", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 1200, 400, 100, 600, "sol", 1));
		LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 1500, 350, 100, 600, "sol", 0));
		LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 1500, 300, 100, 600, "sol", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 1800, 400, 100, 600, "sol", 1));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 3600, 400, 100, 600, "sol", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 4200, 400, 100, 600, "sol", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 5400, 400, 100, 600, "sol", 0));
	// =============

	// EWD ==== 
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 6000, 400, 100, 600, "sol", 0));
	LVL.Props.push(new lvl_obj("../Ct-mario/map-elem/win-flag.png", 6300, 100, 300, 93, "w-flag", 0));
	// =====

	// Design
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 200, 250, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 232, 250, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 264, 250, 32, 32, "block", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 280, 325, 32, 32, "gumba_v1", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 400, 325, 150, 50, "pipe", 1));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 900, 350, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 932, 350, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 964, 350, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 1200, 325, 150, 50, "pipe", 2));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 1200, 325, 75, 50, "plant", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 1400, 300, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 1468, 325, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 1550, 225, 150, 50, "pipe", 2));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 1550, 225, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 2000, 225, 150, 50, "pipe", 2));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 2000, 225, 75, 50, "plant", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 1900, 200, 32, 32, "gumba_v1", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 1700, 200, 32, 32, "gumba_v1", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 1750, 200, 32, 32, "gumba_v1", 0));

	LVL.Props.push(new lvl_obj("../Ct-mario/map-elem/check-flag1.png", 2300, 300, 100, 50, "c-flag", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 2500, 325, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 2532, 325, 32, 32, "block", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 2632, 275, 32, 32, "spike", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 2732, 325, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 2764, 325, 32, 32, "block", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 2864, 275, 32, 32, "spike", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 2964, 325, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 2996, 325, 32, 32, "block", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3064, 275, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3064, 307, 32, 32, "spike", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 3150, 420, 32, 32, "block", 0));

	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3200, 132, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3200, 164, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3200, 196, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3200, 228, 32, 32, "spike", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 3450, 388, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 3482, 388, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 3514, 388, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 3546, 350, 150, 50, "pipe", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 3546, 350, 75, 50, "plant", 0));

	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3600, 368, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3600, 336, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3732, 368, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3732, 336, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3864, 368, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3864, 336, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3996, 388, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3996, 356, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 3996, 324, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 3600, 300, 32, 32, "gumba_v1", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 3700, 300, 32, 32, "gumba_v1", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 3800, 300, 32, 32, "gumba_v1", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4150, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4150, 350, 75, 50, "plant", 0));

	LVL.Props.push(new lvl_obj("../Ct-mario/map-elem/check-flag1.png", 4350, 300, 100, 50, "c-flag", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4550, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4550, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4600, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4600, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4650, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4650, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4700, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4700, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4750, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4750, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4800, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4800, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4850, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4850, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 4850, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 4850, 350, 75, 50, "plant", 0));


	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 356, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 324, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 292, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 260, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 228, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 196, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 164, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 132, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 100, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 68, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5000, 36, 32, 32, "spike", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 4900, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 4932, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 4964, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 4996, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5028, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5060, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5092, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5124, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5156, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5188, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5220, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5252, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5284, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5316, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5348, 460, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5380, 460, 32, 32, "block", 2));

	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 420, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 388, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 356, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 324, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 292, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 260, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 228, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 196, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 164, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 132, 32, 32, "spike", 0));
	LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 5400, 100, 32, 32, "spike", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5360, 380, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5328, 380, 32, 32, "block", 2));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5060, 330, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5092, 330, 32, 32, "block", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5360, 250, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5328, 250, 32, 32, "block", 2));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5060, 180, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5092, 180, 32, 32, "block", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5360, 130, 32, 32, "block", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 5328, 130, 32, 32, "block", 2));

	LVL.Props.push(new lvl_obj("../Ct-mario/map-elem/check-flag1.png", 5600, 300, 100, 50, "c-flag", 0));

	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 5700, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 5700, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 5750, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 5750, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 5800, 350, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 5800, 350, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 5850, 300, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 5850, 300, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 5900, 300, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 5900, 300, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 5950, 300, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 5950, 300, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 6000, 300, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 6000, 300, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 6050, 250, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 6050, 250, 75, 50, "plant", 0));
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 6100, 250, 150, 50, "pipe", 1));
	LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 6100, 250, 75, 50, "plant", 0));
	// =========

	// LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/pipe1.png", 500, 300, 150, 50, "pipe", 1));
	// LVL.enemy.push(new lvl_obj("../Ct-mario/map-elem/spikes1.png", 168, 370, 32, 32, "spike", 0));
	// LVL.Props.push(new lvl_obj("../Ct-mario/map-elem/check-flag1.png", 1000, 300, 100, 50, "c-flag", 0));
	// LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/block.png", 1050, 250, 32, 32, "block", 0));
	// LVL.enemy.push(new lvl_obj("../Ct-mario/gumba/gumba1.png", 800, 200, 32, 32, "gumba_v1", 0));
	// LVL.enemy.push(new lvl_obj("../Ct-mario/plant/plant.png", 550, 300, 75, 50, "plant", 0));

	player.x = 20;
	player.x_onmap = player.x;
	player.y = 200;
	player.checkpoint.x = player.x;
	player.checkpoint.y = player.y;
	player.live = 3;
	sleep(1500).then(() => {
		music.plain.loop = true;
		music.plain.volume = 0.5;
		music.plain.play();
		// add the evenListener
		document.addEventListener("keydown",level_event_down);
		document.addEventListener("keyup",level_event_up);
		PLAIN();
	});
}

function PLAIN(){
	// Console the room where we are 
	// console.log(player.gravity);
	// clear the canva
	canva.clearRect(0, 0, board.width, board.height);
	// DRAW EVERYTHING
	draw_all();	// Map + Props
	draw_player(); // Player

	// calc
	if (player.is_ground){
		if (player.is_mov)
			player.state = 1;
		else
			player.state = 0;
	}
	else if (player.is_jump){
		player.state = 2;
	}
	else
		player.state = 0;
	// FPS CALC
	LVL.t_inter = Date.now() - LVL.last_time;
	if (LVL.t_inter < param.fpsInterval)
	{
		plain_loop();
		return ;
	}
	LVL.last_time = Date.now();
	LVL.frame++;
	if (LVL.frame >= param.fps)
		LVL.frame = 0;

	player.gravity += 0.5;
	player.gravity = Math.min(player.gravity, 10);

	
	if (!player.die && !player.dead && !LVL.win)
	{
		apply_player_gravity();
		apply_player_move();
		animate();
		check_props();
		check_death();
	}
	
	if (LVL.win)
	{
		if (player.anim_win){
			level_win();
		}
		animate();
		apply_player_gravity();
	}
	
	animate_enemy();
		
	plain_loop();
}
function draw_all(){
	canva.drawImage(LVL.BG.bg, LVL.BG.x + LVL.x_offset, LVL.BG.y, LVL.BG.bg_W, LVL.BG.bg_H); // Background
	if (player.live >= 1)
		canva.drawImage(LVL.BG.heart, 10, 10, 32, 32);
	if (player.live >= 2)
		canva.drawImage(LVL.BG.heart, 42, 10, 32, 32);
	if (player.live >= 3)
		canva.drawImage(LVL.BG.heart, 74, 10, 32, 32);
	for (let i = 0; i < LVL.enemy.length; i++)
	{
		LVL.enemy[i].x = LVL.enemy[i].o_x + LVL.x_offset;
		canva.drawImage(LVL.enemy[i].img, LVL.enemy[i].x, LVL.enemy[i].y, LVL.enemy[i].W, LVL.enemy[i].H);
	}
	// ======== MAP ======
	for (let i = 0; i < LVL.Map.length; i++)
	{
		if (LVL.Map[i].couch == 2)
		{
			LVL.Map[i].x = LVL.Map[i].o_x + LVL.x_offset;
			canva.drawImage(LVL.Map[i].img, LVL.Map[i].x, LVL.Map[i].y, LVL.Map[i].W, LVL.Map[i].H);
		}
	}
	for (let i = 0; i < LVL.Map.length; i++)
	{
		if (LVL.Map[i].couch == 1)
		{
			LVL.Map[i].x = LVL.Map[i].o_x + LVL.x_offset;
			canva.drawImage(LVL.Map[i].img, LVL.Map[i].x, LVL.Map[i].y, LVL.Map[i].W, LVL.Map[i].H);
		}
	}
	for (let i = 0; i < LVL.Map.length; i++)
	{
		if (LVL.Map[i].couch == 0)
		{
			LVL.Map[i].x = LVL.Map[i].o_x + LVL.x_offset;
			canva.drawImage(LVL.Map[i].img, LVL.Map[i].x, LVL.Map[i].y, LVL.Map[i].W, LVL.Map[i].H);
		}
	}
	// ==== props
	for (let i = 0; i < LVL.Props.length; i++)
	{
		LVL.Props[i].x = LVL.Props[i].o_x + LVL.x_offset;
		canva.drawImage(LVL.Props[i].img, LVL.Props[i].x, LVL.Props[i].y, LVL.Props[i].W, LVL.Props[i].H);
	}
}
function draw_player(){
	if (player.state == 0)
	{
		player.img.jump.f_nb = 0;
		player.img.move.f_nb = 0;
		if (player.last_dir == 'r')
			canva.drawImage(player.img.idle.right, player.x, player.y, player.W, player.H);
		else if (player.last_dir == 'l')
			canva.drawImage(player.img.idle.left, player.x, player.y, player.W, player.H);
	}
	else if (player.state == 1)
	{
		player.img.jump.f_nb = 0;
		if (player.last_dir == 'r')
		{
			if (player.img.move.f_nb == 0)
				canva.drawImage(player.img.move.right.f1, player.x, player.y, player.W, player.H);
			else if (player.img.move.f_nb == 1)
				canva.drawImage(player.img.move.right.f2, player.x, player.y, player.W, player.H);
			else if (player.img.move.f_nb == 2)
				canva.drawImage(player.img.move.right.f3, player.x, player.y, player.W, player.H);
		}
		else if (player.last_dir == 'l')
		{
			if (player.img.move.f_nb == 0)
				canva.drawImage(player.img.move.left.f1, player.x, player.y, player.W, player.H);
			else if (player.img.move.f_nb == 1)
				canva.drawImage(player.img.move.left.f2, player.x, player.y, player.W, player.H);
			else if (player.img.move.f_nb == 2)
				canva.drawImage(player.img.move.left.f3, player.x, player.y, player.W, player.H);
		}
	}
	else if (player.state == 2)
	{
		player.img.move.f_nb = 0;
		if (player.last_dir == 'r')
		{
			if (player.img.jump.f_nb == 0)
				canva.drawImage(player.img.jump.right.f1, player.x, player.y, player.W, player.H);
			else if (player.img.jump.f_nb == 1)
				canva.drawImage(player.img.jump.right.f2, player.x, player.y, player.W, player.H);
			else if (player.img.jump.f_nb == 2)
				canva.drawImage(player.img.jump.right.f3, player.x, player.y, player.W, player.H);
		}
		else if (player.last_dir == 'l')
		{
			if (player.img.jump.f_nb == 0)
				canva.drawImage(player.img.jump.left.f1, player.x, player.y, player.W, player.H);
			else if (player.img.jump.f_nb == 1)
				canva.drawImage(player.img.jump.left.f2, player.x, player.y, player.W, player.H);
			else if (player.img.jump.f_nb == 2)
				canva.drawImage(player.img.jump.left.f3, player.x, player.y, player.W, player.H);
		}
	}
}
function plain_loop(){
	if (param.ON && param.game_status == 1){
		requestAnimationFrame(PLAIN);
	}
	else
	{
		// LEAVE
		music.plain.pause();
		music.plain.currentTime = 0;
		LVL.frame = 0;
		player.x = 0;
		player.y = 0;
		player.img.jump.f_nb = 0;
		player.img.move.f_nb = 0;
		LVL.win = false;
		player.anim_win = false;
		LVL.x_offset = 0;
		document.removeEventListener("keydown",level_event_down);
		document.removeEventListener("keyup",level_event_up);
		requestAnimationFrame(game);
	}
}

// ======= SAND LEVEL =======

// ======= ROCK LEVEL =======

// ======== DEBUG PANEL ===========

function apply_player_gravity(){
	if (player.gravity == 0)
		return ;
	let simul = {
		x: player.x,
		y: player.y + player.gravity,
		H: player.H,
		W: player.W,
	}
	for (let i = 0; i < LVL.Map.length; i++)
	{
		if (detectCollision(LVL.Map[i], simul))
		{
			if (player.gravity > 0)
			{
				for (simul.y; simul.y >= player.y; simul.y--)
				{
					if (!detectCollision(LVL.Map[i], simul)){
						player.is_ground = true;
						player.is_jump = false;
						player.y = simul.y; 
						return ;
					}
				}
			}
			else
			{
				for (simul.y; simul.y <= player.y; simul.y++)
				{
					if (!detectCollision(LVL.Map[i], simul)){
						player.gravity = 1;
						player.y = simul.y++;
						if (LVL.Map[i].name == "block"){
							sound.break.play();
							delete LVL.Map.splice(i,1);
						}
						return ;
					}
				}
			}
			return ;
		}
	}
	player.is_ground = false;
	player.y += player.gravity;
}

function apply_gravity(o){
	let simul = {
		x: o.x,
		y: o.y + 5,
		H: o.H,
		W: o.W,
	}
	for (let i = 0; i < LVL.Map.length; i++)
	{
		if (detectCollision(LVL.Map[i], simul))
		{
			for (simul.y; simul.y >= o.y; simul.y--)
			{
				if (!detectCollision(LVL.Map[i], simul)){
					o.is_ground = true;
					o.is_jump = false;
					o.y = simul.y; 
					return ;
				}
			}
		}
	}
	o.y += 5;
}
function apply_player_move(){
	let dir = player.mov_r - player.mov_l;
	if (dir == 0){
		player.is_mov = false;
		return ;
	}
	else{
		player.is_mov = true;
		if (dir > 0)
			player.last_dir = 'r';
		else
			player.last_dir = 'l';
	}

	let simul = {
		x: player.x + (dir * player.speed),
		y: player.y,
		H: player.H,
		W: player.W,
	}
	for (let i = 0; i < LVL.Map.length; i++)
	{
		if (detectCollision(LVL.Map[i], simul))
		{
			if (dir > 1)
			{
				for (simul.x; simul.x >= player.x; simul.x--)
				{
					if (!detectCollision(LVL.Map[i], simul)){
						if (player.x > 340 && LVL.x_offset > -5800)
						{
							LVL.x_offset = Math.max(LVL.x_offset -= (simul.x - player.x), -5800);
							return ;
						}
						player.x = simul.x; 
						return ;
					}
				}
			}
			else
			{
				for (simul.x; simul.x <= player.x; simul.x++)
				{
					if (!detectCollision(LVL.Map[i], simul)){
						if (player.x < 240 && LVL.x_offset < 0)
						{
							LVL.x_offset = Math.min(LVL.x_offset += (player.x - simul.x), 0);
							return ;
						}
						player.x = simul.x;
						return ;
					}
				}
			}
			return ;
		}
	}
	if (player.x > 340 && LVL.x_offset > -5800 && dir == 1)
	{
		LVL.x_offset = Math.max(LVL.x_offset -= player.speed, -5800);
		return ;
	}
	else if (player.x < 240 && LVL.x_offset < 0 && dir == -1)
	{
		LVL.x_offset = Math.min(LVL.x_offset += player.speed, 0);
		return ;
	}
	else
		player.x += (dir * player.speed);
}
function apply_move(o, dir, speed){
	let simul = {
		x: o.o_x + (dir * speed),
		y: o.y,
		H: o.H,
		W: o.W,
	}
	for (let i = 0; i < LVL.Map.length; i++)
	{
		let simur = {
			x: LVL.Map[i].o_x,
			y: LVL.Map[i].y,
			H: LVL.Map[i].H,
			W: LVL.Map[i].W,
		}
		if (detectCollision(simur, simul))
		{
			if (dir == 1)
			{
				for (simul.x; simul.x >= o.o_x; simul.x--)
				{
					if (!detectCollision(simur, simul)){
						o.o_x = simul.x;
						return ;
					}
				}
				return ;
			}
			else if (dir == -1)
			{
				for (simul.x; simul.x <= o.x; simul.x++)
				{
					if (!detectCollision(simur, simul)){
						o.o_x = simul.x;
						return ;
					}
				}
				return ;
			}
			return ;
		}
	}
	o.o_x = simul.x;
}

function check_death(){
	if (player.y >= 450){
		player_die();
	}
	for (let i = 0; i < LVL.enemy.length; i++)
	{
		if (detectCollision(player, LVL.enemy[i]))
		{
			if (LVL.enemy[i].name == "gumba_v1")
			{
				if (detectCollision_top(player, LVL.enemy[i]))
				{
					sound.piece.play();
					player.gravity = -player.jump_force;
					LVL.enemy[i].couch = -1;
					LVL.enemy[i].img.src = "../Ct-mario/gumba/gumba3.png";
					sleep(500).then(() => {
						delete LVL.enemy.splice(i, 1);
					});
					return;
				}
				else
				{
					player_die();
				}
			}
			else
			{
				player_die();
			}
			return ;
		}
	}
}

function check_props(){
	for (let i = 0; i < LVL.Props.length; i++)
	{
		if (detectCollision(player, LVL.Props[i]))
		{
			Props_action(LVL.Props[i])
			return ;
		}
	}
}

function Props_action(props){
	if (props.name == "c-flag"){
		props.name = "c-flag-use";
		player.checkpoint.x = player.x;
		player.checkpoint.y = player.y;
		player.checkpoint.x_off = LVL.x_offset;
		sound.checkpoint.play();
		props.img.src = "../Ct-mario/map-elem/check-flag2.png";
	}
	if (props.name == "w-flag"){
		props.name = "w-flag-use";
		player.checkpoint.x = player.x;
		player.checkpoint.y = player.y;
		player.checkpoint.x_off = LVL.x_offset;
		document.removeEventListener("keydown",level_event_down);
		document.removeEventListener("keyup",level_event_up);
		player.mov_l = 0;
		player.mov_r = 0;
		music.plain.pause();
		sound.complet.play();
		LVL.win = true;
		props.img.src = "../Ct-mario/map-elem/win-flag2.png";
		player.is_mov = 0;
		sleep(5500).then(() => {
			player.anim_win = true;
			player.is_mov = true;
			sleep(2500).then(() => {
				param.game_status = 5;
			});
		});
	}
}

function animate(){
	if (player.state == 1)
	{
		player.img.move.f_nb = parseInt(LVL.frame / 10) % 3;
	}
}

function animate_enemy(){
	for (let i = 0; i < LVL.enemy.length; i++)
	{
		if (LVL.enemy[i].name == "plant"){
			LVL.enemy[i].f_nb++;
			if (LVL.enemy[i].f_nb > 0 && LVL.enemy[i].f_nb <= param.fps)
			{
				LVL.enemy[i].y--;
			}
			else if (LVL.enemy[i].f_nb > param.fps && LVL.enemy[i].f_nb <= param.fps * 3)
			{
			}
			else if (LVL.enemy[i].f_nb > param.fps * 3 && LVL.enemy[i].f_nb <= param.fps * 4)
			{
				LVL.enemy[i].y++;
			}
			else if (LVL.enemy[i].f_nb > param.fps * 4 && LVL.enemy[i].f_nb <= param.fps * 7)
			{
				// comment
			}
			else
			{
				LVL.enemy[i].f_nb = 0;
			}
		}
		else if (LVL.enemy[i].name == "gumba_v1"){
			apply_gravity(LVL.enemy[i]);
			LVL.enemy[i].f_nb++;

			// apply_move
			if (LVL.enemy[i].f_nb > 0 && LVL.enemy[i].f_nb <= param.fps * 3)
			{
				apply_move(LVL.enemy[i], 1, 1);
				if (parseInt((LVL.enemy[i].f_nb / 10)) % 2 == 0 && LVL.enemy[i].couch != -1)
					LVL.enemy[i].img.src = "../Ct-mario/gumba/gumba1.png";
				else if (LVL.enemy[i].couch != -1)
					LVL.enemy[i].img.src = "../Ct-mario/gumba/gumba2.png";
			}
			else if (LVL.enemy[i].f_nb > param.fps * 3 && LVL.enemy[i].f_nb <= param.fps * 4)
			{
				// test
			}
			else if (LVL.enemy[i].f_nb > param.fps * 4 && LVL.enemy[i].f_nb <= param.fps * 7)
			{
				apply_move(LVL.enemy[i], -1, 1);
				if (parseInt((LVL.enemy[i].f_nb / 10)) % 2 == 0 && LVL.enemy[i].couch != -1)
					LVL.enemy[i].img.src = "../Ct-mario/gumba/gumba1.png";
				else if (LVL.enemy[i].couch != -1)
					LVL.enemy[i].img.src = "../Ct-mario/gumba/gumba2.png";
			}
			else if (LVL.enemy[i].f_nb > param.fps * 7 && LVL.enemy[i].f_nb <= param.fps * 8)
			{
				//test
			}
			else
			{
				LVL.enemy[i].f_nb = 0;
			}
			// detect death
			if (LVL.enemy[i].y >= 470)
			{
				delete LVL.enemy.splice(i, 1);
				i--;
			}
		}
	}
}

function player_die(){
	sound.degat.play();
	player.live--;
	player.die = true;
	sleep(1500).then(() => {
		if (player.live <= 0)
		{
			player.dead = true;
			param.game_status = 4;
		}
		else
		{
			player.x = player.checkpoint.x;
			player.y = player.checkpoint.y;
			LVL.x_offset = player.checkpoint.x_off;
			player.die = false;
		}
	});
}

function level_win(){
	player.mov_r = 1;
	player.state = 1;
	player.x += player.speed;
}

function level_event_down(e){
	if (e.code == "ArrowRight" || e.code == "KeyD"){
		// Right
		player.mov_r = 1;
	}
	if (e.code == "ArrowLeft" || e.code == "KeyA"){
		// Left
		player.mov_l = 1;
	}
	if (e.code == "ArrowUp" || e.code == "KeyW" || e.code == "Space"){
		// Up
		if (player.is_ground)
		{
			// console.log(e.code);
			sound.jump.play();
			player.gravity = -player.jump_force;
			player.is_jump = true;
		}
	}
	// if (e.code == "ArrowDown" || e.code == "KeyS"){
	// 	// Down
	// }
	if (e.code == "Escape"){
		// Left
		player_die();
	}
}

function level_event_up(e){
	if (e.code == "ArrowRight" || e.code == "KeyD"){
		// Right
		player.mov_r = 0;
	}
	if (e.code == "ArrowLeft" || e.code == "KeyA"){
		// Left
		player.mov_l = 0;
	}
	// if (e.code == "ArrowUp" || e.code == "KeyW"){
	// 	// Up
	// }
	// if (e.code == "ArrowDown" || e.code == "KeyS"){
	// 	// Down
	// }
}

function reset_lvl(){
	LVL.BG.bg.src = '';
	while(LVL.Map.length > 0)
	{
		LVL.Map.shift();
	}
	while(LVL.Props.length > 0)
	{
		LVL.Props.shift();
	}
	while(LVL.enemy.length > 0)
	{
		LVL.enemy.shift();
	}
	player.checkpoint.x = 0;
	player.checkpoint.y = 0;
	player.checkpoint.x_off = 0;
	player.live = 3;
	player.die = false;
	player.dead = false;
	player.mov_l = 0;
	player.mov_r = 0;
	player.is_mov = false;
	LVL.x_offset = 0;
	LVL.win = false;
	player.anim_win = false;
}

function detectCollision(a, b){
	return a.x < b.x + b.W &&
			a.x + a.W > b.x &&
			a.y < b.y + b.H &&
			a.y + a.H > b.y;
}

function detectCollision_top(p, b){

	if (p.y < b.y && p.y + p.H > b.y /*Collide top*/ )
	{	
		if (p.x > b.x && p.x + p.W < b.x + b.W)
			return true;
		else if ((/*collide right*/ p.x < b.x && p.x + p.W > b.x) && (/*collide left*/ p.x + p.W > b.x + b.W && p.x < b.x + b.W))
			return true
		else if ((/*collide right*/ p.x < b.x && p.x + p.W > b.x) && !(/*collide left*/ p.x + p.W > b.x + b.W && p.x < b.x + b.W))
		{
			if (p.y + p.H - b.y <= 20)
				return true;
			else
				return false;
		}
		else if (!(/*collide right*/ p.x < b.x && p.x + p.W > b.x) && (/*collide left*/ p.x + p.W > b.x + b.W && p.x < b.x + b.W))
		{
			if (p.y + p.H - b.y <= 20)
				return true;
			else
				return false;
		}
		else
			return false;
	}
	// else
	return false;
}