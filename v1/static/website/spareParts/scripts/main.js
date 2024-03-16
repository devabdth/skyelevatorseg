let errorsContent, formsContent, actionsContent, currentSelectedGovern, lang, categories, products, currentSelectedCategory, currentSelectedSparePart;
const letters= 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
const pageInit = (props) => {
    lang = props.lang;
    errorsContent = props.errorsContent;
    formsContent = props.formsContent;
    actionsContent = props.actionsContent;
    categories= props.categories;
	products= props.products;

	const tabs= document.querySelectorAll('.spare-part-tab');
	tabs[0].classList.add('active');
	const fragments= document.querySelectorAll('.spare-part-fragment');
	fragments[0].classList.remove('not-active-right');
	fragments[0].classList.add('active');
	
	for (let tab of tabs) {
		tab.onclick= ()=> {
			if (tab.classList.contains('active')) return;
			document.querySelector('.spare-part-tab.active').classList.remove('active');
			tab.classList.add('active');
			const cat= categories.filter(cat_ => cat_.id.substring(0, 6) == tab.id.split('-')[1].substring(0, 6) && cat_.id.substring(cat_.id.length -6, cat_.id.length) == tab.id.split('-')[1].substring(tab.id.split('-')[1].length -6, tab.id.split('-')[1].length))[0]
			if (!cat) return;
			const catIndex= categories.indexOf(cat);
			console.log(catIndex);
			for (let i =0; i < catIndex; i++) {
				for (let className of fragments[i].classList) {
					if (className !== 'spare-part-fragment') {
						fragments[i].classList.remove(className);
					}
				}
				fragments[i].classList.add('not-active-left')

			}
			for (let i =(catIndex+1); i < fragments.length; i++) {
				for (let className of fragments[i].classList) {
					if (className !== 'spare-part-fragment') {
						fragments[i].classList.remove(className);
					}
				}
				fragments[i].classList.add('not-active-right')
			}
			fragments[catIndex].classList.add('active')
			for (let className of fragments[catIndex].classList) {
					if (className !== 'spare-part-fragment') {
						fragments[catIndex].classList.remove(className);
					}
				}
					fragments[catIndex].classList.add('active')
		}
	}


    const categoryOptionMenu = document.querySelector("#category-option-menu"),
    categorySelectBtn = categoryOptionMenu.querySelector(".select-btn"),
    categoryOptions = categoryOptionMenu.querySelectorAll(".option"),
    categorysBtn_text = categoryOptionMenu.querySelector(".sBtn-text"),
    sparePartOptionMenu = document.querySelector("#spare-part-option-menu"),
    sparePartSelectBtn = sparePartOptionMenu.querySelector(".select-btn"),
    sparePartOptions = sparePartOptionMenu.querySelectorAll(".option"),
    sparePartsBtn_text = sparePartOptionMenu.querySelector(".sBtn-text");

    categorySelectBtn.addEventListener("click", () => {
        if (sparePartOptionMenu.classList.contains('active')) sparePartOptionMenu.classList.toggle("active")
            categoryOptionMenu.classList.toggle("active")
    });

    categoryOptions.forEach((categoryOption) => {
        categoryOption.addEventListener("click", () => {
            let selectedCategoryOption = categoryOption.querySelector(".option-text");
            categorysBtn_text.innerText = selectedCategoryOption.innerHTML;
            sparePartsBtn_text.innerText = formsContent[lang]["sparePart"];
            currentSelectedCategory = categories.filter(cat => cat.id.substring(0, 4).toLowerCase() === selectedCategoryOption.parentElement.id.split('-')[1].toLowerCase())[0].id;
            sparePartOptionMenu.parentElement.querySelector('ul div').innerHTML = '';
            for (let sparePart of products.filter(prod => prod.category === currentSelectedCategory)) {
                sparePartOptionMenu.parentElement.querySelector('ul div').innerHTML += `
                <il class="option" id="prod-${sparePart.id.substring(0, 4)}">
                <span class="option-text">${sparePart.name[lang]}</span>
                </il>
                `;
            }
            const sparePartOptions = sparePartOptionMenu.querySelectorAll(".option");
            sparePartOptions.forEach((sparePartOption) => {
                sparePartOption.addEventListener("click", () => {
                    let selectedSparePartOption = sparePartOption.querySelector(".option-text");
                    sparePartsBtn_text.innerText = selectedSparePartOption.innerHTML;
                    currentSelectedSparePart = products.filter(prod => prod.id.substring(0, 4).toLowerCase() === selectedSparePartOption.parentElement.id.split('-')[1].toLowerCase())[0].id;

                    sparePartOptionMenu.classList.remove("active");
                });
            });
            categoryOptionMenu.classList.remove("active");
        });
    });


    sparePartSelectBtn.addEventListener("click", () => {
        if (categoryOptionMenu.classList.contains('active')) categoryOptionMenu.classList.toggle("active")
            sparePartOptionMenu.classList.toggle("active")
    });


    const governOptionMenu = document.querySelector("#govern-option-menu"),
    selectBtn = governOptionMenu.querySelector(".select-btn"),
    options = governOptionMenu.querySelectorAll(".option"),
    sBtn_text = governOptionMenu.querySelector(".sBtn-text");

    selectBtn.addEventListener("click", () =>
        governOptionMenu.classList.toggle("active")
        );

    options.forEach((option) => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text");
            sBtn_text.innerText = selectedOption.innerHTML;
            currentSelectedGovern = selectedOption.parentElement.id;

            governOptionMenu.classList.remove("active");
        });
    });
}

