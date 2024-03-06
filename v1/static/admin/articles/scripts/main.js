const toggleFragment= (element) => {
	document.querySelector('div.fragment-controller.active').classList.remove('active');
	document.querySelector('div.fragment.active').classList.remove('active');

	element.classList.add('active');
	document.querySelector(`div.fragment#${element.id}`).classList.add('active');

}



let articles, drafts, categories, classifications, getClassificationById;
let updateArticleTags, updatingArticleSectionsCovers, updatingArticleSectionsAudios, updatingArticleSectionsVideos, updatingArticleAudio,updatingArticleCover;

const initData = (props) => {
    articles = props.articles;
    drafts = props.drafts;
}

const initUI = (customArticles, customDrafts) => {
    if (!articles && !drafts) return;
    const articlesTable = document.querySelector('div.fragment#articles-fragment div.articles-rows');
    const draftsTable = document.querySelector('div.fragment#drafts-fragment div.articles-rows');

    for (let article of (customArticles ?? articles)) {
        const articleId = article.id;
        const row = document.createElement('div');
        row.classList.add('article-row');
        row.setAttribute('id', articleId);
        row.ondblclick = () => { toggleArticleRow(row) }

        row.innerHTML = `
        <div class="article-row-header">
            <div
            class="article-row-cover"
            style="background-image: url(/assets/articles/covers/${articleId}/);"
            ></div>
            <div class="article-row-code">${articleId.substring(0, 12)}</div>
            <div class="article-row-title">
            ${article.title['EN'].substring(0, 25)}...<br>
            ${article.title['AR'].substring(0, 25)}...</div>
	        <div class="article-row-views">${article.views}</div>
	        <div class="article-row-comments">${article.comments.length}</div>
	        <div class="article-row-saves">${article.saves}</div>
	        <div class="article-row-likes">${article.ratings.reduce((acc, current) => {return acc + current}, 0) / article.ratings.length === 0 ? 1 : article.ratings.length} (${article.ratings.length} Ratings)</div>          
        </div>    
        <div class="article-row-divider"></div>
        <div class="article-row-collapsable">
        <div class="article-row-collapsable-body">
            <div class="article-row-collapsable-cover" style="background-image: url(/assets/articles/covers/${articleId}/);" ></div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>English Name</label>
                    <h3 class="article-row-collapsable-article"> ${article.title['EN'].substring(0, 25)}...</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Arabic Name</label>
                    <h3 class="article-row-collapsable-article"> ${article.title['AR'].substring(0, 25)}...</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>English Short Brief</label>
                    <h3 class="article-row-collapsable-article"> ${article.short_brief['EN'].substring(0, 50)}...</h3>
                </div>
            </div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>Arabic Short Brief</label>
                    <h3 class="article-row-collapsable-article"> ${article.short_brief['AR'].substring(0, 50)}...</h3>
                </div>            
                <div class="article-row-collapsable-column-tile">
                    <label>Published in</label>
                    <h3 class="article-row-collapsable-article">${new Date(article.published_in).toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Tags</label>
                    <h3 class="article-row-collapsable-article">${article.tags.toString()}</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Audio Article</label>
                    <h3 class="article-row-collapsable-article">${article.record_available ? 'Available' : 'Unavailable'}</h3>
                </div>
            </div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>Views</label>
                    <h3 class="article-row-collapsable-article">${article.views} View/s</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Comments</label>
                    <h3 class="article-row-collapsable-article">${article.comments.length} Comment/s</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Read Time</label>
                    <h3 class="article-row-collapsable-article">${((Object.values(article.read_time).reduce((a, b) => a + b, 0)) / 60).toFixed(2)} Minute</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Average Read Time</label>
                    <h3 class="article-row-collapsable-article">${(((Object.values(article.read_time).reduce((a, b) => a + b, 0)) / 60) / Object.values(article.read_time).length).toFixed(2)} Minute/Section</h3>
                </div>
            </div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>Ratings</label>
                    <h3 class="article-row-collapsable-article">${article.ratings.length} Rating/s</h3>
                </div>                
                <div class="article-row-collapsable-column-tile">
                    <label>Saves</label>
                    <h3 class="article-row-collapsable-article">${article.saves} Save/s</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Actions</label>
                    <h3 class="article-row-collapsable-article">
                        <button class="shadow-button" style="color: red" onclick="openConfirmationDialog({submission: deleteArticle, target: '${articleId}', title: 'Delete Article', msg: 'Are you sure you want to delete this article <span>(${article.title['EN']})</span>?'})">Delete</button>&nbsp&nbsp
                        <button class="shadow-button" onclick='openEditDialog(${JSON.stringify(article)})'>Edit</button>
                    </h3>
                </div>
            </div>
        </div>    
        </div>    
        `;


        articlesTable.appendChild(row);

    }

    for (let article of (customDrafts ?? drafts)) {
        const articleId = article.id;
        const row = document.createElement('div');
        row.classList.add('article-row');
        row.setAttribute('id', article.id);
        row.ondblclick = () => { toggleArticleRow(row) }

        row.innerHTML = `
        <div class="article-row-header">
            <div
            class="article-row-cover"
            style="background-image: url(/assets/articles/covers/${article.id}/);"
            ></div>
            <div class="article-row-code">${article.id.substring(0, 12)}</div>
            <div class="article-row-title">
            ${article.title['EN'].substring(0, 25)}...<br>
            ${article.title['AR'].substring(0, 25)}...</div>
        </div>    
        <div class="article-row-divider"></div>
        <div class="article-row-collapsable">
        <div class="article-row-collapsable-body">
            <div class="article-row-collapsable-cover" style="background-image: url(/assets/articles/covers/${article.id}/);" ></div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>English Name</label>
                    <h3 class="article-row-collapsable-article"> ${article.title['EN'].substring(0, 25)}...</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Arabic Name</label>
                    <h3 class="article-row-collapsable-article"> ${article.title['AR'].substring(0, 25)}...</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>English Short Brief</label>
                    <h3 class="article-row-collapsable-article"> ${article.short_brief['EN'].substring(0, 50)}...</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Arabic Short Brief</label>
                    <h3 class="article-row-collapsable-article"> ${article.short_brief['AR'].substring(0, 50)}...</h3>
                </div>
            </div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>Tags</label>
                    <h3 class="article-row-collapsable-article">${article.tags.toString()}</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Audio Article</label>
                    <h3 class="article-row-collapsable-article">${article.record_available ? 'Available' : 'Unavailable'}</h3>
                </div>
            </div>
            <div class="article-row-collapsable-column">
                <div class="article-row-collapsable-column-tile">
                    <label>Published in</label>
                    <h3 class="article-row-collapsable-article">${new Date(article.published_in).toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</h3>
                </div>
                <div class="article-row-collapsable-column-tile">
                    <label>Actions</label>
                    <h3 class="article-row-collapsable-article">
                        <button class="shadow-button" style="color: red" onclick="openConfirmationDialog({submission: deleteArticle, target: '${articleId}', title: 'Delete Article', msg: 'Are you sure you want to delete this article <span>(${article.title['EN']})</span>?'})">Delete</button>&nbsp&nbsp
                        <button class="shadow-button" onclick='openEditDialog(${JSON.stringify(article)})'>Edit</button>&nbsp;&nbsp;
                        <button class="shadow-button" onclick="openConfirmationDialog({submission: publishArticle, target: '${articleId}', title: 'Publish Article', msg: 'Are you sure you want to publish this article <span>(${article.title['EN']})</span>?'})">Publish</button>
                    </h3>
                </div>
            </div>
        </div>    
        </div>    
        `;


        draftsTable.appendChild(row);

    }

}

