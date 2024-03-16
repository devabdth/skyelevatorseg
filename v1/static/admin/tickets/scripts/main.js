const toggleFragment= (element) => {
	document.querySelector('div.fragment-controller.active').classList.remove('active');
	document.querySelector('div.fragment.active').classList.remove('active');

	element.classList.add('active');
	document.querySelector(`div.fragment#${element.id}`).classList.add('active');

}

const toggleTicketRow = (element) => {
    const collapse = element.querySelector('.ticket-row-collapsable');
    element.style.backgroundColor = collapse.classList.contains('active') ? 'transparent' : 'rgba(0, 0, 0, 0.05)';
    collapse.classList.toggle('active');
}


const openArchiveTicket= (ticketId, mode)=> {
    document.querySelector('div.confirmation-dialog-overlay#archive-ticket').style.display='flex';

    const form= document.querySelector('div.confirmation-dialog#archive-ticket');
    form.querySelector('button.main-button').onclick= ()=> {
    	archiveTicket(ticketId,mode);
    }
    form.style.display= 'flex';
}

const closeArchiveTicket= ()=> {
    document.querySelector('div.confirmation-dialog-overlay#archive-ticket').style.display='none';

    const form= document.querySelector('div.confirmation-dialog#archive-ticket');
    form.style.display= 'none';
    form.querySelector('input.single-line-field').value= '';
}

const archiveTicket= async (ticketId, mode)=> {
    const form= document.querySelector('div.confirmation-dialog#archive-ticket');
    const passwordField= form.querySelector('input.single-line-field');
    const submitBtn= form.querySelector('button.main-button');
    const cancelBtn= form.querySelector('button.shadow-button');
    const statusMsg= form.querySelector('p.status-msg');

    if (passwordField.value.trim().length < 8) {
        statusMsg.innerHTML= 'Enter a Valid Password!';
        passwordField.style.border= '2px red solid';
        return;
    }
    passwordField.style.border= 'none';
    statusMsg.innerHTML= '';

    try {
            submitBtn.innerHTML= 'Loading';
            statusMsg.innerHTML= 'Archiving Ticket!';
            submitBtn.style.pointerEvents= 'none';
            submitBtn.style.opacity= '0.5';
            cancelBtn.style.pointerEvents= 'none';
            cancelBtn.style.opacity= '0.5';
        const res= await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({password: passwordField.value.trim(), ticket: ticketId, mode: mode}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            submitBtn.innerHTML= 'Success';
            statusMsg.innerHTML= 'Ticket Archived! Fetching Data...';
            passwordField.value= '';
            setTimeout(()=> {
            	window.open('./', '_self')
            }, 2500);
            return;
        }

        if (res.status === 403) {
            statusMsg.innerHTML= 'Wrong Password!';
            passwordField.style.border= '2px red solid';
            submitBtn.innerHTML= 'Submit';
            submitBtn.style.pointerEvents= 'all';
            submitBtn.style.opacity= '1';
            cancelBtn.style.pointerEvents= 'all';
            cancelBtn.style.opacity= '1';            
            return;
        }
        submitBtn.innerHTML= 'Failed!';
        statusMsg.innerHTML= 'Try Again Later!';
        setTimeout(()=> {
        statusMsg.innerHTML= '';
        submitBtn.innerHTML= 'Submit';
        submitBtn.style.pointerEvents= 'all';
        submitBtn.style.opacity= '1';
        cancelBtn.style.pointerEvents= 'all';
        cancelBtn.style.opacity= '1';
        }, 5000);
    } catch(e) {
        console.log(e);
        submitBtn.innerHTML= 'Failed!';
        statusMsg.innerHTML= 'Try Again Later!';
        setTimeout(()=> {
        submitBtn.innerHTML= '';
            submitBtn.innerHTML= 'Submit';
            submitBtn.style.pointerEvents= 'all';
            submitBtn.style.opacity= '1';
            cancelBtn.style.pointerEvents= 'all';
            cancelBtn.style.opacity= '1';
        }, 5000);
    }


}