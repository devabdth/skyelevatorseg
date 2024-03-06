let username;
window.onload= ()=> {
	document.querySelector('section#entry #form #password-field').style.display= 'none';
	document.querySelector('section#entry #form #repassword-field').style.display= 'none';
	const submit= document.querySelector('#form .main-button');
	submit.onclick= stepOne;
}

const stepOne= async ()=> {
	const statusMsg= document.querySelector('#form #status')
	const submit= document.querySelector('#form .main-button');
	const usernameField= document.querySelector('section#entry #form #username-field');
	if (usernameField.value.trim().length < 8 || usernameField.value.toUpperCase().length > 32) {
		usernameField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter valid username!';
		return;
	}

	usernameField.style.border= 'none';
	statusMsg.innerHTML= 'Loading...';
	submit.style.pointerEvents= 'none';


	try {
		const res= await fetch(
			'./', {
				method: 'PATCH',
				body: JSON.stringify({'username': usernameField.value.trim(), 'mode': 'email'}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		switch(res.status) {
			case 200:
				statusMsg.innerHTML= '';
				usernameField.style.display= 'none';
				submit.onclick= stepTwo;
				username= usernameField.value.trim();
				document.querySelector('section#entry #form #password-field').style.display= 'flex';
				break;
			case 403:
				statusMsg.innerHTML= 'Complete your registration first!'
				usernameField.style.display= 'none';
				submit.onclick= stepThree;
				username= usernameField.value.trim();
				document.querySelector('section#entry #form #password-field').style.display= 'flex';
				document.querySelector('section#entry #form #repassword-field').style.display= 'flex';
				break;
			case 404:
				statusMsg.innerHTML= 'Admin not found!';
				usernameField.style.border= '2px red solid';
				break;
			case 500:
			default:
				statusMsg.innerHTML= 'Something went wrong!';
				break;
		}
		submit.style.pointerEvents= 'all';
	} catch (e) {
		console.log(e)
		statusMsg.innerHTML= 'Something went wrong!';
		submit.style.pointerEvents= 'all';
	}

}

const stepTwo= async ()=> {
	const statusMsg= document.querySelector('#form #status')
	const submit= document.querySelector('#form .main-button');
	const passwordField= document.querySelector('section#entry #form #password-field');
	if (passwordField.value.trim().length < 8 || passwordField.value.toUpperCase().length > 32) {
		passwordField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter valid password!';
		return;
	}

	passwordField.style.border= 'none';
	statusMsg.innerHTML= 'Loading...';
	submit.style.pointerEvents= 'none';

	try {
		const res= await fetch(
			'./', {
				method: 'PATCH', 
				body: JSON.stringify({
					mode: 'auth',
					username: username,
					password: passwordField.value.trim(),
				}),
				headers: {
					'Content-Type': 'application/json',
				}
			}
		);
		if (res.status == 200) {
			window.open('../', '_self');
			return;
		}

		if (res.status == 400) {
			passwordField.style.border= '2px red solid';
			statusMsg.innerHTML= 'Wrong Password!';
			submit.style.pointerEvents= 'all';			
			return;
		}

	} catch (e) {
		console.log(e);
		passwordField.style.border= 'none';
		statusMsg.innerHTML= 'Something went wrong!';
		submit.style.pointerEvents= 'all';
	}
}

const stepThree= async ()=> {
	const statusMsg= document.querySelector('#form #status')
	const submit= document.querySelector('#form .main-button');
	const passwordField= document.querySelector('section#entry #form #password-field');
	const repasswordField= document.querySelector('section#entry #form #repassword-field');
	if (passwordField.value.trim().length < 8 || passwordField.value.toUpperCase().length > 32) {
		passwordField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Enter valid password!';
		return;
	}

	if (passwordField.value.trim() !== repasswordField.value.trim()) {
		passwordField.style.border= '2px red solid';
		repasswordField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Passwords Missmatched!';
		return;

	}

	passwordField.style.border= 'none';
	repasswordField.style.border= 'none';
	statusMsg.innerHTML= 'Loading...';
	submit.style.pointerEvents= 'none';

	try {
		const res= await fetch(
			'./', {
				method: 'PATCH', 
				body: JSON.stringify({
					mode: 'reg',
					username: username,
					password: passwordField.value.trim(),
				}),
				headers: {
					'Content-Type': 'application/json',
				}
			}
		);
		if (res.status == 200) {
			window.open('./', '_self');
			return;
		}

		passwordField.style.border= '2px red solid';
		repasswordField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Something went wrong!';
		submit.style.pointerEvents= 'all';
	} catch (e) {
		console.log(e);
		passwordField.style.border= '2px red solid';
		repasswordField.style.border= '2px red solid';
		statusMsg.innerHTML= 'Something went wrong!';
		submit.style.pointerEvents= 'all';

	}

}