let notificationRecipients, attachments;
const toggleUserRow = (element) => {
    const collapse = element.querySelector(".user-row-collapsable");
    collapse.classList.toggle('active');
}

const openUserNotificationDialog= (allUsers, customRecipent) => {
    notificationRecipients= [];
    attachments= [];
    document.querySelector('.form-dialog#user-notification-dialog').style.display= 'flex';
    document.querySelector('.form-dialog-overlay#user-notification-dialog').style.display= 'flex';

    if (customRecipent !== undefined) {
        document.querySelector('div.form-dialog#user-notification-dialog').querySelector('button.main-button#recipients-dropdown').style.display= 'none'
        const rows= document.querySelector('div.form-dialog div.body #recipients');

        const row= document.createElement('div');
        row.classList.add('recipient-row');
        row.setAttribute('id', `rr-${customRecipent.id.substring(0, 4)}${customRecipent.id.substring(customRecipent.id.length-4, customRecipent.id.length)}`);
        console.log(customRecipent)
        row.innerHTML= `
        <p class='recipient-data'>${customRecipent.name === undefined ? (customRecipent.fname + ' ' + customRecipent.lname) : customRecipent.name} <span>(${customRecipent.email}, ${customRecipent.phone_number})</span></p>
        `;

        notificationRecipients.push(customRecipent)
        rows.appendChild(row);
        updateRecipientsCount();
        
    };
    document.querySelector('.form-dialog#user-notification-dialog div.body div.actions button.shadow-button#clear-reciepeints-data').onclick= clearRecipeintsList;
    document.querySelector('.form-dialog#user-notification-dialog div.body div.actions button.shadow-button#select-all-reciepeints').onclick= () => { selectAllRecipeints(allUsers) };
    updateRecipientsCount();    
}

const resetUserNotificationDialog= ()=> {
    document.querySelector('div.form-dialog div.body #recipients').innerHTML= '';
    document.querySelector('div.form-dialog div.body input.single-line-field#objective-field').value= '';
    document.querySelector('div.form-dialog div.body textarea').value= '';
    clearRecipeintsList();
    clearAttachmentsList();
    updateRecipientsCount();    
    attachments= [];
    notificationRecipients= [];
}

const closeUserNotificationDialog= () => {
    resetUserNotificationDialog();
    document.querySelector('.form-dialog#user-notification-dialog').style.display= 'none';
    document.querySelector('.form-dialog-overlay#user-notification-dialog').style.display= 'none';
    updateRecipientsCount();    
    notificationRecipients= undefined;
    attachments= undefined;
}

function toggleRecipientsDropdown() {
  document.querySelector("div.filter-dropdown-content#recipients-dropdown").classList.toggle("show");
}

function recipientsFilterFunction() {
    try {
      var input, filter, ul, li, a, i;
      input = document.querySelector("div.filter-dropdown-content#recipients-dropdown input.single-line-field");
      filter = input.value.toUpperCase();
      div = document.querySelector("div.filter-dropdown-content#recipients-dropdown");
      a = div.getElementsByTagName("button");
      for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
        }
    } catch (e) {
        console.log(e)
    }
}

const updateRecipientsCount= () => {
    document.querySelector('div.form-dialog div.body label#recipients-count').innerHTML= `Recipients (${notificationRecipients.length})`;
}

const pickAttachment= ()=> {
    const form= document.querySelector('div.form-dialog#user-notification-dialog');
    const statusMsg= form.querySelector('div.options p.status-msg');    
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "*/*");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            if (attachments.filter(attachment => attachment.name === file_.name).length !== 0) {
                statusMsg.innerHTML= 'File Already Selected!';
                setTimeout(()=> {
                    statusMsg.innerHTML= '';
                }, 3000);
                return
            }
            attachments.push(file_);
            modifyAttachmentsDisplay();
        }
        reader.readAsDataURL(file_)
    }
    input.click();    
}

const deleteAttachment= (attachmentName) => {
    const attachment= attachments.filter(attachment => attachmentName === attachment.name);
    if (attachment.length === 0) return;
    attachments.splice(attachment[0], 1);
    modifyAttachmentsDisplay();
}

