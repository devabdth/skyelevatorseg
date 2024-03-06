let currentSelectedModel, currentSelectedPlan, currentSelectedGovern, plans, errorsContent, formsContent, actionsContent, lang;
const pageInit = (props) => {
    plans = props.plans;
    lang = props.lang;
    errorsContent = props.errorsContent;
    formsContent = props.formsContent;
    actionsContent = props.actionsContent;
    const modelOptionMenu = document.querySelector("#model-option-menu"),
        modelSelectBtn = modelOptionMenu.querySelector(".select-btn"),
        modelOptions = modelOptionMenu.querySelectorAll(".option"),
        modelsBtn_text = modelOptionMenu.querySelector(".sBtn-text"),
        planOptionMenu = document.querySelector("#plan-option-menu"),
        planSelectBtn = planOptionMenu.querySelector(".select-btn"),
        planOptions = planOptionMenu.querySelectorAll(".option"),
        plansBtn_text = planOptionMenu.querySelector(".sBtn-text");

    modelSelectBtn.addEventListener("click", () => {
        if (planOptionMenu.classList.contains('active')) planOptionMenu.classList.toggle("active")
        modelOptionMenu.classList.toggle("active")
    });

    modelOptions.forEach((modelOption) => {
        modelOption.addEventListener("click", () => {
            let selectedModelOption = modelOption.querySelector(".option-text");
            modelsBtn_text.innerText = selectedModelOption.innerHTML;
            plansBtn_text.innerText = formsContent[lang]["plan"];
            currentSelectedModel = selectedModelOption.parentElement.id.toUpperCase();
            planOptionMenu.parentElement.querySelector('ul div').innerHTML = '';
            for (let plan in plans[currentSelectedModel.replace('-', '_')]) {
                planOptionMenu.parentElement.querySelector('ul div').innerHTML += `
                <il class="option" id="${plan.toUpperCase()}">
                <span class="option-text">${plans[currentSelectedModel.replace('-', '_')][plan]["TITLE"][lang]}</span>
                </il>
                `;
            }
            const planOptions = planOptionMenu.querySelectorAll(".option");
            planOptions.forEach((planOption) => {
                planOption.addEventListener("click", () => {
                    let selectedPlanOption = planOption.querySelector(".option-text");
                    plansBtn_text.innerText = selectedPlanOption.innerHTML;
                    currentSelectedPlan = selectedPlanOption.parentElement.id.toUpperCase();

                    planOptionMenu.classList.remove("active");
                });
            });
            modelOptionMenu.classList.remove("active");
        });
    });


    planSelectBtn.addEventListener("click", () => {
        if (modelOptionMenu.classList.contains('active')) modelOptionMenu.classList.toggle("active")
        planOptionMenu.classList.toggle("active")
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

const openPickPlanForm = (model, plan) => {
    const form = document.querySelector('div.form#pick-plan-form');
    const overlay = document.querySelector('div.overlay#overlay');
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
        if (currentSelectedModel === undefined) {
            statusMsg.innerHTML = errorsContent[lang]['notValidModel'];
            return;
        }

        statusMsg.innerHTML = '';
        if (currentSelectedPlan === undefined) {
            statusMsg.innerHTML = errorsContent[lang]['notValidPlan'];
            return;
        }
        statusMsg.innerHTML = '';

        if (currentSelectedGovern === undefined) {
            statusMsg.innerHTML = errorsContent[lang]['notValidGovern'];
            return;
        }
        submitBtn.style.opacity = '1';
        submitBtn.onclick = pickPlanSubmission;
    }, 5);

    form.style.display = 'flex';
    overlay.style.display = 'flex';
}

const closePickPlanForm = (model, plan) => {
    const form = document.querySelector('div.form#pick-plan-form');
    const overlay = document.querySelector('div.overlay#overlay');
    form.style.display = 'none';
    overlay.style.display = 'none';
    clearPickPlanForm();
    form.querySelector('.status-msg').innerHTML = '';
}

const pickPlanSubmission = async () => {
    const form = document.querySelector('div.form#pick-plan-form');
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
        model: currentSelectedModel,
        plan: currentSelectedPlan,
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
            clearPickPlanForm();
            closePickPlanForm();
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

const clearPickPlanForm = () => {
    const form = document.querySelector('div.form#pick-plan-form');
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
    cancelBtn.onclick = closePickPlanForm;
    submitBtn.onclick = pickPlanSubmission;
    submitBtn.style.pointerEvents = 'all';
    cancelBtn.style.pointerEvents = 'all';
    cancelBtn.opacity = '1';
    cancelBtn.innerHTML = actionsContent[lang]['cancel'];
    submitBtn.innerHTML = actionsContent[lang]['submit'];
    statusMsg.innerHTML = actionsContent[lang]['formClearedSuccessfully']

}

const openConfirmationDialog = (props) => {
    const overlay = document.querySelector('div.overlay#overlay');
    const dialog = document.querySelector('div.dialog#confirmation-dialog');
    dialog.querySelector('p').innerHTML = props.msg;
    dialog.querySelector('div#icon').innerHTML = '<i class="fa-solid fa-check-circle" style="color: var(--accentColor)"></i>'
    overlay.style.display = 'flex';
    dialog.style.display = 'flex';
}

const closeConfirmationDialog = () => {
    const overlay = document.querySelector('div.overlay#overlay');
    const dialog = document.querySelector('div.dialog#confirmation-dialog');
    dialog.querySelector('p').innerHTML = '';
    dialog.querySelector('div#icon').innerHTML = '';
    overlay.style.display = 'none';
    dialog.style.display = 'none';
}