let categories, categoryIcon, tags;

const pageInit= (props)=> {
	categories= props.categories;
}

const openDeleteCategoryDialog= (categoryId)=> {
	const form= document.querySelector('div.confirmation-dialog#delete-category');
	form.style.display= 'flex';

	const overlay= document.querySelector('div.confirmation-dialog-overlay#delete-category');;
	overlay.style.display= 'flex';

	const submitBtn= form.querySelector('button.main-button').onclick= ()=> { deleteCategorySubmission(categoryId); }
}

const closeDeleteCategory = ()=> {
	const form= document.querySelector('div.confirmation-dialog#delete-category');
	form.style.display= 'none';

	const overlay= document.querySelector('div.confirmation-dialog-overlay#delete-category');;
	overlay.style.display= 'none';

	 form.querySelector('input').value= '';
	form.querySelector('button.main-button').onclick= ()=> {  }
}

const deleteCategorySubmission= async (categoryId) => {
	const form= document.querySelector('div.confirmation-dialog#delete-category');
	const passwordField= form.querySelector('input#admin-password');
	const submitBtn= form.querySelector('button.main-button');
	const cancelBtn= form.querySelector('button.shadow-button');
	const statusMsg= form.querySelector('p.status-msg');

	if (passwordField.value.trim().length < 8) {
		passwordField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Please, Enter a Valid Password!';
		return;
	}
	passwordField.style.border= '';
	statusMsg.innerHTML= '';

	submitBtn.style.pointerEvents= 'none';
	submitBtn.style.opacity= '0.6';
	cancelBtn.style.pointerEvents= 'none';
	cancelBtn.style.opacity= '0.6';

	try {
		const res= await fetch(`./`, {
			method: 'DELETE',
			body: JSON.stringify({ password: passwordField.value.trim(), categoryId: categoryId }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status === 200) {
			statusMsg.innerHTML= 'Fetching Data...';
			submitBtn.innerHTML= 'Success';
			setTimeout(()=> {
				window.open('./', '_self');
			}, 2000);
			return;
		}

		if (res.status === 403) {
			statusMsg.innerHTML= 'Wrong Password';
			passwordField.style.border= '2px red solid';
			passwordField.value= '';
			submitBtn.innerHTML= 'Submit';
			submitBtn.style.pointerEvents= 'all';
			submitBtn.style.opacity= '1';
			cancelBtn.style.pointerEvents= 'all';
			cancelBtn.style.opacity= '1';
			return;
		}


		console.log(res.status)
		statusMsg.innerHTML= 'Try again Later!';
		submitBtn.innerHTML= 'Failed';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			submitBtn.innerHTML= 'Submit';
			submitBtn.style.pointerEvents= 'all';
			submitBtn.style.opacity= '1';
			cancelBtn.style.pointerEvents= 'all';
			cancelBtn.style.opacity= '1';
		}, 5000);

	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again Later!';
		submitBtn.innerHTML= 'Failed!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			submitBtn.innerHTML= 'Submit';
			submitBtn.style.pointerEvents= 'all';
			submitBtn.style.opacity= '1';
			cancelBtn.style.pointerEvents= 'all';
			cancelBtn.style.opacity= '1';
		}, 5000);
	}

}

const openCategoryFormDialog= (mode, props) => {
	const form= document.querySelector('.form-dialog#category-form');
	const overlay= document.querySelector('.form-dialog-overlay#category-form');

    tags = [];
    const tagsField = document.querySelector('.tags .header input');
    const tagsSubmit = document.querySelector('.tags .header #tags-submit');
    const tagsContainer = document.querySelector('.tags .body');
    tagsSubmit.onclick = () => {
    	const statusMsg= form.querySelector('.options p.status-msg')

        if (tagsField.value.trim().length === 0) {
            tagsField.style.border = '1px red solid';
            return;
        }

        if ((tags ?? []).includes(tagsField.value.trim())) {
            tagsField.style.border = '1px red solid';
            statusMsg,innerHTML= 'Tag is already existed!';
            return;
        }

        tagsField.style.border = 'none';
        tags.push(tagsField.value.trim());
        tagsField.value = '';
        generateTagsTiles(tagsContainer);
    }

	switch (mode) {
		default:
		case 'CREATE':
			form.querySelector('h2').innerHTML= 'Create';
			form.querySelector('div.options button.main-button').onclick= createCategorySubmission;
			break;

		case 'EDIT':
			categoryIcon= undefined;
			form.querySelector('h2').innerHTML= 'Edit';
			form.querySelector('div.options button.main-button').onclick= ()=> { updateCategorySubmission(props.category.id); };
			const enNameField= form.querySelector('#en-name');
			const arNameField= form.querySelector('#ar-name');
			const enBioField= form.querySelector('#en-bio');
			const arBioField= form.querySelector('#ar-bio');
			const iconAltField= form.querySelector('#icon-alt');
			const tagsField= form.querySelector('#cat-tags');

			enNameField.value= props.category['name']['EN'];
			arNameField.value= props.category['name']['AR'];
			enBioField.value= props.category['bio']['EN'];
			arBioField.value= props.category['bio']['AR'];
			iconAltField.value= props.category['alt'];
			tags= props.category.tags;
			generateTagsTiles(form.querySelector('.tags .body'));
			form.querySelector('.image-picker').style.backgroundImage= `url(/assets/categories/icons/${props.category.id}/)`;

			break;
	}

	form.style.display= 'flex';
	overlay.style.display= 'flex';
}

