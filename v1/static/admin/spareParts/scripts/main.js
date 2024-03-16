let tags, images, currentSelectedCategory;
const pageInit= ()=> {
	window.addEventListener('load', ()=> {
		// openSparePartFormDialog();
	});
}
const openSparePartFormDialog= (mode, props)=> {
	const form= document.querySelector('div.form-dialog#spare-part-form');
	const overlay= document.querySelector('div.form-dialog-overlay#spare-part-form');

	selectedFiles= [];
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

    const optionMenu = document.querySelector("#category-option-menu"),
        selectBtn = optionMenu.querySelector(".select-btn"),
        options = optionMenu.querySelectorAll(".option"),
        sBtn_text = optionMenu.querySelector(".sBtn-text");

    selectBtn.addEventListener("click", () =>
        optionMenu.classList.toggle("active")
    );

    options.forEach((option) => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text");
            sBtn_text.innerText = selectedOption.innerHTML;
            currentSelectedCategory = selectedOption.parentElement.id.split('-')[1];

            optionMenu.classList.remove("active");
        });
    });



	switch (mode) {
		default:
		case 'CREATE':
			form.querySelector('h2').innerHTML= 'Create';
			form.querySelector('.options button.main-button').onclick= createProductSubmission;
			break;
		case 'EDIT':
			form.querySelector('h2').innerHTML= 'Edit';
			form.querySelector('div.options button.main-button').onclick= ()=> { updateProductSubmission(props.product.id); };
			const enNameField= form.querySelector('#en-name');
			const arNameField= form.querySelector('#ar-name');
			const enBioField= form.querySelector('#en-bio');
			const arBioField= form.querySelector('#ar-bio');
			const iconAltField= form.querySelector('#images-alt');
			const tagsField= form.querySelector('#cat-tags');

			enNameField.value= props.product['name']['EN'];
			arNameField.value= props.product['name']['AR'];
			enBioField.value= props.product['bio']['EN'];
			arBioField.value= props.product['bio']['AR'];
			iconAltField.value= props.product['alt'];
			tags= props.product.tags;
			generateTagsTiles(form.querySelector('.tags .body'));
			form.querySelector('label#images').style.display= 'none';
			form.querySelector('.images').style.display= 'none';

			currentSelectedCategory= props.product['category'];
            let selectedOption = form.querySelector(`.option#cat-${props.product['category']}`).querySelector(".option-text");
            sBtn_text.innerText = selectedOption.innerHTML;
            currentSelectedCategory = selectedOption.parentElement.id.split('-')[1];

			break;
	}

	form.style.display= 'flex'
	overlay.style.display= 'flex'
}

const closeSparePartFormDialog= ()=> {
	resetSparePartFormDialog();
	const form= document.querySelector('div.form-dialog#spare-part-form');
	form.style.display= 'none';
	const overlay= document.querySelector('div.form-dialog-overlay#spare-part-form');
	overlay.style.display= 'none';
}

const resetSparePartFormDialog= ()=> {
	const form= document.querySelector('div.form-dialog#spare-part-form');
	form.querySelectorAll('input').forEach(field => {field.value= ''});
	tags= [];
	images= [];
	form.querySelector('.tags .body').innerHTML= '';
	form.querySelector('.images .body').innerHTML= '';
}

const removeSelectedImage= (element)=> {
	const file_= selectedFiles.filter(file => file.name === element.id)[0];
	console.log(element)
	console.log(file_)
	if (!file_) return;

	selectedFiles.splice(file_, 1);
	element.parentElement.removeChild(element);
}

const handleImagesPicking = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const res=  e.target.files[0];

		if (res === undefined) {
			statusMsg.innerHTML= 'No Image was selected!';
			return;
		}
		const form= document.querySelector('div.form-dialog#spare-part-form');
		const statusMsg= form.querySelector('.options .status-msg');
		const imagesBody= form.querySelector('.images .body');

		selectedFiles.push(res);

		imagesBody.innerHTML += `
			<div class="image-row" id="${res.name}">
				<p>${res.name}</p>
				<div onclick='removeSelectedImage(this.parentElement)'><i class='fa-solid fa-close'></i></div>
			</div>
		`
    }
    input.click();
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