const toggleArticleRow = (element) => {
    const collapse = element.childNodes[5];
    element.style.backgroundColor = collapse.classList.contains('active') ? 'transparent' : 'rgba(0, 0, 0, 0.05)';
    collapse.classList.toggle('active');
}


const openConfirmationDialog = (props) => {
    document.querySelector('div.msg-dialog#confirmation-dialog div.header h3').innerHTML = props.title;
    document.querySelector('div.msg-dialog#confirmation-dialog p').innerHTML = props.msg;
    document.querySelector('div.msg-dialog#confirmation-dialog div.options button.shadow-button#close').onclick = closeConfirmationDialog;
    document.querySelector('div.msg-dialog#confirmation-dialog div.options button.main-button#submit').onclick = () => { props.submission(props.target) };

    document.querySelector('div.msg-dialog#confirmation-dialog').style.display = 'flex';
    document.querySelector('div.msg-dialog-overlay#confirmation-dialog').style.display = 'flex';
}

const closeConfirmationDialog = () => {
    document.querySelector('div.msg-dialog#confirmation-dialog').style.display = 'none';
    document.querySelector('div.msg-dialog-overlay#confirmation-dialog').style.display = 'none';
}

const publishArticle = async (articleId) => {
    const submit = document.querySelector('div.msg-dialog#confirmation-dialog div.options button.main-button#submit');
    const close = document.querySelector('div.msg-dialog#confirmation-dialog div.options button.shadow-button#close');
    const statusMsg = document.querySelector('div.msg-dialog#confirmation-dialog div.options p.status-msg');

    try {
        statusMsg.innerHTML = 'Loading...';
        submit.style.pointerEvents = 'none';
        close.style.pointerEvents = 'none';
        const res = await fetch(`./publishDraft/?articleId=${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 201) {
            window.open('./', '_self');
            return;
        }

        statusMsg.innerHTML = 'Failed, Try again later!';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    } catch (e) {
        statusMsg.innerHTML = 'Failed, Try again later!';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    }
}

const deleteArticle = async (articleId) => {
    const submit = document.querySelector('div.msg-dialog#confirmation-dialog div.options button.main-button#submit');
    const close = document.querySelector('div.msg-dialog#confirmation-dialog div.options button.shadow-button#close');
    const statusMsg = document.querySelector('div.msg-dialog#confirmation-dialog div.options p.status-msg');

    try {
        statusMsg.innerHTML = 'Loading...';
        submit.style.pointerEvents = 'none';
        close.style.pointerEvents = 'none';
        const res = await fetch(`./?articleId=${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            window.open('./', '_self');
            return;
        }

        statusMsg.innerHTML = 'Failed, Try again later!';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    } catch (e) {
        statusMsg.innerHTML = 'Failed, Try again later!';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    }
}

const closeEditDialog = () => {
    document.querySelector('.form-dialog#edit-dialog .body').innerHTML = '';
    document.querySelector('.form-dialog-overlay#edit-dialog').style.display = 'none';
    document.querySelector('.form-dialog#edit-dialog').style.display = 'none';

}

const openEditDialog = (article) => {
    updatingArticleSectionsCovers = {}
    updatingArticleSectionsAudios = {}
    updatingArticleSectionsVideos = {}
    updatingArticleCover = 'Existed';

    for (let section of article.sections) {
        switch (section.attachment_type) {
            case 'IMAGE':
                updatingArticleSectionsCovers[section.id] = 'Existed';
                break;
            case 'VIDEO':
                updatingArticleSectionsVideos[section.id] = 'Existed';
                break;
            case 'IMAGE':
                updatingArticleSectionsAudios[section.id] = 'Existed';
                break;
        }
    }
    document.querySelector('.form-dialog#edit-dialog .body').innerHTML = `
        <div class="dialog-card" id="info">
          <h1>Article Info</h1>
          <div class="fields-row">
            <label for="en-title">English Title</label>
            <label for="ar-title">Arabic Title</label>
            <input
              type="text"
              class="single-line-field"
              id="en-title"
              value="${article.title['EN']}"
              placeholder="English Title"
            />
            <input
              type="text"
              class="single-line-field"
              value="${article.title['AR']}"
              id="ar-title"
              placeholder="Arabic Title"
            />
          </div>
          <div class="divider"></div>
          <div class="fields-row">
            <label for="en-short-brief">English Short Brief</label>
            <label for="ar-short-brief">Arabic Short Brief</label>
            <input
              type="text"
              class="single-line-field"
              value="${article.short_brief['EN']}"
              id="en-short-brief"
              placeholder="English Short Brief"
            />
            <input
              type="text"
              class="single-line-field"
              value="${article.short_brief['AR']}"
              id="ar-short-brief"
              placeholder="Arabic Short Brief"
            />
          </div>
          <div class="divider"></div>
          <label for="audio-selection">Audio Version</label>
          <div id="audio-selection">
            <h3>Pick File</h3>
            <p id="selected-audio-file"></p>
            <button class="main-button" onclick="selectUpdatingArticleAudioFile()">
              Select
            </button>
          </div>
          <div class="divider"></div>
          <label for="cover">Cover</label>
          <div
            class="image-picker"
            id="cover"
            style="background-image: url(/assets/articles/covers/${article.id}/) !important; background-size: cover"
            onclick="pickUpdatingArticleImage(this, {mode: 'COVER', coverSize: true})"
          ></div>
          <div class="divider"></div>
          <div class="fields-row">
            <label for="en-cover-msg">English Cover message</label>
            <label for="en-cover-msg">Arabic Cover message</label>
            <textarea
              name="en-cover-msg"
              id="en-cover-msg"
              cols="30"
              rows="10"
              class="mutli-line-field"
              placeholder="English attached message"
            >${article.cover_attached_msg['EN']}</textarea>
            <textarea
              name="ar-cover-msg"
              id="ar-cover-msg"
              cols="30"
              rows="10"
              class="mutli-line-field"
              placeholder="Arabic attached message"
            >${article.cover_attached_msg['AR']}</textarea>
          </div>
          <div class="divider"></div>
          <div class="updateArticleTags">
            <div class="header">
              <input
                type="name"
                name="tag"
                placeholder="Tag / Keyword"
                class="single-line-field"
                id="cat-updateArticleTags"
              />
              <button class="main-button" id="updateArticleTags-submit">Add</button>
            </div>
            <div class="body"></div>
          </div>
        </div>
    `;
    for (let section of article.sections) {
        console.log(section.audio_stop)
        const sectionCard = document.createElement('div');
        sectionCard.classList.add('section-form')
        sectionCard.classList.add('dialog-card')
        sectionCard.setAttribute('id', section.id);
        sectionCard.innerHTML += `
            <h2>Section ${article.sections.indexOf(section)}</h2>
            <div class="fields-row">
                <label>English Title</label>
                <label>Arabic Title</label>
                <input value="${section.title['EN']}" class="single-line-field" id="en-title" placeholder="English Title" />
                <input value="${section.title['AR']}" class="single-line-field" id="ar-title" placeholder="Arabic Title" />
            </div>
            <div class="fields-row">
                <label>English Subtitle</label>
                <label>Arabic Subtitle</label>
                <input value="${section.subtitle['EN']}" class="single-line-field" id="en-subtitle" placeholder="English Subtitle" />
                <input value="${section.subtitle['AR']}" class="single-line-field" id="ar-subtitle" placeholder="Arabic Subtitle" />
            </div>
            <div class="fields-row">
                <label>English Bio</label>
                <label>Arabic Bio</label>
                <textarea class="mutli-line-field" id="en-bio" placeholder="English Bio">${section.bio['EN']}</textarea>
                <textarea class="mutli-line-field" id="ar-bio" placeholder="Arabic Bio">${section.bio['AR']}</textarea>
            </div>
            <div class="fields-row">
                <label>Media Type</label>
                <label>Media</label>
                <div id="media-tiles">
                    <div class="media-tile active" id="no-media" onclick="selectUpdatingArticleMediaType(this.parentNode.parentNode, this, 'NO_MEDIA')">No Media</div>
                    <div class="media-tile" id="image" onclick="selectUpdatingArticleMediaType(this.parentNode.parentNode, this, 'IMAGE')">Image</div>
                    <div class="media-tile" id="audio" onclick="selectUpdatingArticleMediaType(this.parentNode.parentNode, this, 'AUDIO')">Audio</div>
                    <div class="media-tile" id="video" onclick="selectUpdatingArticleMediaType(this.parentNode.parentNode, this, 'VIDEO')">Video</div>
                </div>
                <div class="media-selector"></div>
            </div>
            <label>Audio Stop</label>
            <input value="${section.audio_stop}" type="number" class="single-line-field" id="audio-stop" placeholder="Audio Stop (seconds)" />
            <div class="fields-row">
                <label>English Media Message</label>
                <label>Arabic Media Message</label>
                <textarea class="mutli-line-field" id="en-media-message" placeholder="English Media Message">${section.attachement_msg['EN']}</textarea>
                <textarea class="mutli-line-field" id="ar-media-message" placeholder="Arabic Media Message">${section.attachement_msg['AR']}</textarea>
            </div>
            <div class="options">
                <button class="shadow-button" onclick="deleteSection(this.parentNode.parentNode)">Delete</button>
                <button class="main-button" onclick="updatingArticleValidateSection(this.parentNode.parentNode, true)">Check</button>
            </div>            
        `;
        document.querySelector('.form-dialog#edit-dialog .body').appendChild(sectionCard)
        if (section.attachment_type !== 'NO_MEDIA') {
            selectUpdatingArticleMediaType(
                sectionCard,
                sectionCard.querySelector(`.media-tile#${section.attachment_type.toLowerCase().replace('_', '-')}`),
                section.attachment_type,
                `url(/assets/articles/section/${section.attachment_type.toLowerCase()}/${section.id}/)`,
            );
        }
    }

    updateArticleTags = article.tags;
    for (let tag of article.tags) updatingArticleGenerateTagsTile(document.querySelector('.updateArticleTags .body'));
    const updateArticleTagsField = document.querySelector('.updateArticleTags .header input');
    const updateArticleTagsSubmit = document.querySelector('.updateArticleTags .header #updateArticleTags-submit');
    const updateArticleTagsContainer = document.querySelector('.updateArticleTags .body');
    updateArticleTagsSubmit.onclick = () => {

        if (updateArticleTagsField.value.trim().length === 0) {
            updateArticleTagsField.style.border = '1px red solid';
            return;
        }

        if ((updateArticleTags ?? []).includes(updateArticleTagsField.value.trim())) {
            updateArticleTagsField.style.border = '1px red solid';
            toast({ msg: 'Tag is already existed!' });
            return;
        }

        updateArticleTagsField.style.border = 'none';
        updateArticleTags.push(updateArticleTagsField.value.trim());
        updateArticleTagsField.value = '';
        updatingArticleGenerateTagsTile(updateArticleTagsContainer);
    }
    document.querySelector('.form-dialog#edit-dialog  .options button.main-button#submit').onclick = () => { updateArticle(article) };
    document.querySelector('.form-dialog-overlay#edit-dialog').style.display = 'flex';
    document.querySelector('.form-dialog#edit-dialog').style.display = 'flex';
}

const updatingArticleGenerateTagsTile = (container) => {
    container.innerHTML = '';

    for (let tag of updateArticleTags) {
        const tile = document.createElement('div');
        tile.classList.add('tag-tile');

        const tagText = document.createElement('p')
        tagText.innerHTML = tag;

        const closeOption = document.createElement('div');
        closeOption.innerHTML = 'x';
        closeOption.onclick = () => {
            updateArticleTags.splice(updateArticleTags.indexOf(tag), 0);
            container.removeChild(tile);
        }

        tile.appendChild(tagText);
        tile.appendChild(closeOption);
        container.appendChild(tile);
    }
}

const selectUpdatingArticleMediaType = (section, tile, type, initial) => {
    if (tile.classList.contains('active')) return;
    const activeTile = section.querySelector('.media-tile.active');
    if (activeTile != undefined) activeTile.classList.remove('active');
    const mediaSelector = section.querySelector('.media-selector');
    mediaSelector.innerHTML = '';
    delete updatingArticleSectionsCovers[section.parentNode.id];
    delete updatingArticleSectionsAudios[section.parentNode.id];
    delete updatingArticleSectionsVideos[section.parentNode.id];
    switch (type) {
        case 'NO_MEDIA':
            tile.classList.add('active');
            break;
        case 'IMAGE':
            tile.classList.add('active');
            const imagePicker = document.createElement('div');
            imagePicker.classList.add('image-picker');
            if (initial !== undefined) {
                imagePicker.style.backgroundImage = `${initial}`;
                imagePicker.style.backgroundSize = `cover`;
            }
            imagePicker.onclick = () => { pickUpdatingArticleImage(imagePicker, { mode: 'SECTION_COVER', sectionId: section.parentNode.id }) };
            mediaSelector.appendChild(imagePicker);
            break;
        case 'AUDIO':
            tile.classList.add('active');
            mediaSelector.innerHTML = `
            <p class="shadow-button" style="text-decoration: none"></p>
            <button class="shadow-button" onclick="selectUpdatingArticleSectionAudioFile(this.parentNode.parentNode.parentNode)">Pick Audio</button>
            `;
            break;
        case 'VIDEO':
            tile.classList.add('active');
            mediaSelector.innerHTML = `
            <p class="shadow-button" style="text-decoration: none"></p>
            <button class="shadow-button" onclick="selectUpdatingArticleSectionVideoFile(this.parentNode.parentNode.parentNode)">Pick Video</button>
            `;
            break;
    }
}

const selectUpdatingArticleAudioFile = () => {
    const fileNameDisplay = document.querySelector('#audio-selection #selected-audio-file');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp3,.aac");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            const passivePlayer = document.createElement('audio');
            passivePlayer.src = reader.result;
            passivePlayer.load();
            toast({ msg: 'Loading article\'s audio!' });
            setTimeout(() => {
                updatingArticleAudioDuratio = passivePlayer.duration;
                toast({ msg: 'Article\'s audio loaded successfully!' });
            }, 5000);
            updatingArticleAudio = file_;
            fileNameDisplay.innerHTML = file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name;
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}

const selectUpdatingArticleSectionAudioFile = (section) => {
    const fileNameDisplay = section.querySelector('.media-selector p');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp3,.aac");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            updatingArticleSectionsAudios[section.id] = file_;
            fileNameDisplay.innerHTML = 'Picked File: ' + (file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name);
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}


const selectUpdatingArticleSectionVideoFile = (section) => {
    const fileNameDisplay = section.querySelector('.media-selector p');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp4,.mpg,.mpeg,.m2v,.flv");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            updatingArticleSectionsVideos[section.id] = file_;
            fileNameDisplay.innerHTML = 'Picked File: ' + (file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name);
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}


const pickUpdatingArticleImage = (container, props) => {
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
            switch (props.mode) {
                case 'COVER':
                    updatingArticleCover = file_;
                    break;
                case 'SECTION_COVER':
                    updatingArticleSectionsCovers[props.sectionId] = file_;
                    break;
            }
        }
        reader.readAsDataURL(file_)
    }
    input.click();
}