const closeCategoryFormDialog= () => {
	resetCategoryFormDialog();
	document.querySelector('.form-dialog#category-form').style.display= 'none';
	document.querySelector('.form-dialog-overlay#category-form').style.display= 'none';
}

const resetCategoryFormDialog= ()=> {}


const pickImage = (container, props) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            container.style.backgroundImage = `url(${reader.result})`;
            categoryIcon= file_;
            console.log(categoryIcon)
        }
        reader.readAsDataURL(file_)
    }
    input.click();
}


const createCategorySubmission= ()=> {
	const form= document.querySelector('.form-dialog#category-form');
	const enNameField= form.querySelector('#en-name');
	const arNameField= form.querySelector('#ar-name');
	const enBioField= form.querySelector('#en-bio');
	const arBioField= form.querySelector('#ar-bio');
	const iconAltField= form.querySelector('#icon-alt');
	const tagsField= form.querySelector('#cat-tags');

	const submitBtn= form.querySelector('div.options button.main-button');
	const resetBtn= form.querySelector('div.options button.shadow-button#reset');
	const closeBtn= form.querySelector('div.options button.shadow-button#close');
	const statusMsg= form.querySelector('div.options p.status-msg#status-msg');

	if (enNameField.value.trim().length < 4) {
		enNameField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid English Name';
		return;
	}
	enNameField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (arNameField.value.trim().length < 4) {
		arNameField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid Arabic Name';
		return;
	}
	arNameField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (enBioField.value.trim().length < 24) {
		enBioField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid English Bio';
		return;
	}
	enBioField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (arBioField.value.trim().length < 24) {
		arBioField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid Arabic Bio';
		return;
	}
	arBioField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (categoryIcon === undefined) {
		statusMsg.innerHTML= 'Select Category Icon';
		return;
	}
	statusMsg.innerHTML= '';

	if (iconAltField.value.trim().length < 32) {
		iconAltField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid ALT Message';
		return;
	}
	iconAltField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (tags.length < 5) {
		tagsField.style.border= '2px red solid';
		statusMsg.innerHTML= 'It\'s recommended to add at least 5 tags!';
		return;
	}
	tagsField.style.border= 'none';
	statusMsg.innerHTML= '';

	const payload= {
		enName: enNameField.value.trim(),
		arName: arNameField.value.trim(),
		enBio: enBioField.value.trim(),
		arBio: arBioField.value.trim(),
		alt: iconAltField.value.trim(),
		tags: tags
	}
		statusMsg.innerHTML= '';
		submitBtn.innerHTML= 'Loading';
		submitBtn.style.pointerEvents= 'none';
		submitBtn.style.opacity= '0.5';
		closeBtn.style.pointerEvents= 'none';
		closeBtn.style.opacity= '0.5';
		resetBtn.style.pointerEvents= 'none';
		resetBtn.style.opacity= '0.5';

	try {		
		const data= new FormData();
		data.append('category', JSON.stringify(payload));
		data.append('icon', categoryIcon);

		const xhr= new XMLHttpRequest();
		xhr.onload= ()=> {
			if (xhr.status === 201) {
				window.open('./', '_self');
				return;

			}
			statusMsg.innerHTML= 'Try again later!';
			submitBtn.innerHTML= 'Failed';
			setTimeout(()=> {
				statusMsg.innerHTML= '';
				submitBtn.innerHTML= 'Submit';
				submitBtn.style.pointerEvents= 'all';
				submitBtn.style.opacity= '1';
				closeBtn.style.pointerEvents= 'all';
				closeBtn.style.opacity= '1';
				resetBtn.style.pointerEvents= 'all';
				resetBtn.style.opacity= '1';
			}, 3000);
		}

		xhr.open('POST', './');
		xhr.send(data);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		submitBtn.innerHTML= 'Failed';
		setTimeout(()=> {
			statusMsg.innerHTML= '';
			submitBtn.innerHTML= 'Submit';
			submitBtn.style.pointerEvents= 'all';
			submitBtn.style.opacity= '1';
			closeBtn.style.pointerEvents= 'all';
			closeBtn.style.opacity= '1';
			resetBtn.style.pointerEvents= 'all';
			resetBtn.style.opacity= '1';
		}, 3000);
	}


}


