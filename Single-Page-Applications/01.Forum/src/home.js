import { showView, createTopicElement } from './dom.js';


const form = document.querySelector('.new-topic-border');
const topics = document.querySelector('.topic-title');
form.remove();
topics.remove();

export async function showHome() {
    showView(form, topics);
    
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = await response.json();

    document.querySelector('.topic-container').replaceChildren(...Object.values(data).map(createTopicElement));
}

