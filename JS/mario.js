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
}

class lvl_obj{
	name;
	img;
	x;
	y;
	H;
	W;
	constructor(src, x, y, H, W, name) {
		this.name = name;
		this.x = x,
		this.y = y;
		this.H = H;
		this.W = W;
		this.img = new Image();
		this.img.src = src;
	}
}


let LVL = {
	frame: 0,
	last_time: 0,
	t_inter: 0,
	Map: [],
	Props: [],
	BG: {
		bg: new Image(),
		bg_W: 3840,
		bg_H: 480,
		x: 0,
		y: 0,
	},
	frame: 0,
}

//SOUND
let sound = {
	oneUp: new Audio("../Ct-mario/sound/1-up.wav"),
	gameOver: new Audio("../Ct-mario/sound/game-over.wav"),
	piece: new Audio("../Ct-mario/sound/piece.wav"),
	complet: new Audio("../Ct-mario/stage-clear.mp3"),
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
	// reset LVL stat;
	reset_lvl();
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
	if (param.game_status == 1)
	{
		LVL.last_time = Date.now();
		load_plain();
	}
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
	LVL.BG.bg.src = "../Ct-mario/Level/plain-bg.png";
	LVL.Map.push(new lvl_obj("../Ct-mario/map-elem/sol_1.png", 0, 400, 100, 600, "sol"));
	// console.table(player.gravity);
	player.x = 20;
	player.x_onmap = player.x;
	player.y = 200;
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
	canva.drawImage(LVL.BG.bg, LVL.BG.x, LVL.BG.y, LVL.BG.bg_W, LVL.BG.bg_H); // Background
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

	apply_player_gravity();
	apply_player_move();



	plain_loop();
}
function draw_all(){
	for (let i = 0; i < LVL.Map.length; i++)
	{
		// console.table(LVL.Map[i]);
		canva.drawImage(LVL.Map[i].img, LVL.Map[i].x, LVL.Map[i].y, LVL.Map[i].W, LVL.Map[i].H);
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
						// player.gravity = 1;
						player.y = simul.y++;
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
						player.x = simul.x++;
						return ;
					}
				}
			}
			return ;
		}
	}
	player.x += (dir * player.speed);
}

function animate(){
	if (player.state == 1)
	{
		player.img.move.f_nb = parseInt(LVL.frame / 10) % 3;
	}
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
			player.gravity = -player.jump_force;
			player.is_jump = true;
		}
	}
	// if (e.code == "ArrowDown" || e.code == "KeyS"){
	// 	// Down
	// }
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

function other_menu(){
	canva.drawImage(board.titleImg, 0, 0, 640, 480);
	// music.lobby.play();

	console.log("other");

	// loop
	if (param.ON && param.game_status == 1){
		requestAnimationFrame(other_menu);
	}
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
}

function detectCollision(a, b){
	return a.x < b.x + b.W &&
			a.x + a.W > b.x &&
			a.y < b.y + b.H &&
			a.y + a.H > b.y;
}