const createProductSubmission= ()=> {
	const form= document.querySelector('.form-dialog#spare-part-form');
	const enNameField= form.querySelector('#en-name');
	const arNameField= form.querySelector('#ar-name');
	const enBioField= form.querySelector('#en-bio');
	const arBioField= form.querySelector('#ar-bio');
	const iconAltField= form.querySelector('#images-alt');
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

	if (selectedFiles.length < 3) {
		statusMsg.innerHTML= 'Select at least 3 images!';
		return;
	}
	statusMsg.innerHTML= '';

	if (!currentSelectedCategory) {
		statusMsg.innerHTML= 'Select Spare Part Category';
		return;
	}
	statusMsg.innerHTML= '';


	if (tags.length < 5) {
		tagsField.style.border= '2px red solid';
		statusMsg.innerHTML= 'It\'s recommended to add at least 5 tags!';
		return;
	}
	tagsField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (iconAltField.value.trim().length < 32) {
		iconAltField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid ALT Message';
		return;
	}
	iconAltField.style.border= 'none';
	statusMsg.innerHTML= '';

	const payload= {
		enName: enNameField.value.trim(),
		arName: arNameField.value.trim(),
		enBio: enBioField.value.trim(),
		arBio: arBioField.value.trim(),
		alt: iconAltField.value.trim(),
		category: currentSelectedCategory,
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
		for (let selectedFileIndex in selectedFiles) data.append(`asset-${selectedFileIndex}`, selectedFiles[selectedFileIndex]);

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

const updateProductSubmission= (productId)=> {
	const form= document.querySelector('.form-dialog#spare-part-form');
	const enNameField= form.querySelector('#en-name');
	const arNameField= form.querySelector('#ar-name');
	const enBioField= form.querySelector('#en-bio');
	const arBioField= form.querySelector('#ar-bio');
	const iconAltField= form.querySelector('#images-alt');
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

	if (!currentSelectedCategory) {
		statusMsg.innerHTML= 'Select Spare Part Category';
		return;
	}
	statusMsg.innerHTML= '';


	if (tags.length < 5) {
		tagsField.style.border= '2px red solid';
		statusMsg.innerHTML= 'It\'s recommended to add at least 5 tags!';
		return;
	}
	tagsField.style.border= 'none';
	statusMsg.innerHTML= '';

	if (iconAltField.value.trim().length < 32) {
		iconAltField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter a Valid ALT Message';
		return;
	}
	iconAltField.style.border= 'none';
	statusMsg.innerHTML= '';

	const payload= {
		enName: enNameField.value.trim(),
		arName: arNameField.value.trim(),
		enBio: enBioField.value.trim(),
		arBio: arBioField.value.trim(),
		alt: iconAltField.value.trim(),
		category: currentSelectedCategory,
		tags: tags,
		id: productId,
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
		data.append('product', JSON.stringify(payload));

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


const openDeleteProductDialog= (productId)=> {
	const form= document.querySelector('div.confirmation-dialog#delete-product');
	form.style.display= 'flex';

	const overlay= document.querySelector('div.confirmation-dialog-overlay#delete-product');;
	overlay.style.display= 'flex';

	const submitBtn= form.querySelector('button.main-button').onclick= ()=> { deleteProductSubmission(productId); }
}

const closeDeleteSparePartDialog = ()=> {
	const form= document.querySelector('div.confirmation-dialog#delete-product');
	form.style.display= 'none';

	const overlay= document.querySelector('div.confirmation-dialog-overlay#delete-product');;
	overlay.style.display= 'none';

	 form.querySelector('input').value= '';
	form.querySelector('button.main-button').onclick= ()=> {  }
}


const deleteProductSubmission= async (productId) => {
	const form= document.querySelector('div.confirmation-dialog#delete-product');
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
			body: JSON.stringify({ password: passwordField.value.trim(), productId: productId }),
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
