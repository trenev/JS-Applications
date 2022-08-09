import {createComment, getAllCommentsByRecipe} from '../api/data.js';
import { html, render, until } from '../lib.js';
import { getUserData } from '../utils.js';
import { spinner } from './common.js';


const commentsTemplate = (recipe, commentForm, comments) => html`
<div class="section-title">
    Comments for ${recipe.name}
</div>
${commentForm}
<div class="comments">
    ${until((async () => commentsList(await comments))(), spinner())}
</div>`;

const commentFormTemplate = (active, toggleForm, onSubmit) => html`
<article class="new-comment">
    ${active
        ? html`
    <h2>New comment</h2>
    <form @submit=${onSubmit} id="commentForm">
        <textarea name="content" placeholder="Type comment"></textarea>
        <input type="submit" value="Add comment">
    </form>`
        : html`<form><button class="button" @click=${toggleForm}>Add comment</button></form>`}
</article>`;

const commentsList = (comments) => html`
<ul>
    ${comments.map(comment)}
</ul>`;

const comment = (data) => html`
<li class="comment">
    <header>${data.author.email}</header>
    <p>${data.content}</p>
</li>`;

export function showComments(recipe) {
    let formActive = false;
    const commentsPromise = getAllCommentsByRecipe(recipe._id);
    const result = document.createElement('div');
    renderTemplate(commentsPromise);

    return result;

    function renderTemplate(comments) {
        render(commentsTemplate(recipe, createForm(formActive, toggleForm, onSubmit), comments), result);
    }

    function toggleForm() {
        formActive = !formActive;
        renderTemplate(commentsPromise);
    }

    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const content = data.get('content');

        if (content == '') {
            return alert('The field must be filled.');
        }

        toggleForm();
        const comments = await commentsPromise;
        const result = await createComment(recipe._id, content);
    
        comments.unshift(result);
        renderTemplate(comments);
    }
}

function createForm(formActive, toggleForm, onSubmit) {
    const userData = getUserData();
    if (userData) {
        return commentFormTemplate(formActive, toggleForm, onSubmit);
    } else {
        return null;
    }
}
