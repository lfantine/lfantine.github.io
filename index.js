function link(id){
	const obj = document.getElementById(id);
	obj.style.animation = "link 2s linear infinity";
	if (id == "github")
		window.open("https://github.com/Nartyy", "_blank");
	
}