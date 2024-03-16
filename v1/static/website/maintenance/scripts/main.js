let errorsContent, formsContent, actionsContent, currentSelectedGovern, lang;
const letters= 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
const pageInit= (props)=> {
	errorsContent= props.errorsContent;
	formsContent= props.formsContent;
	actionsContent= props.actionsContent;
	lang= props.lang;

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
			currentSelectedGovern = selectedOption.parentElement.id.split('-')[1];

			governOptionMenu.classList.remove("active");
		});
	});	
}


const openBookMaintenanceDialog= ()=> {
	document.querySelector('.form-dialog#book-form-dialog').style.display= 'flex';
	document.querySelector('.form-dialog-overlay#book-form-dialog').style.display= 'flex';
	const form = document.querySelector('div.form-dialog#book-form-dialog');
	const overlay = document.querySelector('div.form-dialog-overlay#book-form-dialog');
	const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	const firstNameField = form.querySelector('input.single-line-field#first-name-field'),
	lastNameField = form.querySelector('input.single-line-field#last-name-field'),
	emailField = form.querySelector('input.single-line-field#email-field'),
	phoneField = form.querySelector('input.single-line-field#phone-field'),
	addressField = form.querySelector('input.single-line-field#address-field'),
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
		for (let i=0; i<phoneField.value.trim().length; i++) {
			console.log(letters.includes(phoneField.value.trim()[i]))
			if(letters.includes(phoneField.value.trim()[i])) {
				phoneField.classList.add("error");
				statusMsg.innerHTML = errorsContent[lang]['notValidphoneNumber'];
				return;
			}
			phoneField.classList.remove("error");
			statusMsg.innerHTML = "";
		}
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


	setInterval(() => {
		if (firstNameField.value.trim().length < 3 ||
			lastNameField.value.trim().length < 3 ||
			phoneField.value.length !== 15
			|| !(String(emailField.value.trim()).toLowerCase().match(emailRegEx))
			|| addressField.value.trim().length < 8
			) {
			submitBtn.onclick = () => { statusMsg.innerHTML = errorsContent[lang]['formNotCompleted'] };
		submitBtn.style.opacity = '0.25';
		return;
	}

	if (currentSelectedGovern === undefined) {
		statusMsg.innerHTML = errorsContent[lang]['notValidGovern'];
		return;
	}
	statusMsg.innerHTML = '';
	submitBtn.style.opacity = '1';
	submitBtn.onclick = createMaintenaceTicket;
}, 5);

	form.style.display = 'flex';
	overlay.style.display = 'flex';


}
const closeBookMaintenanceDialog= ()=> {
	clearBookMaintenanceDialog();
	document.querySelector('.form-dialog#book-form-dialog').style.display= 'none';
	document.querySelector('.form-dialog-overlay#book-form-dialog').style.display= 'none';
}

const clearBookMaintenanceDialog= ()=> {
  const form = document.querySelector('div.form-dialog#book-form-dialog');
    const firstNameField = form.querySelector('input.single-line-field#first-name-field'),
        lastNameField = form.querySelector('input.single-line-field#last-name-field'),
        emailField = form.querySelector('input.single-line-field#email-field'),
        phoneField = form.querySelector('input.single-line-field#phone-field'),
        addressField = form.querySelector('input.single-line-field#address-field'),
        cancelBtn = form.querySelector('button.shadow-button'),
        submitBtn = form.querySelector('button.main-button'),
        statusMsg = form.querySelector('p.status-msg');
		
		firstNameField.value= '';
		firstNameField.classList.remove('error')

		lastNameField.value= '';
		lastNameField.classList.remove('error')

		emailField.value= '';
		emailField.classList.remove('error')

		phoneField.value= '';
		phoneField.classList.remove('error')

		addressField.value= '';
		addressField.classList.remove('error')
		statusMsg.innerHTML= '';

}


const createMaintenaceTicket= async ()=> {
  const form = document.querySelector('div.form-dialog#book-form-dialog');
    const firstNameField = form.querySelector('input.single-line-field#first-name-field'),
        lastNameField = form.querySelector('input.single-line-field#last-name-field'),
        emailField = form.querySelector('input.single-line-field#email-field'),
        phoneField = form.querySelector('input.single-line-field#phone-field'),
        addressField = form.querySelector('input.single-line-field#address-field'),
        cancelBtn = form.querySelector('button.shadow-button'),
        submitBtn = form.querySelector('button.main-button'),
        statusMsg = form.querySelector('p.status-msg');

    const payload = {
        fname: firstNameField.value.trim(),
        lname: lastNameField.value.trim(),
        email: emailField.value.trim(),
        phone: phoneField.value.trim(),
        address: addressField.value.trim(),
        govern: currentSelectedGovern,
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
            clearBookMaintenanceDialog();
            closeBookMaintenanceDialog();
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



const openConfirmationDialog = (props) => {
    const overlay = document.querySelector('div.form-dialog-overlay');
    const dialog = document.querySelector('div.dialog#confirmation-dialog');
    dialog.querySelector('p').innerHTML = props.msg;
    dialog.querySelector('div#icon').innerHTML = '<i class="fa-solid fa-check-circle" style="color: var(--accentColor)"></i>'
    overlay.style.display = 'flex';
    dialog.style.display = 'flex';
}

const closeConfirmationDialog = () => {
    const overlay = document.querySelector('div.form-dialog-overlay');
    const dialog = document.querySelector('div.dialog#confirmation-dialog');
    dialog.querySelector('p').innerHTML = '';
    dialog.querySelector('div#icon').innerHTML = '';
    overlay.style.display = 'none';
    dialog.style.display = 'none';
}