import { showPost } from './comment.js';
import { createTopicElement } from './dom.js';
import { showHome } from './home.js';

showHome();

const topicContainer = document.querySelector('.topic-container');
const topicName = document.querySelector('#topicName');
const username = document.querySelector('#username');
const postText = document.querySelector('#postText');

document.querySelector('nav a').addEventListener('click', showHome);
document.querySelector('.public').addEventListener('click', createPost);
document.querySelector('.cancel').addEventListener('click', cancelPost);
topicContainer.addEventListener('click', createComment);


function clearFields() {
    topicName.value = '';
    username.value = '';
    postText.value = '';
}

function cancelPost(event) {
    event.preventDefault();
    clearFields();
}

async function createPost(event) {
    event.preventDefault();

    const topic = topicName.value.trim();
    const user = username.value.trim();
    const content = postText.value.trim();

    if (topic == '' || user == '' || content == '') {
        return;
    }

    const date = new Date().toJSON();
    clearFields();
    
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic,
            user,
            content,
            date: date
        })
    });

    const data = await response.json();
    topicContainer.appendChild(createTopicElement(data));
}

async function createComment(event) {
    if (event.target.tagName == 'H2') {
        showPost(event.target.parentElement.parentElement.parentElement.id);
    }
}




