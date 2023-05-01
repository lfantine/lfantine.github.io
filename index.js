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