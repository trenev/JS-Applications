import { showView, createCommentElement } from './dom.js';

const comments = document.querySelector('.theme-content');
const comment = document.querySelector('.comment');
const answer = document.querySelector('.answer-comment');
const topic = document.querySelector('.theme-name h2');
const topicAuthor = comment.querySelector('.header span');
const topicTime = comment.querySelector('.header time');
const topicContent = comment.querySelector('.post-content');
comment.remove();
answer.remove();

export async function showPost(id) {
    const [topicData, topicComments] = await Promise.all([getTopicContent(id), getTopicComments(id)]);

    const time = topicData.date.split('.')[0].split('T').join(' ');
    
    topic.textContent = topicData.topic;
    topicAuthor.textContent = topicData.user;
    topicTime.textContent = time;
    topicContent.textContent = topicData.content;

    showView(comments);

    comment.querySelector('#user-comment').replaceChildren(...topicComments.map(createCommentElement));
    comments.appendChild(comment);
    comments.appendChild(answer);

    document.querySelector('.theme-name').id = id;
    document.querySelector('.answer form').addEventListener('submit', onSubmit);
}

async function getTopicComments(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const data = await response.json();
    const comments = Object.values(data).filter(c => c.ownerId == id);

    return comments;
}

async function getTopicContent(id) {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id);
    const data = await response.json();

    return data;
}

async function onSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const comment = {
        post: formData.get('postText').trim(),
        user: formData.get('username').trim()
    };

    if (comment.post == '' || comment.user == '') {
        return;
    }

    const id = document.querySelector('.theme-name').id;
    const date = new Date().toJSON();
    Object.assign(comment, {'date': date});
    Object.assign(comment, {'ownerId': id});

    event.target.reset();

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    const data = await response.json();
    
    document.querySelector('#user-comment').appendChild(createCommentElement(data));
}