const clearAttachmentsList= ()=> {
    attachments= [];
    modifyAttachmentsDisplay();
}

const modifyAttachmentsDisplay= () => {
    const attachmentsDisplay= document.querySelector('div.form-dialog#user-notification-dialog div.body div#attachments');
    const attachmentsCount= document.querySelector('div.form-dialog#user-notification-dialog div.body label#attachments-count');
    attachmentsDisplay.innerHTML= '';
    for (let attachment of attachments) {
        attachmentsDisplay.innerHTML+= `
        <div class='attachment-row' id='ar-${attachment.name.substring(0, 4)}${attachment.name.substring(attachment.name.length-4, attachment.name.length)}'>
            <p class='attachment-name'>${attachment.name.length > 14 ? attachment.name.substring(0, 6)+'...'+attachment.name.substring(attachment.name.length-6, attachment.name.length) : attachment.name}</p>
            <div class='action' onclick='deleteAttachment("${attachment.name}")'><i class="fa-solid fa-close"></i></div>
        </div>
        `;
    }
    attachmentsCount.innerHTML= `Attachments (${attachments.length})`;
}

const pickRecipient= (props)=> {
    if (document.querySelector("div.filter-dropdown-content#recipients-dropdown").classList.contains("show"))  document.querySelector("div.filter-dropdown-content#recipients-dropdown").classList.toggle("show");
    const statusMsg= document.querySelector('div.form-dialog div.options p.status-msg')
    if ((notificationRecipients.filter((e)=> e.email === props.email && e.id === props.id)).length !== 0) {
        statusMsg.innerHTML= 'Recipient already selected!';
        return;
    }

    const rows= document.querySelector('div.form-dialog div.body #recipients');
    
    const row= document.createElement('div');
    row.classList.add('recipient-row');
    row.setAttribute('id', `rr-${props.id.substring(0, 4)}${props.id.substring(props.id.length-4, props.id.length)}`);
    row.innerHTML= `
    <p class='recipient-data'>${props.name} <span>(${props.email}, ${props.phone_number})</span></p>
    <div class="action" onclick="deleteRecipient({email: '${props.email}', id: '${props.id}'});"><i class="fa-solid fa-close"></i></div>
    `;

    notificationRecipients.push(props)
    rows.appendChild(row);
    statusMsg.innerHTML= '';
    updateRecipientsCount();
}

const clearRecipeintsList= ()=> {
    notificationRecipients= [];
    const rows= document.querySelector('div.form-dialog div.body #recipients').innerHTML= '';
    updateRecipientsCount();
}

const selectAllRecipeints= (usersList)=> {
    for (let user of usersList) {
        pickRecipient({
            name: user.name,
            email: user.email,
            id: user.id,
            phone_number: user.phone_number
        })
    }
    updateRecipientsCount();    
}

const deleteRecipient= (props)=> {
    const rows= document.querySelector('div.form-dialog div.body #recipients');

    const row= document.querySelector(`div.recipient-row#rr-${props.id.substring(0, 4)}${props.id.substring(props.id.length-4, props.id.length)}`);
    rows.removeChild(row);

    const snippet= notificationRecipients.filter((e)=> e.email === props.email && e.id === props.id)[0];
    notificationRecipients.splice(snippet, 1);
    updateRecipientsCount();    
}

