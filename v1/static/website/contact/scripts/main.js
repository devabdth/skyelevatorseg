let actionsContent, phoneInputFieldGlobal, errorsContent, statusContent, currentSelectedMsgOption;

const initContent = (actionsContent_, errorsContent_, statusContent_) => {
    actionsContent = actionsContent_;
    errorsContent = errorsContent_;
    statusContent = statusContent_;
}
const pageInit = () => {
    const map = document.querySelector('#left-section #map').onclick = () => {
        window.open('https://maps.app.goo.gl/Mn3qRjvz6LgDER4W9', '_blank')
    }
    const optionMenu = document.querySelector("#request-option-menu"),
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
            currentSelectedMsgOption = selectedOption.parentElement.id;

            optionMenu.classList.remove("active");
        });
    });

    const phoneInputField = document.querySelector("#phone-field");
    const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "eg",
        separateDialCode: true,
        preferredCountries: ["eg"],

    });
    phoneInputFieldGlobal= phoneInput;
}
if (window.addEventListener) window.addEventListener('load', pageInit);
else if (window.attachEvent) window.attachEvent('onload', pageInit);


const formClear = () => {
    const nameField = document.querySelector('input.single-line-field#name-field');
    const emailField = document.querySelector('input.single-line-field#email-field');
    const phoneField = document.querySelector('input.single-line-field#phone-field');
    const messageField = document.querySelector('textarea.mutli-line-field#message-field');
    const optionMenu = document.querySelector('.select-menu#request-option-menu');
    const statusMsg = document.querySelector('div.options p.status-msg#status-msg');
    const submitBtn = document.querySelector('div.options button.main-button');
    const clearBtn = document.querySelector('div.options button.shadow-button');
    nameField.value = '';
    emailField.value = '';
    phoneField.value = '';
    messageField.value = '';
    optionMenu.value = '';
    statusMsg.innerHTML = '';
    submitBtn.innerHTML = actionsContent['submit'];
    clearBtn.style.opacity = '1';
    clearBtn.style.pointerEvent = 'all';
    submitBtn.onclick = formSubmit;
    nameField.style.border = 'none';
    emailField.style.border = 'none';
    phoneField.style.border = 'none';
    messageField.style.border = 'none';
    optionMenu.style.border = 'none';

}

const formSubmit = async () => {
    const nameField = document.querySelector('input.single-line-field#name-field');
    const emailField = document.querySelector('input.single-line-field#email-field');
    const phoneField = document.querySelector('input.single-line-field#phone-field');
    const messageField = document.querySelector('textarea.mutli-line-field#message-field');
    const optionMenu = document.querySelector('.select-menu#request-option-menu');
    const statusMsg = document.querySelector('div.options p.status-msg#status-msg');
    const submitBtn = document.querySelector('div.options button.main-button');
    const clearBtn = document.querySelector('div.options button.shadow-button');

    if (nameField.value.trim().length < 8) {
        statusMsg.innerHTML = errorsContent['notValidName'];
        nameField.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    nameField.style.border = 'none';

    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(emailField.value.trim().length > 8 && String(emailField.value.trim()).toLowerCase().match(emailRegEx))) {
        statusMsg.innerHTML = errorsContent['notValidEmail'];
        emailField.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    emailField.style.border = 'none';

    const phoneRegEx = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
    if (!(phoneField.value.trim().length > 8 && String(phoneField.value.trim()).toLowerCase().match(phoneRegEx))) {
        statusMsg.innerHTML = errorsContent['notValidphoneNumber'];
        phoneField.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    phoneField.style.border = 'none';

    if (messageField.value.trim().length < 32) {
        statusMsg.innerHTML = errorsContent['notValidMessage'];
        messageField.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    messageField.style.border = 'none';

    if (!currentSelectedMsgOption) {
        statusMsg.innerHTML = errorsContent['notMessageOptionSelected'];
        optionMenu.style.border = '2px red solid';
        return;

    }
    optionMenu.style.border = 'none';

    statusMsg.innerHTML = '';
    submitBtn.onclick = () => { }
    submitBtn.innerHTML = actionsContent['loading'];
    clearBtn.style.opacity = '0';
    clearBtn.style.pointerEvent = 'none';

    try {
        const payload = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            phone: phoneField.value.trim(),
            message: messageField.value.trim(),
            option: currentSelectedMsgOption,
            time: new Date().getTime(),
            countryCode: phoneInputFieldGlobal.s.iso2
        }
        console.log(payload);

        const res = await fetch('./', {
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        if (res.status === 201) {
            formClear();
            statusMsg.innerHTML = statusContent['messageSentSuccessfully'];
            submitBtn.innerHTML = statusContent['success'];
            setTimeout(() => {
                statusMsg.innerHTML = '';
                submitBtn.innerHTML = actionsContent['submit'];
                clearBtn.style.opacity = '1';
                clearBtn.style.pointerEvent = 'all';
                submitBtn.onclick = formSubmit;
            }, 3000);
            return;
        }

        statusMsg.innerHTML = statusContent['tryAgainLater'];
        submitBtn.innerHTML = statusContent['failed'];
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submitBtn.innerHTML = actionsContent['submit'];
            clearBtn.style.opacity = '1';
            clearBtn.style.pointerEvent = 'all';
            submitBtn.onclick = formSubmit;
        }, 5000);


    } catch (error) {
        console.log(error);
        statusMsg.innerHTML = statusContent['tryAgainLater'];
        submitBtn.innerHTML = statusContent['failed'];
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submitBtn.innerHTML = actionsContent['submit'];
            clearBtn.style.opacity = '1';
            clearBtn.style.pointerEvent = 'all';
            submitBtn.onclick = formSubmit;
        }, 5000);
    }
}