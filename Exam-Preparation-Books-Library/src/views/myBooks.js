import { getMyBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';
import { bookCard } from './common.js';


const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0 
        ? html`<ul class="my-books-list">${books.map(bookCard)}</ul>` 
        : html`<p class="no-books">No books in database!</p>`}
</section>`;

export async function myBooksPage(ctx) {
    const userData = getUserData();
    if (!userData) {
        ctx.page.redirect('/login');
        return;
    }

    const books = await getMyBooks(userData.id);
    ctx.render(myBooksTemplate(books));
}