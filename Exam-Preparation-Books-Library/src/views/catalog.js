import { getAllBooks } from '../api/data.js';
import { html } from '../lib.js';
import { bookCard } from './common.js';


const catalogTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length > 0 
        ? html`<ul class="other-books-list">${books.map(bookCard)}</ul>` 
        : html`<p class="no-books">No books in database!</p>`}
</section>`;

export async function catalogPage(ctx) {
    const books = await getAllBooks();
    ctx.render(catalogTemplate(books));
}