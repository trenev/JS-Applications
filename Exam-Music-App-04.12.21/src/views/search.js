import { getAllAlbums, searchAlbum } from '../api/data.js';
import { html } from '../lib.js';
import { albumTemplate } from './common.js';


const searchTemplate = (albums, onSearch, params = '') => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${params}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">
        ${albums.length == 0 
            ? html`<p class="no-result">No result.</p>` 
            : albums.map(albumTemplate)}
    </div>
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await searchAlbum(params);
    }

    ctx.render(searchTemplate(albums, onSearch, params));

    async function onSearch(e) {
        const search = e.target.previousElementSibling.value.trim();

        if (search) {
            ctx.page.redirect('/catalog/search?query=' + encodeURIComponent(search));
        } else {
            return alert('Fill desired album name.');
        }
    }
}

