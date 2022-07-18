import {html, render} from 'https://unpkg.com/lit-html?module';

const itemTemplate = (item) => html`
<option value="${item._id}">${item.text}</option>`;

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
document.querySelector('form').addEventListener('submit', onSubmit);
const input = document.getElementById('itemText');
getItems();

async function getItems() {
    const res = await fetch(url);
    const data = await res.json();

    update(Object.values(data));
}

async function onSubmit(event) {
    event.preventDefault();
    const text = input.value.trim();
    input.value = '';

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    });

    if (res.ok) {
        getItems();
    }
}

function update(data) {
    render(data.map(itemTemplate), document.getElementById('menu'));
}

