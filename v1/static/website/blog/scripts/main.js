let currentSelectedArticle;

const initializeFragments = (articles, lang, categories, actionsContent) => {
	const fragmentsParent = document.getElementById('featured-fragments');
	currentSelectedArticle = 0;

	// Initialize Fragments
	for (let article of articles) {
		const articleCard = document.createElement('div');
		articleCard.classList.add('fragment');
		articleCard.setAttribute('id', `fragment-${articles.indexOf(article)}`);

		const mainSection = document.createElement('div');
		mainSection.classList.add('main-section');

		const articleCardCover = document.createElement('div');
		articleCardCover.classList.add('cover');
		articleCardCover.style.backgroundImage = `url(/assets/articles/covers/${article['id']})`;

		const labellingSection = document.createElement('div');
		labellingSection.classList.add('labelling');

		const dateLabel = document.createElement('p'), categoryLabel = document.createElement('p');
		categoryLabel.classList.add('category');
		let category = categories.filter(cat => cat['id'] == article['category'])[0];
		categoryLabel.innerText = category['name'][lang];
		labellingSection.appendChild(categoryLabel);

		dateLabel.classList.add('date');
		const date = Date(article['published_in']);
		dateLabel.innerText = `${date.split(' ')[1]} ${date.split(' ')[2]}, ${date.split(' ')[3]}`;
		
		const actions = document.createElement('div');
		actions.classList.add('actions')
		actions.innerHTML = `
		<button class='shadow-button' >${actionsContent[lang]['seeRelativeArticles']}</button>
		<button class='main-button'>${actionsContent[lang]['readArticle']}</button>
		`
		actions.querySelector('.main-button').onclick = () => {
			window.open(`/blog/articles/${article['id']}`, '_self');
		}
		actions.querySelector('.shadow-button').onclick = () => {
			window.open(`/blog/categories/${article['category']}`, '_self')
		}



		const title = document.createElement('div');
		title.classList.add('title');

		const h3 = document.createElement('h3');
		h3.innerHTML = article['title'][lang];

		const p = document.createElement('p');
		p.innerHTML = article['short_brief'][lang];
		
		title.appendChild(h3);
		title.appendChild(p);
		if (lang === "AR") {
			title.style.left = "none";
			title.style.right = "2.5vw";
		} else {
			title.style.right = "none";
			title.style.left = "2.5vw";
		}
		
		mainSection.appendChild(labellingSection);
		mainSection.appendChild(title);
		title.appendChild(dateLabel);
		mainSection.appendChild(actions);

		articleCard.appendChild(articleCardCover);
		articleCard.appendChild(mainSection);

		fragmentsParent.appendChild(articleCard);
	}

	// Initialize Controllers
	const leftController = document.getElementById('left-controller');
	leftController.onclick = () => {
		if (currentSelectedArticle === 0) return;
		selectFragmentByTab(currentSelectedArticle - 1, (articles.length - 1));
	}
	const rightController = document.getElementById('right-controller');
	rightController.onclick = () => {
		if (currentSelectedArticle === (articles.length - 1)) return;
		selectFragmentByTab(currentSelectedArticle + 1, (articles.length - 1));
	}
	const tabs = document.querySelector('#main-section .tabs');

	for (let i = 0; i !== articles.length; i++) {
		const tab = document.createElement('div');
		tab.classList.add('tab');
		tab.setAttribute('id', `fragment-tab-${i}`)
		if (i == 0) {
			tab.classList.add('active');
		}

		tab.onclick = () => {
			selectFragmentByTab(i, (articles.length - 1));
		}
		tabs.appendChild(tab);
	}
	selectFragmentByTab(currentSelectedArticle, (articles.length - 1));

	setInterval(() => {
		if (currentSelectedArticle === (articles.length - 1)) {
			selectFragmentByTab(0, (articles.length - 1));
			return;
		};
		selectFragmentByTab(currentSelectedArticle + 1, (articles.length - 1));
	}, 5000);

}


const selectFragmentByTab = (i, maxLen) => {
	const leftController = document.getElementById('left-controller');
	const rightController = document.getElementById('right-controller');
	if (i === 0) {
		leftController.style.transform = 'scale(0)';
	} else {
		leftController.style.transform = 'scale(1)';
	}
	if (i === maxLen) {
		rightController.style.transform = 'scale(0)';
	} else {
		rightController.style.transform = 'scale(1)';
	}
	document.getElementById(`fragment-tab-${currentSelectedArticle}`).classList.remove('active');
	document.getElementById(`fragment-${currentSelectedArticle}`).classList.remove('active');
	document.getElementById(`fragment-${i}`).classList.add('active');
	document.getElementById(`fragment-tab-${i}`).classList.add('active');
	currentSelectedArticle = i;
	showArticleByIndex(i);
}

const showArticleByIndex = (i) => { }

let currentSelectedCategoryFragment = -1;
const initializeCategoriesFragments = (categories) => {
	categories = categories.map(cat => cat.id);
	let categoriesTabs = categories.map(catId => document.querySelector(`#tab-${catId}`))
	const allTab = document.querySelector('.articles-category-tab#tab-all');
	allTab.onclick = () => {
		if (currentSelectedCategoryFragment == -1) return;

		const activeFragment = document.querySelector(`#fragment-${categories[currentSelectedCategoryFragment]}`);
		activeFragment.classList.remove('active');

		const allFragment = document.querySelector(`#fragment-all-fragment`);
		allFragment.classList.add('active');

		const activeTab = document.querySelector('.articles-category-tab.active');
		activeTab.classList.remove('active');

		allTab.classList.add('active');

		currentSelectedCategoryFragment = -1
	}

	for (let i in categoriesTabs) {
		categoriesTabs[i].onclick = () => {
			if (currentSelectedCategoryFragment === i) return;

			const activeFragment = document.querySelector(`#fragment-${currentSelectedCategoryFragment == -1 ? 'all-fragment' : categories[currentSelectedCategoryFragment]}`);
			activeFragment.classList.remove('active');

			const currentFragment = document.querySelector(`#fragment-${categories[i]}`);
			currentFragment.classList.add('active');

			const activeTab = document.querySelector('.articles-category-tab.active');
			activeTab.classList.remove('active');

			categoriesTabs[i].classList.add('active');
			currentSelectedCategoryFragment = i;

		}
	}
}
