let lang, username, phoneNumber, email, password, profile, cover, profileReaderResult, phoneInputFieldGlobal;
window.onload = () => {
    const phoneInputField = document.querySelector(".single-line-field-awhite#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "eg",
        separateDialCode: true,
        preferredCountries: ["eg"],

    });
    phoneInputFieldGlobal = phoneInput;

    const profilePicker = document.querySelector('.form#profile-picker div.image-picker');
    profilePicker.onclick = () => {
        pickImage(profilePicker, {
            coverSize: false,
            listener: (readerResult, file) => {
                profile = file;
                profileReaderResult = readerResult;
            }
        });
    }
    inputElements = [...document.querySelectorAll('input.otp-field')]
    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
        })
        ele.addEventListener('input', (e) => {
            const [first, ...rest] = e.target.value
            e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
            const lastInputBox = index === inputElements.length - 1
            const didInsertContent = first !== undefined
            if (didInsertContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus()
                inputElements[index + 1].value = rest.join('')
                inputElements[index + 1].dispatchEvent(new Event('input'))
            }
        })
    });

}
const confirmation = async () => {
    const form = document.querySelector('section #form');
    const nameField = document.querySelector('section div#form input.single-line-field-awhite#name');
    const emailField = document.querySelector('section div#form input.single-line-field-awhite#email');
    const phoneField = document.querySelector('section div#form input.single-line-field-awhite#phone');
    const passwordField = document.querySelector('section div#form input.single-line-field-awhite#password');
    const repasswordField = document.querySelector('section div#form input.single-line-field-awhite#repassword');
    const statusMsg = document.querySelector('#actions p#status-msg');
    const confirmBtn = document.querySelector('#actions button.main-button');

    if (nameField.value.trim().length < 8 || nameField.value.trim().length > 64) {
        statusMsg.innerHTML = lang == 'EN' ? 'Enter a valid name!' : 'أدخل اسم صحيح';
        nameField.style.border = '2px red solid';
        return;
    }
    nameField.style.border = 'none';

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(emailField.value.trim().length > 8 && String(emailField.value.trim()).toLowerCase().match(re))) {
        emailField.style.border = '2px red solid';
        statusMsg.innerHTML = lang == 'EN' ? 'Enter a valid email!' : 'البريد لإلكتروني لا يصلح';
        return;
    }

    emailField.style.border = 'none';

    const phoneRe = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
    ;
    if (!(phoneField.value.trim().length > 8 && String(phoneField.value.trim()).toLowerCase().match(phoneRe))) {
        phoneField.style.border = '2px red solid';
        statusMsg.innerHTML = lang == 'EN' ? 'Enter a valid email!' : 'البريد لإلكتروني لا يصلح';
        return;
    }

    phoneField.style.border = 'none';


    if (passwordField.value.trim().length < 8 || passwordField.value.trim().length > 64) {
        statusMsg.innerHTML = lang == 'EN' ? 'Invalid Password!' : 'كلمة المرور لا تصلح';
        passwordField.style.border = '2px red solid';
        return;
    }
    passwordField.style.border = 'none';

    if (repasswordField.value.trim() !== passwordField.value.trim()) {
        statusMsg.innerHTML = lang == 'EN' ? 'Passwords Missmatched' : 'كلمتي المرور غير متطابقتين';
        passwordField.style.border = '2px red solid';
        repasswordField.style.border = '2px red solid';
        return;
    }
    passwordField.style.border = 'none';
    repasswordField.style.border = 'none';

    statusMsg.innerHTML = lang == 'EN' ? 'Loading...' : 'جاري التحميل';
    confirmBtn.style.pointerEvents = 'none'
    try {
        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({ email: emailField.value.trim(), name: nameField.value.trim(), mode: 'CHECKING_EMAIL_UNIQUENESS' }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            username = nameField.value.trim();
            email = emailField.value.trim();
            password = passwordField.value.trim();
            phoneNumber = phoneField.value.trim();
            form.style.display = 'none';
            document.querySelector('section #email-validation-form').style.display = 'flex';
        } else if (res.status === 301) {
            statusMsg.innerHTML = lang == 'EN' ? 'Email is existed! Try to Login instead!' : 'الحساب موجود بالفعل، يمكنك أن تسجل الدخول';
            confirmBtn.style.pointerEvents = 'all';
            return;
        }
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later' : 'الرجاء المحاولة لاحقاً';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            confirmBtn.style.pointerEvents = 'all';
        }, 3000);

    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later' : 'الرجاء المحاولة لاحقاً';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            confirmBtn.style.pointerEvents = 'all';
        }, 3000);
    }
}

const sendCodeAgain = async () => {
    try {
        const statusMsg = document.querySelector('#status-msg');
        const btn = document.querySelector('#send-code-again');
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.5';
        statusMsg.innerHTML = lang === 'EN' ? 'Loading...' : "جاري التحميل";
        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({ mode: 'SEND_CODE_AGAIN' }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.status === 200) {
            statusMsg.innerHTML = lang === 'EN' ? "Code sent successfully" : "تم إرسال الرمز بنجاح";
        } else {
            statusMsg.innerHTML = lang === 'EN' ? "Try again later!" : "أعد المحاول لاحقاً";
        }
        setTimeout(() => {
            btn.style.pointerEvents = 'all';
            btn.style.opacity = '1';
            statusMsg.innerHTML = '';
        }, 5000);

    } catch (error) {
        console.log(error)

    }
}


