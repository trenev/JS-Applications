import { getById, deleteMeme } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (dataPromise) => html`
<section id="meme-details">
    ${until(dataPromise, html`<div class="dot-spin"></div>`)}
</section>`;

const memeCard = (meme, isOwner, onDelete) => html`
<h1>Meme Title: ${meme.title}</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>
        ${isOwner ? html`
        <a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button @click=${onDelete} class="button danger">Delete</button>` : null}            
    </div>
</div>`;

export async function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadData(ctx.params.id, onDelete)));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this meme?');

        if (choice) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/memes');
        }
    }
}

async function loadData(id, onDelete) {
    const meme = await getById(id);
    const userData = getUserData();
    const isOwner = userData && userData.id == meme._ownerId;

    return memeCard(meme, isOwner, onDelete);
}