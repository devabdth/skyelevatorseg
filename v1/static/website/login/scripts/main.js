const confirmation = async () => {
    const emailField = document.querySelector('#form input.single-line-field-awhite#email')
    const passwordField = document.querySelector('#form input.single-line-field-awhite#password');
    const confirmationBtn = document.querySelector('#form #actions button.main-button');
    const signupRedirect = document.querySelector('#form #actions a.shadow-button');
    const statusMsg = document.querySelector('#form p#status-msg');

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!(emailField.value.trim().length > 8 && String(emailField.value.trim()).toLowerCase().match(re))) {
        emailField.style.border = '2px red solid';
        statusMsg.innerHTML = lang == 'EN' ? 'Enter a valid email!' : 'البريد لإلكتروني لا يصلح';
        return;
    }

    emailField.style.border = 'none';

    if (!(passwordField.value.trim().length > 8)) {
        passwordField.style.border = '2px red solid';
        statusMsg.innerHTML = lang == 'EN' ? 'Invalid Password!' : 'كلمة المرور لا تصلح';
        return;
    }
    passwordField.style.border = 'none';

    statusMsg.innerHTML = 'Loading...';
    confirmationBtn.style.pointerEvents = 'none';
    signupRedirect.style.pointerEvents = 'none';

    try {
        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({ email: emailField.value.trim(), password: password.value.trim() }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            let body= await res.json();
            console.log(body)
            if (body['fallbackURL'] !== undefined  && body['fallbackURL'] !== "null" && body['fallbackURL'] !== null) window.open(`..${body['fallbackURL']}/`, '_self');
            else window.open('/', '_self');
            return;
        } else if (res.status === 401) {
            statusMsg.innerHTML = 'Wrong Password!';
            passwordField.style.border = '2px red solid';
            setTimeout(() => {
                statusMsg.innerHTML = '';
                confirmationBtn.innerHTML = 'Login';
                confirmationBtn.style.pointerEvents = 'all';
                signupRedirect.style.pointerEvents = 'all';
            }, 3000);
            return;
        } else if (res.status === 404) {
            statusMsg.innerHTML = 'User not found';
            emailField.style.border = '2px red solid';
            setTimeout(() => {
                statusMsg.innerHTML = '';
                confirmationBtn.innerHTML = 'Login';
                confirmationBtn.style.pointerEvents = 'all';
                signupRedirect.style.pointerEvents = 'all';
            }, 3000);
            return;
        } else {
            confirmationBtn.innerHTML = 'Failed';
            setTimeout(() => {
                statusMsg.innerHTML = '';
                confirmationBtn.innerHTML = 'Login';
                confirmationBtn.style.pointerEvents = 'all';
                signupRedirect.style.pointerEvents = 'all';
            }, 3000);
            statusMsg.innerHTML = 'Try again later!';
            emailField.style.border = '2px red solid';
            passwordField.style.border = '2px red solid';
            return;
        }
    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = 'Try again later!';
        confirmationBtn.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            confirmationBtn.innerHTML = 'Login';
            confirmationBtn.style.pointerEvents = 'all';
            signupRedirect.style.pointerEvents = 'all';
        }, 3000);

    }

}