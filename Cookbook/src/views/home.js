import { getLatestRecipies } from '../api/data.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';


const homeTemplate = (dataPromise) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Cookbook</h2>
    </div>
    <header class="section-title">Recently added recipes</header>
    <div class="recent-recipes">
        ${until(dataPromise, spinner())}
    </div>
    <footer class="section-title">
        <p>Browse all recipes in the <a href="/recipes">Catalog</a></p>
    </footer>
</section>`;

const recipeTemplate = (recipe) => html`
<a href="/recipes/details/${recipe._id}">
    <article class="recent">
        <div class="recent-preview"><img src=${recipe.img}></div>
        <div class="recent-title">${recipe.name}</div>
    </article>
    <div class="recent-space"></div>
</a>`;

export function homePage(ctx) {
    ctx.render(homeTemplate(loadData()));
}

async function loadData() {
    const data = await getLatestRecipies();
    return data.map(recipeTemplate);
}