const codeValidation = async () => {
    const form = document.querySelector('.form#email-validation-form');
    const submission = document.querySelector('.form#email-validation-form #actions button.main-button');
    const statusMsg = document.querySelector('.form#email-validation-form #actions p#status-msg');

    const digitsField = Array.from({ length: 6 }, (_, i) => document.querySelector(`.form#email-validation-form #otp .otp-field#digit-${i}`))
    digitsField.forEach(digitField => {
        if (digitField.value.trim().length === 0 || Number.parseInt(digitField.value.trim()) == null) {
            digitField.style.border = '2px red solid';
            return;
        }
        digitField.style.border = '';
    });

    let code = '';
    for (let digitField of digitsField) code += `${Number.parseInt(digitField.value.trim())}`;

    statusMsg.innerHTML = lang === 'EN' ? 'Loading...' : 'جاري التحميل';
    submission.style.pointerEvents = 'none';

    try {
        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({
                mode: 'CODE',
                code: code,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            form.style.display = 'none';
            document.querySelector('.form#profile-picker').style.display = 'flex';
            return;
        } else if (res.status === 401) {
            digitsField.forEach(digitField => digitField.style.border = '2px red solid');
            statusMsg.innerHTML = lang == 'EN' ? 'Wrong Code!' : 'رقم التأكيدي غير صحيح';
            submission.style.pointerEvents = 'all';
        } else {
            statusMsg.innerHTML = lang == 'EN' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
            submission.style.pointerEvents = 'all';

        }
    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
        submission.style.pointerEvents = 'all';

    }


}

const profilePicterComplete = () => {
    const form = document.querySelector('.form#profile-picker');
    const statusMsg = document.querySelector('.form#profile-picker #actions #status-msg');
    console.log(profile);
    if (profile === undefined) {
        statusMsg.innerHTML = 'Select profile picture!';
        return;
    }

    form.style.display = 'none';
    showConfirmationPanel();
}
const profilePicterCompleteSkip = () => {
    const form = document.querySelector('.form#profile-picker');
    form.style.display = 'none';

    profile = undefined;

    showConfirmationPanel();
}


const pickImage = (container, props) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            container.style.backgroundImage = `url(${reader.result})`;
            if (props.coverSize) container.style.backgroundSize = 'cover';
            props.listener(reader.result, file_);

        }
        reader.readAsDataURL(file_)
    }
    input.click();
}

const showConfirmationPanel = () => {
    const form = document.querySelector('.form#confirmation-form');

    const profileContainer = form.querySelector('#profile');
    if (profile !== undefined && profileReaderResult !== undefined) {
        profileContainer.style.backgroundImage = `url(${profileReaderResult})`
    } else {
        profileContainer.style.background = 'var(--accentColor)';
    }
    const nameDisplay = form.querySelector('#information h3');
    nameDisplay.innerHTML = username
    const emailDisplay = form.querySelector('#information p#email');
    emailDisplay.innerHTML = email
    form.style.display = 'flex';

    const submitBtn = document.querySelector("div.form#confirmation-form #actions .main-button");
    submitBtn.onclick = () => {
        createUser();
    }
}

const createUser = async () => {
    const statusMsg = document.querySelector("div.form#confirmation-form #actions p");
    const submitBtn = document.querySelector("div.form#confirmation-form #actions .main-button");
    const cancelBtn = document.querySelector("div.form#confirmation-form #actions .shadow-button");
    try {

        submitBtn.onclick = () => { }
        cancelBtn.onclick = () => { }
        statusMsg.innerHTML = lang === 'EN' ? "Creating your account..." : "جاري إنشاء حسابك...";
        submitBtn.innerHTML = lang === 'EN' ? "Loading..." : "جاري التحميل...";

        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 201) {
                window.open('/', '_self');
                return;
            }

            console.log(xhr.status);
            statusMsg.innerHTML = lang === 'EN' ? "Please, Try again later!" : "من فضلك، أعد المحاولة لاحقًا";
            submitBtn.innerHTML = lang === 'EN' ? 'Failed' : "فشلت العملية";
            setTimeout(() => {
                statusMsg.innerHTML = '';
                submitBtn.innerHTML = lang === 'EN' ? 'Submit' : "تآكيد";
                submitBtn.onclick = () => {
                    createUser();
                }
                cancelBtn.onclick = () => { window.open('./', '_self'); }
            }, 3000);
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        }));

        if (profile !== undefined) formData.append('PROFILE', profile);

        xhr.open('POST', './');
        xhr.send(formData);

    } catch (error) {
        console.log(error);
        statusMsg.innerHTML = lang === 'EN' ? "Please, Try again later!" : "من فضلك، أعد المحاولة لاحقًا";
        submitBtn.innerHTML = lang === 'EN' ? 'Failed' : "فشلت العملية";
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submitBtn.innerHTML = lang === 'EN' ? 'Submit' : "تآكيد";
            submitBtn.onclick = () => {
                createUser();
            }
            cancelBtn.onclick = () => { window.open('./', '_self'); }
        }, 3000);

    }
}