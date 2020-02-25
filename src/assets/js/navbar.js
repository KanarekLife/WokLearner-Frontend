function showNav() {
	let items = document.getElementById('main-nav');
	if(items.className === 'main-nav') {
		items.className += ' responsive';
	} else {
		items.className = "main-nav";
	}
}

function hideNav() {
	let items = document.getElementById('main-nav');
	items.className = 'main-nav';
}