const updatingArticleValidateSection = (container, wToast) => {
    let mediaType;
    const enTitleField = container.querySelector('input.single-line-field#en-title');
    const arTitleField = container.querySelector('input.single-line-field#ar-title');
    const enSubtitleField = container.querySelector('input.single-line-field#en-subtitle');
    const arSubtitleField = container.querySelector('input.single-line-field#ar-subtitle');
    const enBioField = container.querySelector('textarea.mutli-line-field#en-bio');
    const arBioField = container.querySelector('textarea.mutli-line-field#ar-bio');
    const enMediaMsgField = container.querySelector('textarea.mutli-line-field#en-media-message');
    const arMediaMsgField = container.querySelector('textarea.mutli-line-field#ar-media-message');
    const audioStopField = container.querySelector('input.single-line-field#audio-stop');
    const sectionName = container.querySelector('h2').innerHTML;
    const sectionId = container.id;
    const activeMediaTile = container.querySelector('.media-tile.active');


    if (enTitleField.value.trim().length < 8) {
        toast({ msg: sectionName + ': Enter a valid english title!' });
        enTitleField.style.border = '2px red solid';
        return;
    }
    enTitleField.style.border = 'none';

    if (arTitleField.value.trim().length < 8) {
        toast({ msg: sectionName + ': Enter a valid arabic title!' });
        arTitleField.style.border = '2px red solid';
        return;
    }
    arTitleField.style.border = 'none';


    if (enSubtitleField.value.trim().length > 8 || arSubtitleField.value.trim().length > 8) {
        if (enSubtitleField.value.trim().length < 8) {
            toast({ msg: sectionName + ': Enter a valid english cover message!' });
            enSubtitleField.style.border = '2px red solid';
            return;
        }
        enSubtitleField.style.border = 'none';

        if (arSubtitleField.value.trim().length < 8) {
            toast({ msg: sectionName + ': Enter a valid arabic cover message!' });
            arSubtitleField.style.border = '2px red solid';
            return;
        }
        arSubtitleField.style.border = 'none';
    } else {
        enSubtitleField.style.border = 'none';
        arSubtitleField.style.border = 'none';
    }


    if (enBioField.value.trim().length < 64) {
        toast({ msg: sectionName + ': Enter a valid english bio!' });
        enBioField.style.border = '2px red solid';
        return;
    }
    enBioField.style.border = 'none';

    if (arBioField.value.trim().length < 64) {
        toast({ msg: sectionName + ': Enter a valid arabic bio!' });
        arBioField.style.border = '2px red solid';
        return;
    }
    arBioField.style.border = 'none';

    if (activeMediaTile === undefined) {
        toast({ msg: sectionName + ': Select media type!' });
        return;
    }

    if (activeMediaTile.id !== 'no-media') {
        switch (activeMediaTile.id) {
            case 'image':
                if (updatingArticleSectionsCovers[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select image!' });
                    return;
                }
                mediaType = 'IMAGE';
                break;
            case 'video':
                if (updatingArticleSectionsVideos[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select video!' });
                    return;
                }
                mediaType = 'VIDEO';
                break;
            case 'audio':
                if (updatingArticleSectionsAudios[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select audio!' });
                    return;
                }
                mediaType = 'AUDIO';
                break;
        }
    } else {
        mediaType = 'NO_MEDIA';
    }

    if (updatingArticleAudio !== undefined) {
        let selectedDuration = (Number.parseInt(audioStopField.value.trim()));
        console.log(selectedDuration);
        if (selectedDuration === undefined || audioStopField.value.trim().length == 0 || (selectedDuration <= 0 || selectedDuration > updatingArticleAudioDuratio)) {
            toast({ msg: sectionName + ': Define a valid article audio stop!' });
            return;
        }
    }

    if (enMediaMsgField.value.trim().length > 8 || arMediaMsgField.value.trim().length > 8) {
        if (enMediaMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid english media message!' });
            enMediaMsgField.style.border = '2px red solid';
            return;
        }
        enMediaMsgField.style.border = 'none';

        if (arMediaMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid arabic media message!' });
            arMediaMsgField.style.border = '2px red solid';
            return;
        }
        arMediaMsgField.style.border = 'none';
    } else {
        enMediaMsgField.style.border = 'none';
        arMediaMsgField.style.border = 'none';
    }


    if (wToast) toast({ msg: sectionName + ': Section is completed!' });
    return {
        title: {
            EN: enTitleField.value.trim(),
            AR: arTitleField.value.trim(),
        },
        subtitle: {
            EN: enSubtitleField.value.trim(),
            AR: arSubtitleField.value.trim(),
        },
        bio: {
            EN: enBioField.value.trim(),
            AR: arBioField.value.trim(),
        },
        attachement_msg: {
            EN: enMediaMsgField.value.trim(),
            AR: arMediaMsgField.value.trim(),
        },
        attachment_type: mediaType,
        id: sectionId,
        audio_stop: Number.parseFloat(audioStopField.value.trim()),

    }


}


const updateArticle = async (article) => {

    const submit = document.querySelector('.form-dialog .options button.main-button');
    const close = document.querySelector('.form-dialog .options button.shadow-button');
    const statusMsg = document.querySelector('.form-dialog .options p#confirmation-status-msg');


    try {
        const validation = updatingArticleInfoFormValidation(article);
        if (validation === undefined) return;

        const sections = document.querySelectorAll('.dialog-card.section-form');
        if (!sections || sections.length === 0) {
            toast({ msg: 'Create at least one section!' });
            return;
        }

        let articleSctions = [];
        for (let section of sections) {
            let sectionValidation = updatingArticleValidateSection(section);
            if (sectionValidation === undefined) return;
            sectionValidation.id = section.id;
            sectionValidation.attached_ad_id = article.sections.filter(section_ => section_.id === section.id)[0].attached_ad_id;
            articleSctions.push(sectionValidation);
        }
        validation.sections = articleSctions;
        console.log(validation)

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('article', JSON.stringify(validation));
        for (let entry of Object.keys(updatingArticleSectionsCovers)) {
            if (updatingArticleSectionsCovers[entry] !== "Existed") formData.append(entry, updatingArticleSectionsCovers[entry]);
        }
        for (let entry of Object.keys(updatingArticleSectionsAudios)) {
            if (updatingArticleSectionsAudios[entry] !== "Existed") formData.append(entry, updatingArticleSectionsAudios[entry]);
        }
        for (let entry of Object.keys(updatingArticleSectionsVideos)) {
            if (updatingArticleSectionsVideos[entry] !== "Existed") formData.append(entry, updatingArticleSectionsVideos[entry]);
        }

        xhr.onload = () => {
            if (xhr.status === 200) {
                window.open(`./`, '_self');
                return;
            }

            submit.innerHTML = 'Failed';
            statusMsg.innerHTML = 'Try again later!';
            setTimeout(() => {
                submit.innerHTML = 'Submit';
                statusMsg.innerHTML = '';
                submit.style.pointerEvents = 'all';
                close.style.pointerEvents = 'all';
            }, 3000);

        }


        submit.style.pointerEvents = 'none';
        close.style.pointerEvents = 'none';
        statusMsg.innerHTML = 'Loading...';
        xhr.open('PATCH', `./?articleId=${article.id}`);
        xhr.send(formData);
    } catch (e) {
        console.log(e);
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setTimeout(() => {
            submit.innerHTML = 'Submit';
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);

    }
}



const updatingArticleInfoFormValidation = (oldArticle) => {
    const enTitleField = document.querySelector('.form-dialog input.single-line-field#en-title');
    const arTitleField = document.querySelector('.form-dialog input.single-line-field#ar-title');
    const enShortBriefField = document.querySelector('.form-dialog input.single-line-field#en-short-brief');
    const arShortBriefField = document.querySelector('.form-dialog input.single-line-field#ar-short-brief');
    const enCoverMsgField = document.querySelector('.form-dialog textarea.mutli-line-field#en-cover-msg');
    const arCoverMsgField = document.querySelector('.form-dialog textarea.mutli-line-field#ar-cover-msg');
    const tagsField = document.querySelector('.form-dialog .tags .header input.single-line-field');

    if (enTitleField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid english title!' });
        enTitleField.style.border = '2px red solid';
        return;
    }
    enTitleField.style.border = 'none';

    if (arTitleField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid arabic title!' });
        arTitleField.style.border = '2px red solid';
        return;
    }
    arTitleField.style.border = 'none';


    if (enShortBriefField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid english short brief!' });
        enShortBriefField.style.border = '2px red solid';
        return;
    }
    enShortBriefField.style.border = 'none';

    if (arShortBriefField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid arabic short brief!' });
        arShortBriefField.style.border = '2px red solid';
        return;
    }
    arShortBriefField.style.border = 'none';

    if (updatingArticleCover === undefined) {
        toast({ msg: 'Select article\'s cover!' });
        return;
    }

    if (enCoverMsgField.value.trim().length > 8 || arCoverMsgField.value.trim().length > 8) {
        if (enCoverMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid english cover message!' });
            enCoverMsgField.style.border = '2px red solid';
            return;
        }
        enCoverMsgField.style.border = 'none';

        if (arCoverMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid arabic cover message!' });
            arCoverMsgField.style.border = '2px red solid';
            return;
        }
        arCoverMsgField.style.border = 'none';
    } else {
        enCoverMsgField.style.border = 'none';
        arCoverMsgField.style.border = 'none';
    }

    if (updateArticleTags === undefined || updateArticleTags.length < 5) {
        toast({ msg: 'Select at least 5 tags!' });
        return;
    }

    return {
        title: {
            EN: enTitleField.value.trim(),
            AR: arTitleField.value.trim(),
        },
        short_brief: {
            EN: enShortBriefField.value.trim(),
            AR: arShortBriefField.value.trim(),
        },
        cover_attached_msg: {
            EN: enCoverMsgField.value.trim(),
            AR: arCoverMsgField.value.trim(),
        },
        tags: updateArticleTags,
        record_available: audioArticle !== undefined,
        saves: oldArticle.saves,
        ratings: oldArticle.ratings,
        comments: oldArticle.comments,
        thread: oldArticle.thread,
    }
}


// Necessary Data
let audioArticleDuratio, enableLocalizations;
const initializeCreateFragment = (props) => {

    const actionsHeader = document.querySelector('#right-section .options#header');
    document.querySelector('#right-section').addEventListener('scroll', () => {
        if (document.querySelector('#right-section').scrollTop >= 50) {
            actionsHeader.style.boxShadow = '0 1vw 2vw 1px rgba(0, 0, 0, 0.25)';
            return;
        }
        actionsHeader.style.boxShadow = 'none';
    })

   enableLocalizations= false;
   const localizationSwitch = document.getElementById('toggleSwitch');
    localizationSwitch.addEventListener('change', handleSwitchChange);

}
    function handleSwitchChange() {
   const localizationSwitch = document.getElementById('toggleSwitch');
        const isSwitchOn = localizationSwitch.checked;
        if (isSwitchOn) {
            Array.from(document.querySelectorAll('div.fragment#create-fragment #ar-title')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment #ar-short-brief')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment #ar-cover-msg')).forEach(e => {e.style.display= 'flex'});
                        Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-title')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-subtitle')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-bio')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-media-message')).forEach(e => {e.style.display= 'flex'});

            enableLocalizations= true;
        } else {
            Array.from(document.querySelectorAll('div.fragment#create-fragment #ar-title')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment #ar-short-brief')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment #ar-cover-msg')).forEach(e => {e.style.display= 'none'});
                        Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-title')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-subtitle')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-bio')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('div.fragment#create-fragment .section-form #ar-media-message')).forEach(e => {e.style.display= 'none'});

            enableLocalizations= false;
        }
    }

// Article Paramaters
let tags, sectionCovers, sectionAudios, sectionVideos, audioArticle, cover;

window.onload = () => {
    sectionCovers = {};
    sectionAudios = {};
    sectionVideos = {};
    tags = [];
    const tagsField = document.querySelector('.tags .header input');
    const tagsSubmit = document.querySelector('.tags .header #tags-submit');
    const tagsContainer = document.querySelector('.tags .body');
    tagsSubmit.onclick = () => {

        if (tagsField.value.trim().length === 0) {
            tagsField.style.border = '1px red solid';
            return;
        }

        if ((tags ?? []).includes(tagsField.value.trim())) {
            tagsField.style.border = '1px red solid';
            toast({ msg: 'Tag is already existed!' });
            return;
        }

        tagsField.style.border = 'none';
        tags.push(tagsField.value.trim());
        tagsField.value = '';
        generateTagsTiles(tagsContainer);
    }

}


const generateTagsTiles = (container) => {
    container.innerHTML = '';

    for (let tag of tags) {
        const tile = document.createElement('div');
        tile.classList.add('tag-tile');

        const tagText = document.createElement('p')
        tagText.innerHTML = tag;

        const closeOption = document.createElement('div');
        closeOption.innerHTML = 'x';
        closeOption.onclick = () => {
            tags.splice(tags.indexOf(tag), 0);
            container.removeChild(tile);
        }

        tile.appendChild(tagText);
        tile.appendChild(closeOption);
        container.appendChild(tile);
    }
}

const toast = (props) => {
    const toastDiv = document.querySelector('div#toast');
    toastDiv.innerHTML = props.msg;
    toastDiv.style.display = 'flex';
    toastDiv.style.opacity = '0';
    setTimeout(() => {
        toastDiv.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toastDiv.style.opacity = '0';
    }, 3010);

    setTimeout(() => {
        toastDiv.style.display = 'none';
    }, 3040);
}

// Files Pickers
const selectAudioFile = () => {
    const fileNameDisplay = document.querySelector('#audio-selection #selected-audio-file');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp3,.aac");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            const passivePlayer = document.createElement('audio');
            passivePlayer.src = reader.result;
            passivePlayer.load();
            toast({ msg: 'Loading article\'s audio!' });
            setTimeout(() => {
                audioArticleDuratio = passivePlayer.duration;
                toast({ msg: 'Article\'s audio loaded successfully!' });
            }, 5000);
            audioArticle = file_;
            fileNameDisplay.innerHTML = file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name;
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}

const selectSectionAudioFile = (section) => {
    const fileNameDisplay = section.querySelector('.media-selector p');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp3,.aac");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            sectionAudios[section.id] = file_;
            fileNameDisplay.innerHTML = 'Picked File: ' + (file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name);
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}


const selectSectionVideoFile = (section) => {
    const fileNameDisplay = section.querySelector('.media-selector p');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp4,.mpg,.mpeg,.m2v,.flv");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            sectionVideos[section.id] = file_;
            fileNameDisplay.innerHTML = 'Picked File: ' + (file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name);
        }
        reader.readAsDataURL(file_)
    }
    input.click();

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
            switch (props.mode) {
                case 'COVER':
                    cover = file_;
                    break;
                case 'SECTION_COVER':
                    sectionCovers[props.sectionId] = file_;
                    break;
            }
        }
        reader.readAsDataURL(file_)
    }
    input.click();
}


