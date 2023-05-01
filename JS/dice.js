// sleep time expects milliseconds
function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}


// VAR 

let launchable = true;
let	face;
let nb_games = 0;

// format <span class="games">1 : you made 5 !</span>

function back(){
	const bk = document.getElementById('bbut');
	bbut.classList.add("bye");
	sleep(1500).then(() => {
		window.open("../index.html", "_self");
	});
}

function start(){
	const dice = document.getElementById("dice");
	dice.classList.add("role");
	face = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function make_face(){
	const one = document.getElementById('one');
	const two = document.getElementById('two');
	const three = document.getElementById('three');
	const four = document.getElementById('four');
	const five = document.getElementById('five');
	const six = document.getElementById('six');
	const seven = document.getElementById('seven');
	const eigth = document.getElementById('eigth');
	const nine = document.getElementById('nine');

	// RESET
	one.classList.remove("visible");
	two.classList.remove("visible");
	three.classList.remove("visible");
	four.classList.remove("visible");
	five.classList.remove("visible");
	six.classList.remove("visible");
	seven.classList.remove("visible");
	eigth.classList.remove("visible");
	nine.classList.remove("visible");

	if (face == 1){
		five.classList.add("visible");
	}
	else if (face == 2){
		four.classList.add("visible");
		six.classList.add("visible");
	}
	else if (face == 3){
		four.classList.add("visible");
		five.classList.add("visible");
		six.classList.add("visible");
	}
	else if (face == 4){
		one.classList.add("visible");
		three.classList.add("visible");
		seven.classList.add("visible");
		nine.classList.add("visible");
	}
	else if (face == 5){
		one.classList.add("visible");
		three.classList.add("visible");
		five.classList.add("visible");
		seven.classList.add("visible");
		nine.classList.add("visible");
	}
	else if (face == 6){
		one.classList.add("visible");
		two.classList.add("visible");
		three.classList.add("visible");
		seven.classList.add("visible");
		eigth.classList.add("visible");
		nine.classList.add("visible");
	}
}

function launch(){
	if (!launchable)
		return;
	nb_games++;
	launchable = false;
	const start_but = document.getElementById('play-txt');
	start_but.classList.remove("clicked");
	start_but.classList.add("clicked");
	start_but.classList.add("blocked");
	start();
	sleep(1800).then(() => {
		make_face();
		document.getElementById('res').innerHTML = face;
		let new_g = document.createElement("span");
		new_g.classList.add('games');
		new_g.innerHTML = nb_games + ": You made " + face + " !";
		document.getElementById('hist').appendChild(new_g);
		start_but.classList.remove("clicked");
		sleep(300).then(() => {
			start_but.classList.remove("blocked");
			const dice = document.getElementById("dice");
			dice.classList.remove("role");
			launchable = true;
		});
	});
}
