let base = 0;
const screen = document.getElementById('screen');

window.onload = () => {
	
}

function calc(id) {
	if (id == 'C')
	{
		clear();
		return ;
	}
	if (id == '=')
	{
		screen.innerHTML = eval(screen.innerHTML);
		return;
	}
	if (screen.innerHTML == "0")
		screen.innerHTML= "";
	screen.innerHTML += id;

}

function clear(){
	screen.innerHTML = "0";
	base = 0;
	actual = 0;
}