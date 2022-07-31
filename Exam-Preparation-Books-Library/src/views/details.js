import { deleteBook, getById, likeBook, getAllLikes, getLikesByUser } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (book, isOwner, likes, canLikeBook, onDelete, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwner ? html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript: void(0)">Delete</a>` : null}
           
            ${canLikeBook ? html`<a @click=${onLike} class="button" href="javascript: void(0) ">Like</a>` : null}               

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const userData = getUserData();
    let likesByUser = 0;

    if (userData) {
        likesByUser = await getLikesByUser(ctx.params.id, userData.id);
    }

    const [book, allLikes] = await Promise.all([
        getById(ctx.params.id), 
        getAllLikes(ctx.params.id)]);
    
    const isOwner =userData && book._ownerId == userData.id;
    const canLikeBook = userData && !isOwner && likesByUser == 0;

    ctx.render(detailsTemplate(book, isOwner, allLikes, canLikeBook, onDelete, onLike));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${book.title}?`);
        if (choice) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likeBook({bookId: ctx.params.id});
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}