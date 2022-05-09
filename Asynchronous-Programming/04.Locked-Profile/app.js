async function lockedProfile() {
    const profiles = document.querySelector('#main');
    profiles.replaceChildren();

    profiles.addEventListener('click', moreInfo);

    const profilesData = await getData();
    profilesData.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('profile');
        card.innerHTML = renderProfile(p);
        profiles.appendChild(card);
    });
}

async function getData() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const res = await fetch(url);
    const data = await res.json();
    return Object.values(data);
}

function renderProfile(data) { 
    return `
<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user1Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user1Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user1Username" value="${data.username}" disabled readonly />
<div class="hiddenInfo">
	<hr>
	<label>Email:</label>
	<input type="email" name="user1Email" value="${data.email}" disabled readonly />
	<label>Age:</label>
	<input type="email" name="user1Age" value="${data.age}" disabled readonly />
</div>				
<button>Show more</button>`;
}

function moreInfo(e) {
    const currentProfile = e.target.parentElement.children;

    if (e.target.tagName == 'BUTTON') {
        if (currentProfile[4].checked == false) {
            return;
        }

        if (currentProfile[10].textContent == 'Show more') {
            currentProfile[10].textContent = 'Show less';
            currentProfile[9].className = '';
        } else {
            currentProfile[10].textContent = 'Show more';
            currentProfile[9].className = 'hiddenInfo';
        }
    }
}