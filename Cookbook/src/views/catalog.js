import {getRecipes, getRecipesCount, PAGE_SIZE } from '../api/data.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';


const catalogTemplate = (dataPromise, count, page, search, onSearch) => html`
<section id="catalog">
    <div class="section-title">
        <form @submit=${onSearch} id="searchForm">
            <input type="text" name="search" .value=${search}>
            <input type="submit" value="Search">
        </form>
    </div>
                        
    ${until((async () => recipesList(await Promise.all([dataPromise, count]), page, search))(), spinner())}

</section>`;

const recipesList = ([recipes, count], page, search) => html`
${count > PAGE_SIZE ? html`<header class="section-title">
                            ${pagerTemplate(page, Math.ceil(count / PAGE_SIZE), search)}
                        </header>` : null}

${recipes.map(recipeTemplate)}

${count > PAGE_SIZE ? html`<footer class="section-title">
                            ${pagerTemplate(page, Math.ceil(count / PAGE_SIZE), search)}
                        </footer>` : null}`;

const pagerTemplate = (page, pages, search) => html`
Page ${page} of ${pages}
${page > 1 ? html`<a class="pager" href=${'/recipes?page=' + (page - 1) + (search ? `&search=${search}` : '')}>&lt; Prev</a>` : null}
${page < pages ? html`<a class="pager" href=${'/recipes?page=' + (page + 1) + (search ? `&search=${search}` : '')}>Next &gt;</a>` : null}`;

const recipeTemplate = (recipe) => html`
<a href="/recipes/details/${recipe._id}">
    <article class="preview">
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src=${recipe.img}>
        </div>
    </article>
</a>`;

export function catalogPage(ctx) {
    const query = ctx.querystring.split('&');
    const page = Number(query[0].split('=')[1] || 1);
    let search = (query[1] && query[1].split('=')[1]) || '';

    const recipes = getRecipes(page, search);
    const count = getRecipesCount(search);

    ctx.render(catalogTemplate(recipes, count, page, search, onSearch));

    async function onSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        search = formData.get('search');
        ctx.page.redirect('/recipes?page=1&search=' + encodeURIComponent(search));
    }
}
