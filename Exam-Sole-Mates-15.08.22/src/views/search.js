import { searchItem } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';
import { itemCard } from './common.js';


const searchTemplate = (items, onSearch, params = '', user) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSearch} class="search-wrapper cf">
    <input
        id="#search-input"
        type="text"
        name="search"
        placeholder="Search here..."
        required
        .value=${params}
    />
    <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    ${resutsTemplate(items, user)}

</section>`;

const resutsTemplate = (items, user) => html`
<div id="search-container">
    ${items.length == 0 ? html`<h2>There are no results found.</h2>` 
                        : html`<ul class="card-wrapper">
                                    ${items.map(i => itemCard(i, user))}
                                </ul>`}
</div>`;

export async function searchPage(ctx) {
    const userData = getUserData();
    const params = ctx.querystring.split('=')[1];
    let items = [];

    if (params) {
        items = await searchItem(params);
    }

    ctx.render(searchTemplate(items, onSearch, params, userData)); 

    async function onSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get('search').trim();

        if (search) {
            ctx.page.redirect('/catalog/search?query=' + encodeURIComponent(search));
        }
    }
}