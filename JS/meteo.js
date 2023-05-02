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

// Meteo

let ville = "Nice";
let url = `http://api.weatherapi.com/v1/current.json?key=50cf9239a41d43b7a8f222429230105&q=${ville}&aqi=no`;

window.onload = () => {
	Affichage();
}

function search() {
	let city = document.getElementById('srch-but').value;
	if (city.length <= 1)
		return ;
	url = `http://api.weatherapi.com/v1/current.json?key=50cf9239a41d43b7a8f222429230105&q=${city}&aqi=no`;
	Affichage();
}

const data = {"location":{"name":"Nice","region":"Provence-Alpes-Cote d'Azur","country":"France","lat":43.7,"lon":7.25,"tz_id":"Europe/Paris","localtime_epoch":1683031561,"localtime":"2023-05-02 14:04"},"current":{"last_updated_epoch":1683030600,"last_updated":"2023-05-02 14:30","temp_c":19.0,"temp_f":66.2,"is_day":1,"condition":{"text":"Partly cloudy","icon":"//cdn.weatherapi.com/weather/64x64/day/116.png","code":1003},"wind_mph":11.9,"wind_kph":19.1,"wind_degree":200,"wind_dir":"SSW","pressure_mb":1013.0,"pressure_in":29.91,"precip_mm":0.0,"precip_in":0.0,"humidity":73,"cloud":25,"feelslike_c":19.0,"feelslike_f":66.2,"vis_km":10.0,"vis_miles":6.0,"uv":5.0,"gust_mph":11.2,"gust_kph":18.0}};

function make_month(m){
	switch(m){
		case 1:
			return "janvier";
			break;
		case 2:
			return "fevrier";
			break;
		case 3:
			return "mars";
			break;
		case 4:
			return "avril";
			break;
		case 5:
			return "mai";
			break;
		case 6:
			return "juin";
			break;
		case 7:
			return "juillet";
			break;
		case 8:
			return "aout";
			break;
		case 9:
			return "septembre";
			break;
		case 10:
			return "octobre";
			break;
		case 11:
			return "novembre";
			break;
		case 12:
			return "decembre";
			break;
	}
}

function make_dTime(value){
	if (value < 10)
		return ("0" + value);
	else
		return value;
}

function Affichage(){
// fetch(url)
// .then(reponse => reponse.json())
// .then(data => {
// 	console.table(data);
	document.getElementById('VILLE').textContent = data.location.name;
	document.getElementById('REGION').textContent = data.location.region;
	document.getElementById('PAYS').textContent = data.location.country;
	document.getElementById('HEURE').textContent = data.location.tz_id;
	let date_heure = data.location.localtime;
	document.getElementById('YEAR').textContent = parseInt(date_heure.substring(0, 4));
	document.getElementById('MONTH').textContent = make_month(parseInt(date_heure.substring(5, 7)));
	document.getElementById('DAY').textContent = parseInt(date_heure.substring(8, 10));
	document.getElementById('T-HOUR').textContent = make_dTime(parseInt(date_heure.substring(11, 13)));
	document.getElementById('T-MIN').textContent = make_dTime(parseInt(date_heure.substring(14, 16)));
// });
}
