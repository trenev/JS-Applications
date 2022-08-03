import { deleteTheater, getById, likeTheater, getLikesByTheaterId, getMyLikeByTheaterId } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (theater, userData, hasLike, likes, onDelete, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl}/>
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>

            ${userData ? html`
                <div class="buttons">
                    ${theaterControlsTemplate(theater, userData, hasLike, onDelete, onLike)}
                </div>` : null}

            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>`;

const theaterControlsTemplate = (theater, userData, hasLike, onDelete, onLike) => {
    if (userData.id == theater._ownerId) {
        return html`
        <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
        <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`;
    } else {
        return hasLike ? null 
        : html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`;
    }
};

export async function detailsPage(ctx) {
    const userData = getUserData();
    
    const [theater, likes, hasLike] = await Promise.all([
        getById(ctx.params.id),
        getLikesByTheaterId(ctx.params.id),
        userData ? getMyLikeByTheaterId(ctx.params.id, userData.id) : 0
    ]);

    ctx.render(detailsTemplate(theater, userData, hasLike, likes, onDelete, onLike));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${theater.title}?`);
        
        if (choice) {
            await deleteTheater(theater._id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike() {
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.likes').textContent = `Likes: ${likes + 1}`;
        await likeTheater(theater._id);
        // ctx.page.redirect('/details/' + theater._id);
    }
}