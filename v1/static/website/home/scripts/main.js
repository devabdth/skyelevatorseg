const homeInit= ()=> {
	configTestmonialsFragments();
}

const configTestmonialsFragments= ()=> {
	let currentFragmentIndex= 0;
	const backFragment= document.querySelector("section#testmonials button.shadow-button.backward");
	const nextFragment= document.querySelector("section#testmonials button.shadow-button.foreward");
	const fragments= Array.from(document.querySelectorAll(".testmonials-fragment"));
	backFragment.classList.remove('active');
	fragments[0].classList.add('active');

	backFragment.onclick= ()=> {
		fragments[currentFragmentIndex].classList.remove('active');
		currentFragmentIndex-= 1;
		fragments[currentFragmentIndex].classList.add('active');
		if (currentFragmentIndex === 0) backFragment.classList.remove('active');
		else if (currentFragmentIndex !== 0) backFragment.classList.add('active');
		if (currentFragmentIndex === (fragments.length-1)) nextFragment.classList.remove('active');
		else if (currentFragmentIndex !== (fragments.length-1)) nextFragment.classList.add('active');
	}

	nextFragment.onclick= ()=> {
		fragments[currentFragmentIndex].classList.remove('active');
		currentFragmentIndex+= 1;
		fragments[currentFragmentIndex].classList.add('active');
		if (currentFragmentIndex === (fragments.length-1)) nextFragment.classList.remove('active');
		else if (currentFragmentIndex !== (fragments.length-1)) nextFragment.classList.add('active');
		if (currentFragmentIndex === 0) backFragment.classList.remove('active');
		else if (currentFragmentIndex !== 0) backFragment.classList.add('active');
	}
}

if (window.addEventListener) window.addEventListener('load', homeInit);
else if (window.attachEvent) window.attachEvent('onload', homeInit);