const openSendInqueryForm = (category, sparePart) => {
    const form = document.querySelector('div.form#send-inquery');
    const overlay = document.querySelector('div.overlay#send-inquery');
    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const firstNameField = form.querySelector('input.single-line-field#first-name'),
    lastNameField = form.querySelector('input.single-line-field#last-name'),
    emailField = form.querySelector('input.single-line-field#email'),
    phoneField = form.querySelector('input.single-line-field#phone'),
    areaField = form.querySelector('input.single-line-field#area'),
    addressField = form.querySelector('input.single-line-field#address'),
    cancelBtn = form.querySelector('button.shadow-button'),
    submitBtn = form.querySelector('button.main-button'),
    statusMsg = form.querySelector('p.status-msg');


    firstNameField.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value.trim().length < 3) {
            e.target.classList.add('error');
            statusMsg.innerHTML = errorsContent[lang]['notValidFirstName']
            return;
        }
        e.target.classList.remove('error')
        statusMsg.innerHTML = "";
    });

    lastNameField.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value.trim().length < 3) {
            e.target.classList.add('error');
            statusMsg.innerHTML = errorsContent[lang]['notValidLastName']
            return;
        }
        e.target.classList.remove('error')
        statusMsg.innerHTML = "";
    });

    emailField.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (!(String(value).toLowerCase().match(emailRegEx))) {
            e.target.classList.add('error');
            statusMsg.innerHTML = errorsContent[lang]['notValidEmail']
            return;
        }
        e.target.classList.remove('error')
        statusMsg.innerHTML = "";
    });

    phoneField.addEventListener('input', (e) => {
        let formattedValue = e.target.value;
        if (!formattedValue.startsWith("+20")) {
            formattedValue = "+20 " + formattedValue;
        }

        formattedValue = formattedValue.replace("+20 01", "+20 1");
        formattedValue = formattedValue.replace(/^\+20\s(\d{3})\s?(\d{7})$/, "+20 $1 $2");
        formattedValue = formattedValue.substring(0, 15);

        phoneField.value = formattedValue;
        if (formattedValue.length !== 15) {
            phoneField.classList.add("error");
            statusMsg.innerHTML = errorsContent[lang]['notValidphoneNumber'];
            return;
        }
        phoneField.classList.remove("error");
        statusMsg.innerHTML = "";
    });

    addressField.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value.trim().length < 8) {
            e.target.classList.add('error');
            statusMsg.innerHTML = errorsContent[lang]['notValidAddress']
            return;
        }
        e.target.classList.remove('error')
        statusMsg.innerHTML = "";
    });

    areaField.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value.trim().length < 4) {
            e.target.classList.add('error');
            statusMsg.innerHTML = errorsContent[lang]['notValidArea']
            return;
        }
        e.target.classList.remove('error')
        statusMsg.innerHTML = "";
    });

    setInterval(() => {
        if (firstNameField.value.trim().length < 3 ||
            lastNameField.value.trim().length < 3 ||
            phoneField.value.length !== 15
            || !(String(emailField.value.trim()).toLowerCase().match(emailRegEx))
            || addressField.value.trim().length < 8
            || areaField.value.trim().length < 4
            ) {
            submitBtn.onclick = () => { statusMsg.innerHTML = errorsContent[lang]['formNotCompleted'] };
        submitBtn.style.opacity = '0.25';
        return;
    }
    if (currentSelectedCategory === undefined) {
        statusMsg.innerHTML = errorsContent[lang]['notValidCategory'];
        return;
    }

    statusMsg.innerHTML = '';
    if (currentSelectedSparePart === undefined) {
        statusMsg.innerHTML = errorsContent[lang]['notValidSparePart'];
        return;
    }
    statusMsg.innerHTML = '';

    if (currentSelectedGovern === undefined) {
        statusMsg.innerHTML = errorsContent[lang]['notValidGovern'];
        return;
    }
    submitBtn.style.opacity = '1';
    submitBtn.onclick = pickSparePartSubmission;
}, 5);

    form.style.display = 'flex';
    overlay.style.display = 'flex';
}

