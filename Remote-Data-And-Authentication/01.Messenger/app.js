function attachEvents() {
    document.querySelector('#refresh').addEventListener('click', showAllMessages);
    document.querySelector('#submit').addEventListener('click', onSubmit);

    showAllMessages();
}

const url = 'http://localhost:3030/jsonstore/messenger';

const author = document.querySelector('[name="author"]');
const content = document.querySelector('[name="content"]');
const list = document.querySelector('#messages');

attachEvents();

async function getAllMessages() {
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

async function createMessage(message) {
    try {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
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

async function showAllMessages() {
    list.textContent = 'Loading...';

    const messages = (await getAllMessages())
        .map(m => `${m.author}: ${m.content}`)
        .join('\n');

    list.textContent = messages;
}

async function onSubmit() {
    const message = {
        author: author.value,
        content: content.value
    };

    await createMessage(message);

    list.textContent += `\n${message.author}: ${message.content}`;
    content.value = '';
}