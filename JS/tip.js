window.onload = () => {
	document.querySelector('#but').onclick = calculate;
}

function calculate(){
	bill = document.querySelector('#bil').value;
	tip = document.querySelector('#tips').value;
	if (bill == "" || tip == "")
	{
		document.querySelector('#ress').innerHTML = "Error";
		return;
	}
	else if (bill < 0)
	{
		document.querySelector('#ress').innerHTML = "Error: negative Bill";
		return;
	}
	else if (tip < 0)
	{
		document.querySelector('#ress').innerHTML = "Error: negative Tip";
		return;
	}
	let res;
	tip /= 100;
	tip *= parseInt(bill);
	res = parseFloat(bill) + parseFloat(tip);
	document.querySelector('#ress').innerHTML = res;
}