const closeSendInqueryForm = (category, sparePart) => {
    const form = document.querySelector('div.form#send-inquery');
    const overlay = document.querySelector('div.overlay#send-inquery');
    form.style.display = 'none';
    overlay.style.display = 'none';
    clearSendInqueryForm();
    form.querySelector('.status-msg').innerHTML = '';
}

const pickSparePartSubmission = async () => {
    const form = document.querySelector('div.form#send-inquery');
    const firstNameField = form.querySelector('input.single-line-field#first-name'),
    lastNameField = form.querySelector('input.single-line-field#last-name'),
    emailField = form.querySelector('input.single-line-field#email'),
    phoneField = form.querySelector('input.single-line-field#phone'),
    areaField = form.querySelector('input.single-line-field#area'),
    addressField = form.querySelector('input.single-line-field#address'),
    cancelBtn = form.querySelector('button.shadow-button'),
    submitBtn = form.querySelector('button.main-button'),
    statusMsg = form.querySelector('p.status-msg');

    const payload = {
        fname: firstNameField.value.trim(),
        lname: lastNameField.value.trim(),
        email: emailField.value.trim(),
        phone: phoneField.value.trim(),
        address: addressField.value.trim(),
        area: areaField.value.trim(),
        govern: currentSelectedGovern,
        category: currentSelectedCategory,
        sparePart: currentSelectedSparePart,
    }

    submitBtn.innerHTML = errorsContent[lang]['loading'];
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.opacity = '0.5';
    cancelBtn.style.pointerEvents = 'none';
    cancelBtn.style.opacity = '0.5';

    try {
        const res = await fetch('./', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.status === 201) {
            clearSendInqueryForm();
            closeSendInqueryForm();
            openConfirmationDialog({ msg: actionsContent[lang]['ticketPlaced'], success: true });

            return;
        }
        console.log(res.status);
        submitBtn.style.pointerEvents = 'all';
        submitBtn.innerHTML = errorsContent[lang]['failed'];
        statusMsg.innerHTML = errorsContent[lang]['tryAgainLater'];
        cancelBtn.pointerEvents = 'all';
        cancelBtn.opacity = '1';
        setTimeout(() => {
            submitBtn.innerHTML = actionsContent[lang]['submit'];
            submitBtn.style.opacity = '1';
            statusMsg.innerHTML = '';
            requestSending = false;
        }, 5000);
        return;

    } catch (e) {
        console.log(e);
        submitBtn.style.pointerEvents = 'all';
        submitBtn.innerHTML = errorsContent[lang]['failed'];
        statusMsg.innerHTML = errorsContent[lang]['tryAgainLater'];
        cancelBtn.pointerEvents = 'all';
        cancelBtn.opacity = '1';
        setTimeout(() => {
            submitBtn.innerHTML = actionsContent[lang]['submit'];
            statusMsg.innerHTML = '';
            requestSending = false;
            submitBtn.style.opacity = '1';
        }, 5000);
    }

}

