
let selectedAccess;
const openAdminsFormDialog = (mode, adminData) => {
	const submit = document.querySelector('.form-dialog button.main-button#submit');
	const accessesTiles = document.querySelectorAll('.access-tile');
	for (let tile of accessesTiles) {
		tile.onclick = () => {
			if (tile.classList.contains('active')) {
				tile.classList.remove('active');
				selectedAccess.splice(selectedAccess.indexOf(tile.id.toString()), 1);
				return;
			}
			tile.classList.add('active');
			selectedAccess.push(tile.id.toString());
		}
	}
	switch (mode) {
		default:
		case 'CREATE':
			selectedAccess = [];
			document.querySelector('.form-dialog#admins-from h2').innerHTML = 'Create';
			submit.onclick = adminCreate;
			break;
		case 'EDIT':
			document.querySelector('.form-dialog#admins-from .body input.single-line-field#username').value = adminData['username'];
			document.querySelector('.form-dialog#admins-from .body input.single-line-field#name').value = adminData['name'];
			document.querySelector('.form-dialog#admins-from .body input.single-line-field#email').value = adminData['email'];
			document.querySelector('.form-dialog#admins-from h2').innerHTML = 'Edit';
			selectedAccess = adminData['accesses'];
			for (let accessTile of accessesTiles) {
				if (selectedAccess.includes(accessTile.id)) accessTile.classList.add('active');
			}
			submit.onclick = () => { adminUpdate(adminData['id']) };
			break;
	}

	document.querySelector('.form-dialog-overlay#admins-from').style.display = 'flex';
	document.querySelector('.form-dialog#admins-from').style.display = 'flex';
}