const newSection = () => {
    const container = document.querySelector('div.fragment#create-fragment');
    const section = document.createElement('div');
    section.classList.add('body-card');
    section.classList.add('section-form');
    section.setAttribute('id', document.querySelectorAll('.body-card.section-form').length)
    section.innerHTML = `
    <h2>Section ${section.id}</h2>
    <div class="fields-row">
        <label id="en-title">English Title</label>
        <label id="ar-title">Arabic Title</label>
        <input class="single-line-field" id="en-title" placeholder="English Title" />
        <input class="single-line-field" id="ar-title" placeholder="Arabic Title" />
    </div>
    <div class="fields-row">
        <label id="en-subtitle">English Subtitle</label>
        <label id="ar-subtitle">Arabic Subtitle</label>
        <input class="single-line-field" id="en-subtitle" placeholder="English Subtitle" />
        <input class="single-line-field" id="ar-subtitle" placeholder="Arabic Subtitle" />
    </div>
    <div class="fields-row">
        <label id="en-bio">English Bio</label>
        <label id="ar-bio">Arabic Bio</label>
        <textarea class="mutli-line-field" id="en-bio" placeholder="English Bio"></textarea>
        <textarea class="mutli-line-field" id="ar-bio" placeholder="Arabic Bio"></textarea>
    </div>
    <div class="fields-row">
        <label>Media Type</label>
        <label>Media</label>
        <div id="media-tiles">
            <div class="media-tile active" id="no-media" onclick="selectMediaType(this.parentNode.parentNode, this, 'NO_MEDIA')">No Media</div>
            <div class="media-tile" id="image" onclick="selectMediaType(this.parentNode.parentNode, this, 'IMAGE')">Image</div>
            <div class="media-tile" id="audio" onclick="selectMediaType(this.parentNode.parentNode, this, 'AUDIO')">Audio</div>
            <div class="media-tile" id="video" onclick="selectMediaType(this.parentNode.parentNode, this, 'VIDEO')">Video</div>
        </div>
        <div class="media-selector"></div>
    </div>
    <label>Audio Stop</label>
    <input type="number" class="single-line-field" id="audio-stop" placeholder="Audio Stop (seconds)" />
    <div class="fields-row">
        <label>English Media Message</label>
        <label id="ar-media-message">Arabic Media Message</label>
        <textarea class="mutli-line-field" id="en-media-message" placeholder="English Media Message"></textarea>
        <textarea class="mutli-line-field" id="ar-media-message" placeholder="Arabic Media Message"></textarea>
    </div>
    <div class="options">
        <button class="shadow-button" onclick="deleteSection(this.parentNode.parentNode)">Delete</button>
        <button class="main-button" onclick="validateSection(this.parentNode.parentNode, true)">Check</button>
    </div>
    `

    container.insertBefore(section, document.querySelector('button.main-button#new-section'));
    handleSwitchChange()
}

