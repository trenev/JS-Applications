import { createComment, deleteGame, getAllCommentsByGame, getById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (game, userData, onDelete, onComment, comments) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src=${game.imageUrl}/>
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">${game.summary}</p>

        <div class="details-comments">
            <h2>Comments:</h2>
            ${commentsListTemplate(comments)}
        </div>

        ${ownerControls(game, userData, onDelete)}
        
    </div>

    ${commentFormTemplate(game, userData, onComment)}

</section>`;

function ownerControls(game, userData, onDelete) {
    if (userData && userData.id == game._ownerId) {
        return html`<div class="buttons">
                        <a href="/games/edit/${game._id}" class="button">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                    </div>`;
    } else {
        return null;
    }
}

function commentsListTemplate(comments) {
    if (comments.length == 0) {
        return html`<p class="no-comment">No comments.</p>`;
    } else {
        return html`<ul>${comments.map(commentTemplate)}</ul>`;
    }
}

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

function commentFormTemplate(game, userData, onComment) {
    if (userData && userData.id != game._ownerId) {
        return html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`;
    } else {
        return null;
    }
} 

export async function detailsPage(ctx) {
    const [game, comments] = await Promise.all([
        await getById(ctx.params.id),
        await getAllCommentsByGame(ctx.params.id)
    ]);
    
    const userData = getUserData();

    ctx.render(detailsTemplate(game, userData, onDelete, onComment, comments));
    
    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${game.title}?`);
        
        if (choice) {
            await deleteGame(game._id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(e) {
        e.preventDefault();
        const comment = new FormData(e.target).get('comment');

        await createComment(game._id, comment);
        e.target.reset();
        ctx.page.redirect('/games/details/' + game._id);
    }
}