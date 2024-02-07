let startTime;
const generateAdSpace = async (props) => {
	props.space.onclick = () => {
		window.open(props.adData['redirect']);
	}

	if (props.adData['background_mode'] == 'BG') {
		props.space.style.backgroundImage = `url("https://forexology.net/assets/ads/covers/${props.adData.id}/")`;
	}
	else if (props.adData['background_mode'] == 'COLOR') {
		props.space.style.backgroundColor = props.adData['background'];

	}

	if (props.adData['title'] !== "None" && props.adData['subtitle'] !== "None" && props.adData['bio'] !== "None") {
		const snippet = document.createElement('p');
		snippet.classList.add('snippet');
		snippet.innerHTML = props.lang == 'EN' ? '> AD' : '> إعلان';

		const overlay = document.createElement('div');
		overlay.setAttribute('id', 'overlay');
		overlay.style.background = 'linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.15) 100%)';

		const subtitle = document.createElement('p');
		subtitle.classList.add('subtitle');
		subtitle.innerHTML = props.adData['subtitle'][props.lang];

		const title = document.createElement('h5');
		title.classList.add('title');
		title.innerHTML = props.adData['title'][props.lang];

		const bio = document.createElement('p');
		bio.classList.add('bio');
		bio.innerHTML = props.adData['bio'][props.lang];
		overlay.appendChild(snippet);
		overlay.appendChild(subtitle);
		overlay.appendChild(title);
		overlay.appendChild(bio);

		props.space.appendChild(overlay);
	}
}


const generateImageAttachment = (attachmentSection, sectionId) => { }
const generateVideoAttachment = (attachmentSection, sectionId) => { }
const generateAudioAttachment = (attachmentSection, sectionId) => { }

