function link(id){
	const obj = document.getElementById(id);
	obj.style.animation = "link 2s linear infinity";
	if (id == "github")
		window.open("https://github.com/Nartyy", "_blank");
	else if (id == "youtube")
		window.open("https://www.youtube.com/@narty860", "_blank");
	else if (id == "insta")
		window.open("https://www.instagram.com/narty.yt/", "_blank");
}

// let screen_big = '<div class="H-elem"><span ></span></div><div class="H-elem"><span >42 Projects</span></div><div class="H-elem"><span>Projects</span></div><div class="H-elem"><span>About</span></div><div class="H-elem"><span>Contact</span></div><div class="H-elem"><span ></span></div>"';
// let screen_small = '<div class="H-elem"><span ></span></div><div class="H-burger" onClick="toggle_burger()"><div class="B-elem"></div><div class="B-elem"></div><div class="B-elem"></div></div><div class="H-elem"><span ></span></div>';
// let toggle_B = false;

// window.onload = () => {
// 	resize();
// }

// function resize() {
// 	let top = document.getElementById('links');
// 	if(document.documentElement.clientWidth <= 830)
// 	{
// 		top.innerHTML = screen_small;
// 		return;
// 	}
// 	else
// 	{
// 		if(toggle_B)
// 			toggle_burger();
// 		top.innerHTML = screen_big;
// 	}
// }

// window.onresize = () => {
// 	resize();
// }

function toggle_burger(){
	toggle_B = !toggle_B;
	alert(toggle_B);
}