const deleteSection = (instance) => {
    const container = document.querySelector('div.fragment#create-fragment');
    container.removeChild(instance);
}

const selectMediaType = (section, tile, type) => {
    if (tile.classList.contains('active')) return;
    const activeTile = section.querySelector('.media-tile.active');
    if (activeTile != undefined) activeTile.classList.remove('active');
    const mediaSelector = section.querySelector('.media-selector');
    mediaSelector.innerHTML = '';
    delete sectionCovers[section.parentNode.id];
    delete sectionAudios[section.parentNode.id];
    delete sectionVideos[section.parentNode.id];
    switch (type) {
        case 'NO_MEDIA':
            tile.classList.add('active');
            break;
        case 'IMAGE':
            console.log('Here')
            tile.classList.add('active');
            const imagePicker = document.createElement('div');
            imagePicker.classList.add('image-picker');
            imagePicker.onclick = () => { pickImage(imagePicker, { mode: 'SECTION_COVER', sectionId: section.parentNode.id }) };
            mediaSelector.appendChild(imagePicker);
            break;
        case 'AUDIO':
            tile.classList.add('active');
            mediaSelector.innerHTML = `
            <p class="shadow-button" style="text-decoration: none"></p>
            <button class="shadow-button" onclick="selectSectionAudioFile(this.parentNode.parentNode.parentNode)">Pick Audio</button>
            `;
            break;
        case 'VIDEO':
            tile.classList.add('active');
            mediaSelector.innerHTML = `
            <p class="shadow-button" style="text-decoration: none"></p>
            <button class="shadow-button" onclick="selectSectionVideoFile(this.parentNode.parentNode.parentNode)">Pick Video</button>
            `;
            break;
    }
}