const sendNotificationSubmission= (recipients, msg, objective) => {
    const form= document.querySelector('div.form-dialog#user-notification-dialog');
    const objectiveField= form.querySelector('input.single-line-field#objective-field');
    const messageField= form.querySelector('textarea.mutli-line-field#message-field');
    const recipientsBtn= form.querySelector('button.main-button#recipients-dropdown');
    const submitBtn= form.querySelector('div.options button.main-button');
    const closeBtn= form.querySelector('div.options button.shadow-button#close');
    const resetBtn= form.querySelector('div.options button.shadow-button#reset');
    const statusMsg= form.querySelector('div.options p.status-msg');

    if (objectiveField.value.trim().length < 16) {
        statusMsg.innerHTML= 'Enter Valid Objective <span>(Objective Must be 16-letters-minmum!)</span>';
        return;
    }
    statusMsg.innerHTML= '';

    if (messageField.value.trim().length < 64 && attachments.length === 0) {
        statusMsg.innerHTML= 'Enter Valid Message <span>(Objective Must be 64-letters-minmum or at least have one attachment!)</span>';
        return;
    }
    statusMsg.innerHTML= '';

    if (notificationRecipients.length === 0) {
        statusMsg.innerHTML= 'Select at least one recipient!';
        return;
    }
    statusMsg.innerHTML= '';

    let finalNotificationRecipients= notificationRecipients;
    finalNotificationRecipients.forEach((recipient) => {    
        let snippet= {name: recipient.name, email: recipient.email};
        return snippet
    })

    const payload= {
        recipients: finalNotificationRecipients,
        objective: objectiveField.value.trim(),
        message: messageField.value.trim(),
    }

    try {
        statusMsg.innerHTML= 'Sending Multiple Notifications may take up to 10 minutes!';
        submitBtn.innerHTML= 'Loading...';
        submitBtn.style.pointerEvents= 'none';
        submitBtn.style.opacity= '0.5';
        closeBtn.style.pointerEvents= 'none';
        closeBtn.style.opacity= '0.5';
        resetBtn.style.pointerEvents= 'none';
        resetBtn.style.opacity= '0.5';
        const xhr= new XMLHttpRequest();

        const notification= new FormData();
        notification.append('data', JSON.stringify(payload));
        for (let attachment of attachments) {
            notification.append(attachment.name, attachment);
        }

        xhr.onload= ()=> {
            if (xhr.status === 201) {
                statusMsg.innerHTML= 'Redirecting you...'
                submitBtn.innerHTML= 'Success'
                setTimeout(()=> {
                    window.open('./', '_self');
                }, 3000);
                return;
                statusMsg.innerHTML= 'Failed, Try Again Later!';
                submitBtn.innerHTML= 'Failed!';
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

        xhr.open('POST', './notification/');
        xhr.send(notification);
    } catch (e) {
        console.log(e);
        statusMsg.innerHTML= 'Failed, Try Again Later!';
        submitBtn.innerHTML= 'Failed!';
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

const openExtractUsersReport= ()=> {
    document.querySelector('div.confirmation-dialog-overlay#extract-users-report').style.display='flex';

    const form= document.querySelector('div.confirmation-dialog#extract-users-report');
    form.style.display= 'flex';
}

const closeExtractUsersReport= ()=> {
    document.querySelector('div.confirmation-dialog-overlay#extract-users-report').style.display='none';

    const form= document.querySelector('div.confirmation-dialog#extract-users-report');
    form.style.display= 'none';
    form.querySelector('input.single-line-field').value= '';;
}

const fetchUsersReport= async ()=> {
    const form= document.querySelector('div.confirmation-dialog#extract-users-report');
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
            statusMsg.innerHTML= 'Generating Your Report!!';
            submitBtn.style.pointerEvents= 'none';
            submitBtn.style.opacity= '0.5';
            cancelBtn.style.pointerEvents= 'none';
            cancelBtn.style.opacity= '0.5';
        const res= await fetch('./report/', {
            method: 'PATCH',
            body: JSON.stringify({password: passwordField.value.trim()}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            submitBtn.innerHTML= 'Success';
            statusMsg.innerHTML= 'Report Downloaded!';
            passwordField.value= '';
            setTimeout(()=> {
            statusMsg.innerHTML= '';
            submitBtn.innerHTML= 'Submit';
            submitBtn.style.pointerEvents= 'all';
            submitBtn.style.opacity= '1';
            cancelBtn.style.pointerEvents= 'all';
            cancelBtn.style.opacity= '1';
            }, 5000);
            const url = URL.createObjectURL(await res.blob());
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `Users Report - ${new Date().toString().split(' G')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
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
        console.log(res.status)
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