const updateCategorySubmission= (categoryId)=> {
	const form= document.querySelector('.form-dialog#category-form');
	const enNameField= form.querySelector('#en-name');
	const arNameField= form.querySelector('#ar-name');
	const enBioField= form.querySelector('#en-bio');
	const arBioField= form.querySelector('#ar-bio');
	const iconAltField= form.querySelector('#icon-alt');
	const tagsField= form.querySelector('#cat-tags');

	const submitBtn= form.querySelector('div.options button.main-button');
	const resetBtn= form.querySelector('div.options button.shadow-button#reset');
	const closeBtn= form.querySelector('div.options button.shadow-button#close');
	const statusMsg= form.querySelector('div.options p.status-msg#status-msg');

	if (enNameField.value.trim().length < 4) {
		enNameField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid English Name';
		return;
	}
	enNameField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (arNameField.value.trim().length < 4) {
		arNameField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid Arabic Name';
		return;
	}
	arNameField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (enBioField.value.trim().length < 24) {
		enBioField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid English Bio';
		return;
	}
	enBioField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (arBioField.value.trim().length < 24) {
		arBioField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid Arabic Bio';
		return;
	}
	arBioField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (iconAltField.value.trim().length < 32) {
		iconAltField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid ALT Message';
		return;
	}
	iconAltField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (tags.length < 5) {
		tagsField.style.border= '2px red solid';
		statusMsg.innerHTML= 'It\'s recommended to add at least 5 tags!';
		return;
	}
	tagsField.style.border= 'none';
	statusMsg.innerHTML= '';

	const payload= {
		enName: enNameField.value.trim(),
		arName: arNameField.value.trim(),
		enBio: enBioField.value.trim(),
		arBio: arBioField.value.trim(),
		alt: iconAltField.value.trim(),
		tags: tags,
		id: categoryId
	}
		statusMsg.innerHTML= '';
		submitBtn.innerHTML= 'Loading';
		submitBtn.style.pointerEvents= 'none';
		submitBtn.style.opacity= '0.5';
		closeBtn.style.pointerEvents= 'none';
		closeBtn.style.opacity= '0.5';
		resetBtn.style.pointerEvents= 'none';
		resetBtn.style.opacity= '0.5';

	try {		
		const data= new FormData();
		data.append('category', JSON.stringify(payload));
		if(categoryIcon!== undefined) {
			data.append('icon', categoryIcon);
		}

		const xhr= new XMLHttpRequest();
		xhr.onload= ()=> {
			if (xhr.status === 200) {
				window.open('./', '_self');
				return;

			}
			statusMsg.innerHTML= 'Try again later!';
			submitBtn.innerHTML= 'Failed';
			setTimeout(()=> {
				statusMsg.innerHTML= '';
				submitBtn.innerHTML= 'Submit';
				submitBtn.style.pointerEvents= 'all';
				submitBtn.style.opacity= '1';
				closeBtn.style.pointerEvents= 'all';
				closeBtn.style.opacity= '1';
				resetBtn.style.pointerEvents= 'all';
				resetBtn.style.opacity= '1';
			}, 3000);
		}

		xhr.open('PATCH', './');
		xhr.send(data);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		submitBtn.innerHTML= 'Failed';
		setTimeout(()=> {
			statusMsg.innerHTML= '';
			submitBtn.innerHTML= 'Submit';
			submitBtn.style.pointerEvents= 'all';
			submitBtn.style.opacity= '1';
			closeBtn.style.pointerEvents= 'all';
			closeBtn.style.opacity= '1';
			resetBtn.style.pointerEvents= 'all';
			resetBtn.style.opacity= '1';
		}, 3000);
	}


}




const generateTagsTiles = (container) => {
    container.innerHTML = '';

    for (let tag of tags) {
        const tile = document.createElement('div');
        tile.classList.add('tag-tile');

        const tagText = document.createElement('p')
        tagText.innerHTML = tag;

        const closeOption = document.createElement('div');
        closeOption.innerHTML = 'x';
        closeOption.onclick = () => {
            tags.splice(tags.indexOf(tag), 0);
            container.removeChild(tile);
        }

        tile.appendChild(tagText);
        tile.appendChild(closeOption);
        container.appendChild(tile);
    }
}