const articleInfoFormValidation = () => {
    const enTitleField = document.querySelector('input.single-line-field#en-title');
    const arTitleField = document.querySelector('input.single-line-field#ar-title');
    const enShortBriefField = document.querySelector('input.single-line-field#en-short-brief');
    const arShortBriefField = document.querySelector('input.single-line-field#ar-short-brief');
    const enCoverMsgField = document.querySelector('textarea.mutli-line-field#en-cover-msg');
    const arCoverMsgField = document.querySelector('textarea.mutli-line-field#ar-cover-msg');
    const tagsField = document.querySelector('.tags .header input.single-line-field');

    if (enTitleField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid english title!' });
        enTitleField.style.border = '2px red solid';
        return;
    }
    enTitleField.style.border = 'none';

    if (enableLocalizations) {
        if (arTitleField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid arabic title!' });
            arTitleField.style.border = '2px red solid';
            return;
        }
        arTitleField.style.border = 'none';
    }


    if (enShortBriefField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid english short brief!' });
        enShortBriefField.style.border = '2px red solid';
        return;
    }
    enShortBriefField.style.border = 'none';

    if (enableLocalizations) {
        if (arShortBriefField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid arabic short brief!' });
            arShortBriefField.style.border = '2px red solid';
            return;
        }
        arShortBriefField.style.border = 'none';
    }

    if (cover === undefined) {
        toast({ msg: 'Select article\'s cover!' });
        return;
    }

    if (enCoverMsgField.value.trim().length > 8 || arCoverMsgField.value.trim().length > 8) {
        if (enCoverMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid english cover message!' });
            enCoverMsgField.style.border = '2px red solid';
            return;
        }
        enCoverMsgField.style.border = 'none';

        if (enableLocalizations) {
            if (arCoverMsgField.value.trim().length < 8) {
                toast({ msg: 'Enter a valid arabic cover message!' });
                arCoverMsgField.style.border = '2px red solid';
                return;
            }
            arCoverMsgField.style.border = 'none';
    }
    } else {
        enCoverMsgField.style.border = 'none';
        arCoverMsgField.style.border = 'none';
    }

    if (tags === undefined || tags.length < 5) {
        toast({ msg: 'Select at least 5 tags!' });
        return;
    }

    return {
        title: enableLocalizations ?{
            EN: enTitleField.value.trim(),
            AR: arTitleField.value.trim(),
        } :{
            EN: enTitleField.value.trim(),
            AR: enTitleField.value.trim(),
        },
        short_brief: enableLocalizations?{
            EN: enShortBriefField.value.trim(),
            AR: arShortBriefField.value.trim(),
        }:{
            EN: enShortBriefField.value.trim(),
            AR: enShortBriefField.value.trim(),
        },
        cover_attached_msg: enableLocalizations?{
            EN: enCoverMsgField.value.trim(),
            AR: arCoverMsgField.value.trim(),
        }:{
            EN: enCoverMsgField.value.trim(),
            AR: enCoverMsgField.value.trim(),
        },
        tags: tags,
        record_available: audioArticle !== undefined,
        saves: [],
        ratings: [],
        comments: [],
        thread: '',
    }
}