const clearSendInqueryForm = () => {
    const form = document.querySelector('div.form#send-inquery');
    const firstNameField = form.querySelector('input.single-line-field#first-name'),
    lastNameField = form.querySelector('input.single-line-field#last-name'),
    emailField = form.querySelector('input.single-line-field#email'),
    phoneField = form.querySelector('input.single-line-field#phone'),
    areaField = form.querySelector('input.single-line-field#area'),
    addressField = form.querySelector('input.single-line-field#address'),
    cancelBtn = form.querySelector('button.shadow-button'),
    submitBtn = form.querySelector('button.main-button'),
    statusMsg = form.querySelector('p.status-msg');

    firstNameField.value = '';
    lastNameField.value = '';
    emailField.value = '';
    phoneField.value = '';
    areaField.value = '';
    addressField.value = '';
    cancelBtn.onclick = closeSendInqueryForm;
    submitBtn.onclick = pickSparePartSubmission;
    submitBtn.style.pointerEvents = 'all';
    cancelBtn.style.pointerEvents = 'all';
    cancelBtn.opacity = '1';
    cancelBtn.innerHTML = actionsContent[lang]['cancel'];
    submitBtn.innerHTML = actionsContent[lang]['submit'];
    statusMsg.innerHTML = actionsContent[lang]['formClearedSuccessfully']

}

const openConfirmationDialog = (props) => {
    const overlay = document.querySelector('div.overlay#send-inquery');
    const dialog = document.querySelector('div.dialog#confirmation-dialog');
    dialog.querySelector('p').innerHTML = props.msg;
    dialog.querySelector('div#icon').innerHTML = '<i class="fa-solid fa-check-circle" style="color: var(--accentColor)"></i>'
    overlay.style.display = 'flex';
    dialog.style.display = 'flex';
}

const closeConfirmationDialog = () => {
    const overlay = document.querySelector('div.overlay#send-inquery');
    const dialog = document.querySelector('div.dialog#confirmation-dialog');
    dialog.querySelector('p').innerHTML = '';
    dialog.querySelector('div#icon').innerHTML = '';
    overlay.style.display = 'none';
    dialog.style.display = 'none';
}


const closeToast= ()=> {
    const header= document.querySelector('#toast #header');
    const content = document.querySelector('#toast #content');
    const icon = document.querySelector('#toast #toast-icon');
    header.style.opactiy= '0';
    content.style.opacity= '0';
    setTimeout(()=> {
        document.querySelector('#toast').classList.remove('active');
        icon.style.opacity= '1';
        document.querySelector('#toast').onclick= openToast;
    }, 550)
}

const openToast= ()=> {
    const header= document.querySelector('#toast #header');
    const content = document.querySelector('#toast #content');
    const icon = document.querySelector('#toast #toast-icon');
    document.querySelector('#toast').classList.add('active');
    document.querySelector('#toast').onclick= undefined;
    icon.style.opactiy= '0';
    setTimeout(()=> {
        header.style.opactiy= '1';
        content.style.opacity= '1';
    }, 550)
}

