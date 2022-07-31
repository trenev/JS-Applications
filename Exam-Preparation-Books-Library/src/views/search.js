import { searchBooks } from '../api/data.js';
import { html } from '../lib.js';
import { bookCard } from './common.js';


const searchTemplate = (books, onSubmit, params = '') => html`
<section id="dashboard-page" class="dashboard create">
    <h1>Search</h1>

    <form @submit=${onSubmit} id="login-form" action="" method="">
        <fieldset>
            <p class="field">
                <span class="input">
                    <input type="text" name="search" .value=${params}>
                </span>
            </p>
            <input class="button submit" type="submit" value="Search">
        </fieldset>
    </form>

    ${books.length > 0 
        ? html`<ul class="other-books-list">${books.map(bookCard)}</ul>` 
        : html`<p class="no-books">No results!</p>`}
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let books = [];

    if (params) {
        books = await searchBooks(decodeURIComponent(params));
    }

    ctx.render(searchTemplate(books, onSubmit, params));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const search = formData.get('search');

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}