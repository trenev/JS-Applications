import { deleteRecipe, getById } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../utils.js';
import { spinner } from './common.js';
import { showComments } from './comments.js';


const detailsTemplate = (dataPromise, userData, onDelete) => html`
<section id="details"></section>
    ${until((async () => recipeCardTemplate(await dataPromise, userData, onDelete))(), spinner())}
    ${until((async () => showComments(await dataPromise))(), null)}
</section>`;

const recipeCardTemplate = (recipe, user, onDelete) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src=${recipe.img}>
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => html`<p>${s}</p>`)}
    </div>

    ${user && user.id == recipe._ownerId ? controlsTemplate(recipe._id, onDelete) : null}
    
</article>`;

const controlsTemplate = (id, onDelete) => html`
<div class="controls">
    <a href="/recipes/edit/${id}"><button>\u270E Edit</button></a>
    <button @click=${onDelete}>\u2716 Delete</button>
</div>`;

export function detailsPage(ctx) {
    const recipe = getById(ctx.params.id);
    const userData = getUserData();

    ctx.render(detailsTemplate(recipe, userData, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${(await recipe).name}?`);

        if (choice) {
            await deleteRecipe(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}
