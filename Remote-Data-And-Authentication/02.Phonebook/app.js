function attachEvents() {
    document.querySelector('body').addEventListener('click', onClick);

    displayContacts();
}

const url = 'http://localhost:3030/jsonstore/phonebook';

const list = document.getElementById('phonebook');
const person = document.getElementById('person');
const phone = document.getElementById('phone');

attachEvents();

function onClick(e) {
    if (e.target.tagName == 'BUTTON') {
        const id = e.target.id;
        if (id == 'btnLoad') {
            displayContacts();
        } else if (id == 'btnCreate') {
            addNewContact();
        } else {
            deleteContact(id);
        }
    }
}

async function getAllContacts() {
    try {
        const res = await fetch(url);

        if (res.statusText != 'OK') {
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return Object.values(data);
    } catch (error) {
        alert(error.message);
    }
}

async function createContact(contact) {
    try {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
        };

        const res = await fetch(url, options);

        if (res.statusText != 'OK') {
            throw new Error(res.statusText);
        }

        return await res.json();
    } catch (error) {
        alert(error.message);
    }
}

async function deleteContact(id) {
    try {
        const res = await fetch(`${url}/${id}`, {method: 'delete'});

        if (res.statusText != 'OK') {
            throw new Error(res.statusText);
        }

        document.getElementById(id).parentElement.remove();
        return await res.json();
    } catch (error) {
        alert(error.message);
    }
}

async function displayContacts() {
    list.textContent = 'Loading...';
    
    const data = await getAllContacts();
    list.replaceChildren();

    data.forEach(c => {
        list.appendChild(createDomElement(c.person, c.phone, c._id));
    });
}

async function addNewContact() {
    const contact = {
        person: person.value,
        phone: phone.value
    };

    const result = await createContact(contact);
    list.appendChild(createDomElement(result.person, result.phone, result._id));

    person.value = '';
    phone.value = '';
}

function createDomElement(person, phone, id) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `
    ${person}: ${phone} <button id="${id}">Delete</button>`;

    return liElement;
}