let sectionsIds;
let currentActiveSection;
const initializeSections = (sections, lang) => {
	const nextAction = document.getElementById('next');
	const previousAction = document.getElementById('previous');
	const tabsTitle = document.querySelector('#current-tab-title');
	const tabsSubTitle = document.querySelector('#current-tab-subtitle')
	const tabsindicator = document.querySelector('#tabs-indicator')

	sectionsIds = sections.map(section => section.id.substring(0, 6))
	currentActiveSection = 0;
	tabsTitle.innerHTML = sections[currentActiveSection].title[lang];
	tabsSubTitle.innerHTML = sections[currentActiveSection].subtitle[lang];
	tabsindicator.innerHTML = `${currentActiveSection + 1} / ${sections.length}`;
	document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');
	startTime = new Date();

	nextAction.innerHTML = (currentActiveSection + 1) >= sections.length ? "" : `${lang == 'EN' ? 'Next: ' : 'التالي: '} ${sections[(currentActiveSection + 1)].title[lang]}`
	nextAction.onclick = () => {
		const currentArticle = sectionsIds[currentActiveSection];
		document.querySelector(`.article-section#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
		document.querySelector(`.article-section-tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
		document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');

		previousAction.innerHTML =  (currentActiveSection - 1) <= 0 ? "" : `${lang == 'EN' ? 'Previous: ' : 'السابق: '} ${sections[(currentActiveSection - 1)].title[lang]}`
		previousAction.style.pointerEvents = 'all';
		previousAction.style.userSelect = 'all';
		previousAction.style.color = 'var(--primaryColor)';

		currentActiveSection += 1;
		document.querySelector(`.article-section#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');
		document.querySelector(`.article-section-tab#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');
		document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');

		tabsTitle.innerHTML = sections[currentActiveSection].title[lang];
		tabsSubTitle.innerHTML = sections[currentActiveSection].subtitle[lang];
		tabsindicator.innerHTML = `${currentActiveSection + 1} / ${sections.length}`


		if (currentActiveSection === (sectionsIds.length - 1)) {
			nextAction.style.color = 'transparent';
			nextAction.style.pointerEvents = 'none';
			nextAction.style.userSelect = 'none';
			return;
		}
		nextAction.innerHTML = (currentActiveSection + 1) >= sections.length ? "" : `${lang == 'EN' ? 'Next: ' : 'التالي: '} ${sections[(currentActiveSection + 1)].title[lang]}`
		onArticleChanged(currentArticle);

	}

	previousAction.style.color = 'transparent';
	previousAction.style.pointerEvents = 'none';
	previousAction.style.userSelect = 'none';
	previousAction.innerHTML =  (currentActiveSection - 1) <= 0 ? "" : `${lang == 'EN' ? 'Previous: ' : 'السابق: '} ${sections[(currentActiveSection - 1)].title[lang]}`
	previousAction.onclick = () => {
		const currentArticle = sectionsIds[currentActiveSection];
		document.querySelector(`.article-section#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
		document.querySelector(`.article-section-tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
		document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
		nextAction.innerHTML = (currentActiveSection + 1) >= sections.length ? "" : `${lang == 'EN' ? 'Next: ' : 'التالي: '} ${sections[(currentActiveSection + 1)].title[lang]}`
		nextAction.style.pointerEvents = 'all';
		nextAction.style.userSelect = 'all';
		nextAction.style.color = 'var(--primaryVarientColor';

		currentActiveSection -= 1;
		document.querySelector(`.article-section#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');
		document.querySelector(`.article-section-tab#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');
		document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.add('active');

		tabsTitle.innerHTML = sections[currentActiveSection].title[lang];
		tabsSubTitle.innerHTML = sections[currentActiveSection].subtitle[lang];
		tabsindicator.innerHTML = `${currentActiveSection + 1} / ${sections.length}`

		if (currentActiveSection === 0) {
			previousAction.style.color = 'transparent';
			previousAction.style.pointerEvents = 'none';
			previousAction.style.userSelect = 'none';
			return;
		}
		previousAction.innerHTML =  (currentActiveSection - 1) <= 0 ? "" : `${lang == 'EN' ? 'Previous: ' : 'السابق: '} ${sections[(currentActiveSection - 1)].title[lang]}`
		onArticleChanged(currentArticle);

	}

	const indicators = document.querySelectorAll('.article-section-tab');
	indicators.forEach((indicator) => {
		indicator.onclick = () => {
			const currentArticle = sectionsIds[currentActiveSection];
			if (indicator.classList.contains('active')) return;
			document.querySelector(`.article-section-tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
			document.querySelector(`.article-section#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
			document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');

			currentActiveSection = sectionsIds.indexOf(indicator.id);
			document.querySelector(`.article-section#${indicator.id}`).classList.add('active');
			document.querySelector(`#tabs-selector .tab#${indicator.id}`).classList.add('active');
			indicator.classList.add('active');

			tabsTitle.innerHTML = sections[currentActiveSection].title[lang];
			tabsSubTitle.innerHTML = sections[currentActiveSection].subtitle[lang];
			tabsindicator.innerHTML = `${currentActiveSection + 1} / ${sections.length}`

			if (sectionsIds.indexOf(indicator.id) == (sectionsIds.length - 1)) {
				nextAction.style.color = 'transparent';
				nextAction.style.pointerEvents = 'none';
				nextAction.style.userSelect = 'none';
			} else {
				nextAction.innerHTML = (sectionsIds.indexOf(indicator.id) + 1) >= sections.length ? "" : `${lang == 'EN' ? 'Next: ' : 'التالي: '} ${sections[(sectionsIds.indexOf(indicator.id) + 1)].title[lang]}`
				nextAction.style.pointerEvents = 'all';
				nextAction.style.userSelect = 'all';
				nextAction.style.color = 'var(--primaryColor)';

			}

			if (sectionsIds.indexOf(indicator.id) == 0) {
				previousAction.style.color = 'transparent';
				previousAction.style.pointerEvents = 'none';
				previousAction.style.userSelect = 'none';
			} else {
				previousAction.innerHTML =  `${lang == 'EN' ? 'Previous: ' : 'السابق: '} ${sections[(sectionsIds.indexOf(indicator.id) - 1)].title[lang]}`
				previousAction.style.pointerEvents = 'all';
				previousAction.style.userSelect = 'all';
				previousAction.style.color = 'var(--primaryColor)';
			}
			onArticleChanged(currentArticle);
		}
	});

	const tabs = document.querySelectorAll('#tabs-selector .tab');
	tabs.forEach((tab) => {
		tab.onclick = () => {
			let currentArticle = sectionsIds[currentActiveSection];
			if (tab.classList.contains('active')) return;
			document.querySelector(`.article-section-tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
			document.querySelector(`#tabs-selector .tab#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
			document.querySelector(`.article-section#sec-${sectionsIds[currentActiveSection]}`).classList.remove('active');
			currentActiveSection = sectionsIds.indexOf(tab.id.split('sec-')[1]);
			document.querySelector(`.article-section#${tab.id}`).classList.add('active');
			document.querySelector(`.article-section-tab#${tab.id}`).classList.add('active');
			tab.classList.add('active');
			tabsTitle.innerHTML = sections[currentActiveSection].title[lang];
			tabsSubTitle.innerHTML = sections[currentActiveSection].subtitle[lang];
			tabsindicator.innerHTML = `${currentActiveSection + 1} / ${sections.length}`

			if (sectionsIds.indexOf(tab.id) == (sectionsIds.length - 1)) {
				nextAction.style.color = 'transparent';
				nextAction.style.pointerEvents = 'none';
				nextAction.style.userSelect = 'none';
			} else {
				nextAction.innerHTML = (sectionsIds.indexOf(tab.id) + 1) >= sections.length ? "" : `${lang == 'EN' ? 'Next: ' : 'التالي: '} ${sections[(sectionsIds.indexOf(tab.id) + 1)].title[lang]}`
				nextAction.style.pointerEvents = 'all';
				nextAction.style.userSelect = 'all';
				nextAction.style.color = 'var(--primaryColor)';

			}

			if (sectionsIds.indexOf(tab.id) == 0) {
				previousAction.style.color = 'transparent';
				previousAction.style.pointerEvents = 'none';
				previousAction.style.userSelect = 'none';
			} else {
				previousAction.innerHTML =  `${lang == 'EN' ? 'Previous: ' : 'السابق: '} ${sections[(sectionsIds.indexOf(tab.id) - 1)].title[lang]}`
				previousAction.style.pointerEvents = 'all';
				previousAction.style.userSelect = 'all';
				previousAction.style.color = 'var(--primaryColor)';
			}
			onArticleChanged(currentArticle);
		}
	});

	document.querySelector(`.article-section#sec-${sectionsIds[0]}`).classList.add('active');
	document.querySelector(`.article-section-tab#sec-${sectionsIds[0]}`).classList.add('active');
}


const onArticleChanged = async (sectionId) => {
	const now = new Date();
	const duration = Math.abs(now - startTime);
	startTime = new Date();
	await fetch(`./readTime/`, {
		method: 'PATCH',
		body: JSON.stringify({
			articleId: sectionId.split('_ARTICLE_SECTION_')[0],
			sectionId: sectionId,
			duration: duration,
		})
	}
	);
}

document.addEventListener('visibilitychange', () => {
	if (document.visibilityState == 'hidden') {
		onArticleChanged(document.querySelector('.article-section.active').id);
	}
})

const closeArticleDialogs = () => {
	document.querySelector('.article-dialogs.active').classList.remove('active');
	document.querySelector('#dialogs-overlay').style.display = 'none';
	const audio = document.querySelector('.article-dialogs#listen-dialog #player');
	if (audio !== undefined) {
		if (!audio.paused) audio.pause();
	}

}

const openArticleDialogs = (dialog) => {
	document.querySelector(`.article-dialogs#${dialog}-dialog`).classList.add('active');
	document.querySelector('#dialogs-overlay').style.display = 'flex';
	if (dialog == 'listen') {
		listen();
	}
}

const listen = (sections) => {
	const audio = document.querySelector('.article-dialogs#listen-dialog #player');
	const audioPlayerStop = document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#restart');
	const audioPlayerSeekBack = document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#back');
	const audioPlayerPause = document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#pause');
	const audioPlayerPlay = document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#start');
	const audioPlayerSeekNext = document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#forward');
	const audioPlayerLoop = document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#repeat');
	const audioTime = document.querySelector('.article-dialogs#listen-dialog #progress');
	const audioCurrentTime = document.querySelector('.article-dialogs#listen-dialog #current-time');
	const audioFullTime = document.querySelector('.article-dialogs#listen-dialog #full-time');
	const audioControllers = document.querySelector('.article-dialogs#listen-dialog #options');

	const sectionsTabs = document.querySelectorAll('.article-dialogs#listen-dialog .listen-tab');
	sectionsTabs.forEach((tab) => {
		tab.onclick = () => {
			if (tab.id == Math.floor(audio.duration)) return;
			audio.currentTime = Math.floor(parseFloat(tab.id) * 60);
			audio.play();
		}

	})
	audio.onload = () => { }

	audio.onended = () => {
		audioPlayerPlay.style.display = "block";
		audioPlayerStop.style.display = "none";
		audio.pause();

	}
	audio.load();
	audio.play();
	audioControllers.style.display = 'flex';
	togglePlay(audio);

	audioPlayerPause.onclick = () => { togglePlay(audio); }
	audioPlayerPlay.onclick = () => { togglePlay(audio); }
	audioPlayerSeekBack.onclick = () => { backwards(audio, audioCurrentTime, audioTime); }
	audioPlayerSeekNext.onclick = () => { afterwards(audio, audioCurrentTime, audioTime); }
	audioPlayerLoop.onclick = () => { audioLoop(audio, audioPlayerLoop); }
	audioPlayerStop.onclick = () => { audioStop(audio, audioTime, audioCurrentTime); }


	setInterval(() => {
		if (!audio.paused) {
			var fullMinutes = Math.floor(audio.duration / 60);
			var fullSecs = (audio.duration - Math.floor(audio.duration / 60) * 60).toString().split('.')[0];

			if (fullMinutes < 10) {
				fullMinutes = `0${fullMinutes}`
			}
			if (fullSecs < 10) {
				fullSecs = `0${fullSecs}`
			}

			var minutes = Math.floor(audio.currentTime / 60);
			var secs = (audio.currentTime - Math.floor(audio.currentTime / 60) * 60).toString().split('.')[0];

			if (minutes < 10) {
				minutes = `0${minutes}`
			}
			if (secs < 10) {
				secs = `0${secs}`
			}
			audioCurrentTime.innerHTML = `${minutes}:${secs}`;
			audioCurrentTime.innerText = `${minutes}:${secs}`;
			audioFullTime.innerHTML = `${fullMinutes}:${fullSecs}`
			audioFullTime.innerText = `${fullMinutes}:${fullSecs}`
		}
	}, 1000);

	setInterval(() => {
		if (!audio.paused) {
			const progress = (audio.currentTime / audio.duration) * 100;
			audioTime.style.width = `${progress}%`;
		}
	}, 1);

}


const togglePlay = (audio) => {
	if (!audio.paused) {
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#start').style.display = "block";
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#pause').style.display = "none";
		audio.pause();
	} else {
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#start').style.display = "none";
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#pause').style.display = "block";
		audio.play();
	}
}

const backwards = (audio, audioCurrentTime, audioTime) => {
	if (audio.currentTime > 10) {
		audio.currentTime = audio.currentTime - 10;
	} else {
		audio.currentTime = 0;
	}
	if (audio.currentTime == 0) {
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#start').style.display = "block";
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#pause').style.display = "none";
		audio.pause();
	}
	var minutes = Math.floor(audio.currentTime / 60);
	var secs = (audio.currentTime - Math.floor(audio.currentTime / 60) * 60).toString().split('.')[0];

	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (secs < 10) {
		secs = `0${secs}`
	}
	audioCurrentTime.innerHTML = `${minutes}:${secs}`;
	audioCurrentTime.innerText = `${minutes}:${secs}`;
	const progress = (audio.currentTime / audio.duration) * 100;
	audioTime.style.width = `${progress}%`;
}

const afterwards = (audio, audioCurrentTime, audioTime) => {
	if (audio.duration - audio.currentTime > 10) {
		audio.currentTime = audio.currentTime + 10;
	} else {
		audio.currentTime = audio.duration;
	}
	if (audio.currentTime == audio.duration) {
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#start').style.display = "block";
		document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#pause').style.display = "none";
		audio.pause();
	}
	var minutes = Math.floor(audio.currentTime / 60);
	var secs = (audio.currentTime - Math.floor(audio.currentTime / 60) * 60).toString().split('.')[0];

	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (secs < 10) {
		secs = `0${secs}`
	}
	audioCurrentTime.innerHTML = `${minutes}:${secs}`;
	audioCurrentTime.innerText = `${minutes}:${secs}`;
	const progress = (audio.currentTime / audio.duration) * 100;
	audioTime.style.width = `${progress}%`;

}

const audioLoop = (audio, audioPlayerLoop) => {
	if (audio.loop) {
		audio.loop = false;
		audioPlayerLoop.style.opacity = "0.5";
		return;
	} else {
		audio.loop = true;
		audioPlayerLoop.style.opacity = "1";
	}
}

const audioStop = (audio, audioTime, audioCurrentTime) => {
	document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#start').style.display = "block";
	document.querySelector('.article-dialogs#listen-dialog .shadow-icon-button#pause').style.display = "none";

	audio.pause();
	audio.currentTime = 0;

	audioTime.style.width = '0%';

	audioCurrentTime.innerText = "00:00";
	audioCurrentTime.innerHTML = "00:00";
}

const publishNewComment = async (userId, userName) => {
	const field = document.querySelector('section#commenting #header input#comment-field');
	const btn = document.querySelector('section#commenting #header button.main-button');
	console.log('Clicked');
	if (field.value.trim().length < 8) {
		field.style.border = '2px red solod';
		btn.innerHTML = lang === 'EN' ? 'Comment too short!' : 'أجعل تعليقك  مفصلًا';
		btn.onclick = () => { }
		setTimeout(() => {
			btn.innerHTML = lang === 'EN' ? 'Add' : 'أضف';
			btn.onclick = () => { publishNewComment(userId, userName); }
		}, 3000);
		return;
	}
	console.log('Clicked');

	btn.innerHTML = 'Loading...';
	btn.onclick = () => { }
	const res = await fetch('./comments/', {
		body: JSON.stringify({ userId: userId, comment: field.value.trim() }),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	console.log('Clicked');

	if (res.status === 201) {
		const newCommentRow = document.createElement('div');
		newCommentRow.classList.add('comment-row');
		newCommentRow.innerHTML = `
            <div class="user-image" style="background-image: url(/assets/users/${userId});"></div>
            <div class="comment">
              <p class="comment">${field.value.trim()}</p>
              <p class="user-name">${userName}</p>
              <p class="date">${new Date()}</p>
            </div>		
		`;
		document.querySelector('section#commenting #comments').insertBefore(
			newCommentRow, document.querySelector('section#commenting #comments').firstChild
		)
		field.value = '';
		btn.innerHTML = lang === 'EN' ? 'Add' : 'أضف';
		btn.onclick = () => { publishNewComment(userId, userName); }
		return;

	}

	btn.innerHTML = lang === 'EN' ? 'Failed!' : 'فشلت العملية';
	setTimeout(() => {
		btn.innerHTML = lang === 'EN' ? 'Add' : 'أضف';
		btn.onclick = () => { publishNewComment(userId, userName); }
	}, 3000);

}