const validateSection = (container, wToast) => {
    let mediaType;
    const enTitleField = container.querySelector('input.single-line-field#en-title');
    const arTitleField = container.querySelector('input.single-line-field#ar-title');
    const enSubtitleField = container.querySelector('input.single-line-field#en-subtitle');
    const arSubtitleField = container.querySelector('input.single-line-field#ar-subtitle');
    const enBioField = container.querySelector('textarea.mutli-line-field#en-bio');
    const arBioField = container.querySelector('textarea.mutli-line-field#ar-bio');
    const enMediaMsgField = container.querySelector('textarea.mutli-line-field#en-media-message');
    const arMediaMsgField = container.querySelector('textarea.mutli-line-field#ar-media-message');
    const audioStopField = container.querySelector('input.single-line-field#audio-stop');
    const sectionName = container.querySelector('h2').innerHTML;
    const sectionId = sectionName.split(' ')[1];
    const activeMediaTile = container.querySelector('.media-tile.active');


    if (enTitleField.value.trim().length < 8) {
        toast({ msg: sectionName + ': Enter a valid english title!' });
        enTitleField.style.border = '2px red solid';
        return;
    }
    enTitleField.style.border = 'none';

    if (enableLocalizations) {
        if (arTitleField.value.trim().length < 8) {
            toast({ msg: sectionName + ': Enter a valid arabic title!' });
            arTitleField.style.border = '2px red solid';
            return;
        }
        arTitleField.style.border = 'none';
    }


    if (enSubtitleField.value.trim().length > 8 || arSubtitleField.value.trim().length > 8) {
        if (enSubtitleField.value.trim().length < 8) {
            toast({ msg: sectionName + ': Enter a valid english cover message!' });
            enSubtitleField.style.border = '2px red solid';
            return;
        }
        enSubtitleField.style.border = 'none';

        if (enableLocalizations) {
            if (arSubtitleField.value.trim().length < 8) {
                toast({ msg: sectionName + ': Enter a valid arabic cover message!' });
                arSubtitleField.style.border = '2px red solid';
                return;
            }
            arSubtitleField.style.border = 'none';
        }
    } else {
        enSubtitleField.style.border = 'none';
        arSubtitleField.style.border = 'none';
    }


    if (enBioField.value.trim().length < 64) {
        toast({ msg: sectionName + ': Enter a valid english bio!' });
        enBioField.style.border = '2px red solid';
        return;
    }
    enBioField.style.border = 'none';

    if (enableLocalizations) {
        if (arBioField.value.trim().length < 64) {
            toast({ msg: sectionName + ': Enter a valid arabic bio!' });
            arBioField.style.border = '2px red solid';
            return;
        }
        arBioField.style.border = 'none';
    }

    if (activeMediaTile === undefined) {
        toast({ msg: sectionName + ': Select media type!' });
        return;
    }

    if (activeMediaTile.id !== 'no-media') {
        switch (activeMediaTile.id) {
            case 'image':
                if (sectionCovers[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select image!' });
                    return;
                }
                mediaType = 'IMAGE';
                break;
            case 'video':
                if (sectionVideos[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select video!' });
                    return;
                }
                mediaType = 'VIDEO';
                break;
            case 'audio':
                if (sectionAudios[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select audio!' });
                    return;
                }
                mediaType = 'AUDIO';
                break;
        }
    } else {
        mediaType = 'NO_MEDIA';
    }

    if (audioArticle !== undefined) {
        let selectedDuration = (Number.parseInt(audioStopField.value.trim()));
        console.log(selectedDuration);
        if (selectedDuration === undefined || audioStopField.value.trim().length == 0 || (selectedDuration <= 0 || selectedDuration > audioArticleDuratio)) {
            toast({ msg: sectionName + ': Define a valid article audio stop!' });
            return;
        }
    }

    if (enMediaMsgField.value.trim().length > 8 || arMediaMsgField.value.trim().length > 8) {
        if (enMediaMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid english media message!' });
            enMediaMsgField.style.border = '2px red solid';
            return;
        }
        enMediaMsgField.style.border = 'none';

    if (enableLocalizations) {
            if (arMediaMsgField.value.trim().length < 8) {
                toast({ msg: 'Enter a valid arabic media message!' });
                arMediaMsgField.style.border = '2px red solid';
                return;
            }
            arMediaMsgField.style.border = 'none';
        } else {
            enMediaMsgField.style.border = 'none';
            arMediaMsgField.style.border = 'none';
        }
    }


    if (wToast) toast({ msg: sectionName + ': Section is completed!' });
    return {
        title: enableLocalizations ? {
            EN: enTitleField.value.trim(),
            AR: arTitleField.value.trim(),
        }:{
            EN: enTitleField.value.trim(),
            AR: enTitleField.value.trim(),
        },
        subtitle: enableLocalizations ? {
            EN: enSubtitleField.value.trim(),
            AR: arSubtitleField.value.trim(),
        }:{
            EN: enSubtitleField.value.trim(),
            AR: enSubtitleField.value.trim(),
        },
        bio: enableLocalizations ? {
            EN: enBioField.value.trim(),
            AR: arBioField.value.trim(),
        }:{
            EN: enBioField.value.trim(),
            AR: enBioField.value.trim(),
        },
        attachement_msg: enableLocalizations?{
            EN: enMediaMsgField.value.trim(),
            AR: arMediaMsgField.value.trim(),
        }:{
            EN: enMediaMsgField.value.trim(),
            AR: enMediaMsgField.value.trim(),
        },
        attachment_type: mediaType,
        id: sectionId,
        audio_stop: Number.parseFloat(audioStopField.value.trim()),

    }


}

const createArticle = () => {
    const loadingOverlay = document.querySelector('#loading-overlay');
    const loadingDialog = document.querySelector('#loading-dialog');
    try {
        const validation = articleInfoFormValidation();
        if (validation === undefined) return;

        const sections = document.querySelectorAll('.body-card.section-form');
        if (!sections || sections.length === 0) {
            toast({ msg: 'Create at least one section!' });
            return;
        }

        let articleSctions = [];
        for (let section of sections) {
            let sectionValidation = validateSection(section);
            if (sectionValidation === undefined) return;
            articleSctions.push(sectionValidation);
        }
        validation.sections = articleSctions;
        loadingOverlay.style.display = 'flex';
        loadingDialog.style.display = 'flex';

        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 201) {
                window.open('../articles/', '_self');
                return;
            } else {
                loadingOverlay.style.display = 'none';
                loadingDialog.style.display = 'none';
                toast({ msg: 'Failed, Try again later!' });
            }
        }

        const data = new FormData();
        data.append('data', JSON.stringify(validation));
        data.append('articleCover', cover);

        for (let k in sectionCovers) data.append(k, sectionCovers[k]);
        for (let k in sectionAudios) data.append(k, sectionAudios[k]);
        for (let k in sectionVideos) data.append(k, sectionVideos[k]);

        xhr.open('POST', './');
        xhr.send(data);
    } catch (e) {
        console.log(e);
        loadingOverlay.style.display = 'none';
        loadingDialog.style.display = 'none';
        toast({ msg: 'Failed, Try again later!' });
    }
}