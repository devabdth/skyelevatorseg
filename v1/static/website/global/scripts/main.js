
let currentMode;

const themeSwitchOnClick= ()=> {
	const themeSwitch= document.querySelector('input#theme');
	themeSwitch.addEventListener('change', ()=> {
		toggleTheme();
	});
}

const headerOnScrollListener= () => {
	window.onscroll = function() {scrollListener()};

	var header = document.querySelector("header");

	var sticky = header.offsetTop;

	function scrollListener() {
	  if (window.pageYOffset > sticky) {
	    header.classList.add("sticky");
	  } else {
	    header.classList.remove("sticky");
	  }
}
}

const globalInit= ()=> {
	const header= document.querySelector('header');
	if (header !== undefined) {
		themeSwitchOnClick();
		headerOnScrollListener();
	}
}

if (window.addEventListener) window.addEventListener('load', globalInit);
else if (window.attachEvent) window.attachEvent('onload', globalInit);

const toggleTheme = async () => {
	switch (currentMode ?? 'DARK') {
		case 'DARk':
		default:
        	currentMode= 'LIGHT';
        	document.firstElementChild.setAttribute('data-theme', 'light');
			await fetch('/config/?MODE=LIGHT', { method: 'PATCH' });
			break;
		case 'LIGHT':
        	currentMode= 'DARK';
        	document.firstElementChild.setAttribute('data-theme', 'dark');
			await fetch('/config/?MODE=DARK', { method: 'PATCH' });
			break;
	}

}

const toggleLang = async (lang) => {
	switch (lang) {
		case 'EN':
		default:
			await fetch('/config/?LANG=AR', { method: 'PATCH' });
			break;
		case 'AR':
			await fetch('/config/?LANG=EN', { method: 'PATCH' });
			break;
	}
	window.open('./', '_self');
}


const initializeAdSpace = async (container, ad, lang, customCallback) => {
	if (ad === undefined || ad === null) {
		container.style.display= 'none';
		return;
	}
	console.log(container)
	container.onclick = () => {
		if (customCallback === undefined) window.open(ad['redirect']);
		else customCallback();
	}

	if (ad['background_mode'] == 'BG') {
		container.style.backgroundImage = `url(/assets/ads/covers/${ad['id']}/)`;
	}
	else if (ad['background_mode'] == 'COLOR') {
		container.style.backgroundColor = ad['background'];

	}

	if (ad['title'] !== "None" || ad['subtitle'] !== "None" || ad['bio'] !== "None") {
		const snippet = document.createElement('p');
		snippet.classList.add('snippet');
		snippet.innerHTML = lang == 'EN' ? '> AD' : '> إعلان';

		const overlay = document.createElement('div');
		overlay.setAttribute('id', 'overlay');
		overlay.style.background = 'linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.15) 100%)';
		overlay.appendChild(snippet);

		if (ad['subtitle'] != "None") {
			const subtitle = document.createElement('p');
			subtitle.classList.add('subtitle');
			subtitle.innerHTML = ad['subtitle'][lang];
			overlay.appendChild(subtitle);
		}

		if (ad['title'] != "None") {
			const title = document.createElement('p');
			title.classList.add('title');
			title.innerHTML = ad['title'][lang];
			overlay.appendChild(title);
			overlay.appendChild(title);
		}

		if (ad['bio'] != "None") {
			const bio = document.createElement('p');
			bio.classList.add('bio');
			bio.innerHTML = ad['bio'][lang];
			overlay.appendChild(bio);
			overlay.appendChild(bio);
		}


		container.appendChild(overlay);
	}
}


const adminLogout = async () => {
	const res = await fetch('/webapp/adminstration/logout/');
	if (res.status == 200) window.open('./', '_self');
}

const logout = async (element) => {
	const res = await fetch('/logout/', { method: 'PATCH' });
	element.innerHTML= 'Loading...'
	if (res.status == 200) window.open('./', '_self');
}
