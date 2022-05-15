let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userData != null) {
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('.email span').textContent = userData.email;
        document.querySelector('#addForm .add').disabled = false;

        document.querySelector('#logout').addEventListener('click', logout);
        document.querySelector('#addForm').addEventListener('submit', onCreateSubmit);
        document.querySelector('#catches').addEventListener('click', onClick);
    } else {
        document.querySelector('#user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadData);

    loadData();
});

function onClick(event) {
    if (event.target.className == 'update') {
        onUpdate(event.target);
    } else if (event.target.className == 'delete') {
        onDelete(event.target);   
    }
}

async function onUpdate(button) {
    const id = button.dataset.id;

    const data = [...button.parentElement.querySelectorAll('input')]
    .map(f => [f.className, f.value])
    .reduce((acc, [k, v]) => Object.assign(acc, {[k]: v}), {});

    data.weight = Number(data.weight);
    data.captureTime = Number(data.captureTime);
    try {
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        loadData();
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}

async function onDelete(button) {
    const id = button.dataset.id;
    try {
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            }
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        button.parentElement.remove();
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}

async function onCreateSubmit(event) {
    event.preventDefault();
    if (!userData) {
        window.location = '/login.html';
        return;
    }

    const formData = new FormData(event.target);
    const data = [...formData.entries()]
    .reduce((acc, [k, v]) => Object.assign(acc, {[k]: v}), {});
    
    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('All fields are required.');
        }
        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        event.target.reset();
        loadData();
    } catch (error) {
        alert(error.message);
    }  
}

async function loadData() {
    try {
        const response = await fetch('http://localhost:3030/data/catches');

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        document.querySelector('#catches').replaceChildren(...data.map(createCard));
    } catch (error) {
        alert(error.message);
    }
}

function createCard(data) {
    const isOwner = (userData && userData.id == data._ownerId);

    const card = document.createElement('div');
    card.classList.add('catch');
    card.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${data.angler}" ${!isOwner ? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${data.weight}" ${!isOwner ? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${data.species}" ${!isOwner ? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${data.location}" ${!isOwner ? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${data.bait}" ${!isOwner ? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${data.captureTime}" ${!isOwner ? 'disabled' : ''}>
<button class="update" data-id="${data._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${data._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`;

    return card;
}

async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        }
    });

    sessionStorage.clear();
    window.location = '/';
}