const adminUpdate = async (adminId) => {
	const statusMsg = document.querySelector('.form-dialog #status-msg');
	const submit = document.querySelector('.form-dialog button.main-button#submit');
	const clear = document.querySelector('.form-dialog button.shadow-button#clear');
	const cancel = document.querySelector('.form-dialog button.shadow-button#cancel');
	try {
		const resValidation = adminsFormValidator();
		if (resValidation === undefined) return;
		resValidation.id = adminId;

		const res = await fetch('./', {
			method: 'PATCH',
			body: JSON.stringify(resValidation),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status === 200) {
			window.open('./', '_self');
			return;
		}

		statusMsg.innerHTML = 'Try again later!';
		submit.innerHTML = 'Failed';
		submit.style.pointerEvents = 'none';
		clear.style.pointerEvents = 'none';
		cancel.style.pointerEvents = 'none';
		setTimeout(() => {
			submit.innerHTML = 'Submit';
			clear.style.pointerEvents = 'all';
			cancel.style.pointerEvents = 'all';
			submit.style.pointerEvents = 'all';
		}, 3000);

	} catch (e) {
		statusMsg.innerHTML = 'Try again later!';
		submit.innerHTML = 'Failed';
		submit.style.pointerEvents = 'none';
		clear.style.pointerEvents = 'none';
		cancel.style.pointerEvents = 'none';
		setTimeout(() => {
			submit.innerHTML = 'Submit';
			clear.style.pointerEvents = 'all';
			cancel.style.pointerEvents = 'all';
			submit.style.pointerEvents = 'all';
		}, 3000);
	}

}

const adminCreate = async () => {
	const statusMsg = document.querySelector('.form-dialog #status-msg');
	const submit = document.querySelector('.form-dialog button.main-button#submit');
	const clear = document.querySelector('.form-dialog button.shadow-button#clear');
	const cancel = document.querySelector('.form-dialog button.shadow-button#cancel');
	try {
		const resValidation = adminsFormValidator();
		if (resValidation === undefined) return;

		const res = await fetch('./', {
			method: 'POST',
			body: JSON.stringify(resValidation),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.status === 201) {
			window.open('./', '_self');
			return;
		}

		statusMsg.innerHTML = 'Try again later!';
		submit.innerHTML = 'Failed';
		submit.style.pointerEvents = 'none';
		clear.style.pointerEvents = 'none';
		cancel.style.pointerEvents = 'none';
		setTimeout(() => {
			submit.innerHTML = 'Submit';
			clear.style.pointerEvents = 'all';
			cancel.style.pointerEvents = 'all';
			submit.style.pointerEvents = 'all';
		}, 3000);

	} catch (e) {
		statusMsg.innerHTML = 'Try again later!';
		submit.innerHTML = 'Failed';
		submit.style.pointerEvents = 'none';
		clear.style.pointerEvents = 'none';
		cancel.style.pointerEvents = 'none';
		setTimeout(() => {
			submit.innerHTML = 'Submit';
			clear.style.pointerEvents = 'all';
			cancel.style.pointerEvents = 'all';
			submit.style.pointerEvents = 'all';
		}, 3000);
	}
}

const adminsFormValidator = () => {
	const statusMsg = document.querySelector('.form-dialog .options #status-msg');
	const username = document.querySelector('.form-dialog .body input.single-line-field#username');
	const name = document.querySelector('.form-dialog .body input.single-line-field#name');
	const email = document.querySelector('.form-dialog .body input.single-line-field#email');
	if (username.value.trim().length < 8) {
		statusMsg.innerHTML = 'Enter valid username!';
		username.style.border = '2px solid red';
		return;
	}
	statusMsg.innerHTML = '';
	username.style.border = 'none';


	if (name.value.trim().length < 8) {
		statusMsg.innerHTML = 'Enter valid name!';
		name.style.border = '2px solid red';
		return;
	}
	statusMsg.innerHTML = '';
	name.style.border = 'none';

	const re = `/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i`;
	if (email.value.trim().length < 8 || String(email.value.trim()).toLowerCase().match(re)) {
		statusMsg.innerHTML = 'Enter valid email!';
		email.style.border = '2px solid red';
		return;
	}
	statusMsg.innerHTML = '';
	email.style.border = 'none';

	if (selectedAccess === undefined || (selectedAccess ?? []).length === 0) {
		statusMsg.innerHTML = 'Select admin access!';
		return
	}
	statusMsg.innerHTML = '';
	return {
		username: username.value.trim(),
		name: name.value.trim(),
		email: email.value.trim(),
		accesses: selectedAccess,
	}
}

const closeAdminFormDialog = () => {
	document.querySelector('.form-dialog-overlay#admins-from').style.display = 'none';
	document.querySelector('.form-dialog#admins-from').style.display = 'none';

}

const closeConfirmationDialog = () => {
	document.querySelector('#confirmation-dialog').style.display = 'none';
	document.querySelector('#confirmation-dialog-overlay').style.display = 'none';
}

const openConfirmationDialog = (props) => {
	const dialogTitle = document.querySelector('#confirmation-dialog .header h2');
	const dialogText = document.querySelector('#confirmation-dialog .body p');
	const passwordField = document.querySelector('#confirmation-dialog .body input');
	console.log(passwordField)
	const submit = document.querySelector('#confirmation-dialog .options button.main-button');
	const cancel = document.querySelector('#confirmation-dialog .options button.shadow-button');
	const statusMsg = document.querySelector('#confirmation-dialog .options p#status-msg');
	switch (props.mode) {
		default:
		case 'suspense':
			dialogTitle.innerHTML = 'Suspense Admin';
			dialogText.innerHTML = `Are you sure you want to suspense (<span style='font-weight: 900'>${props.admin.name}</span>)?<br>Suspensing an admin will disallow him from doing any action on the admin panel!`;
			submit.onclick = async () => {
				if (passwordField.value.trim().length < 8) {
					statusMsg.innerHTML = 'Enter valid password!';
					passwordField.style.border = '2px red solid';
					return;
				}
				statusMsg.innerHTML = 'Loading...';
				passwordField.style.border = 'none';
				try {
					const res = await fetch('./suspense/', {
						method: 'PATCH',
						body: JSON.stringify({
							password: passwordField.value.trim(),
							adminId: props.admin.id,
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						window.open('./', '_self');
						return;
					}

					if (res.status === 401) {
						statusMsg.innerHTML = 'Wrong Password!';
						passwordField.style.border = '2px red solid';
						return;
					}

					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					submit.style.pointerEvents = 'none';
					cancel.style.pointerEvents = 'none';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						cancel.style.pointerEvents = 'all';
					}, 3000);

				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					submit.style.pointerEvents = 'none';
					cancel.style.pointerEvents = 'none';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						cancel.style.pointerEvents = 'all';
					}, 3000);
				}
			}


			break;
		case 'activate':
			dialogTitle.innerHTML = 'Activate Admin';
			dialogText.innerHTML = `Are you sure you want to activate (<span style='font-weight: 900'>${props.admin.name}</span>)?<br>Activating an admin account will allow him to do any action on the admin panel with the accesses he has!`;
			submit.onclick = async () => {
				if (passwordField.value.trim().length < 8) {
					statusMsg.innerHTML = 'Enter valid password!';
					passwordField.style.border = '2px red solid';
					return;
				}
				statusMsg.innerHTML = 'Loading...';
				passwordField.style.border = 'none';
				try {
					const res = await fetch('./activate/', {
						method: 'PATCH',
						body: JSON.stringify({
							password: passwordField.value.trim(),
							adminId: props.admin.id,
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						window.open('./', '_self');
						return;
					}

					if (res.status === 401) {
						statusMsg.innerHTML = 'Wrong Password!';
						passwordField.style.border = '2px red solid';
						return;
					}

					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					submit.style.pointerEvents = 'none';
					cancel.style.pointerEvents = 'none';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						cancel.style.pointerEvents = 'all';
					}, 3000);

				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					submit.style.pointerEvents = 'none';
					cancel.style.pointerEvents = 'none';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						cancel.style.pointerEvents = 'all';
					}, 3000);
				}
			}


			break;
		case 'delete':
			dialogTitle.innerHTML = 'Delete Admin';
			dialogText.innerHTML = `Are you sure you want to delete (<span style='font-weight: 900'>${props.admin.name}</span>)?<br>Deleting an admin will remove of all data belongs to him!`;
			submit.onclick = async () => {
				if (passwordField.value.trim().length < 8) {
					statusMsg.innerHTML = 'Enter valid password!';
					passwordField.style.border = '2px red solid';
					return;
				}
				statusMsg.innerHTML = 'Loading...';
				passwordField.style.border = 'none';
				try {
					const res = await fetch('./', {
						method: 'DELETE',
						body: JSON.stringify({
							password: passwordField.value.trim(),
							adminId: props.admin.id,
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						window.open('./', '_self');
						return;
					}

					if (res.status === 401) {
						statusMsg.innerHTML = 'Wrong Password!';
						passwordField.style.border = '2px red solid';
						return;
					}

					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					submit.style.pointerEvents = 'none';
					cancel.style.pointerEvents = 'none';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						cancel.style.pointerEvents = 'all';
					}, 3000);

				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					submit.style.pointerEvents = 'none';
					cancel.style.pointerEvents = 'none';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						cancel.style.pointerEvents = 'all';
					}, 3000);
				}
			}
			break;

	}
	document.querySelector('#confirmation-dialog').style.display = 'flex';
	document.querySelector('#confirmation-dialog-overlay').style.display = 'flex';
}
