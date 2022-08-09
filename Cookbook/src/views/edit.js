import { editRecipe, getById } from '../api/data.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';


const editTemplate = (dataPromise) => html`
<section id="edit">
    
    ${until(dataPromise, spinner())}
    
</section>`;

const formTemplate = (recipe, onSubmit) => html`
<article>
<h2>Edit Recipe</h2>
    <form @submit=${onSubmit}>
        <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${recipe.name}></label>
        <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
        <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines" .value=${recipe.ingredients.join('\n')}></textarea></label>
        <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines" .value=${recipe.steps.join('\n')}></textarea></label>
        <input type="submit" value="Save Changes">
    </form>
</article>`;

export async function editPage(ctx) {
    ctx.render(editTemplate(loadData(ctx.params.id, onSubmit)));
    
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name').trim();
        const img = formData.get('img').trim();
        const ingredients = formData.get('ingredients').trim().split('\n');
        const steps = formData.get('steps').trim().split('\n');

        if (name == '' || img == '' || ingredients == '' || steps == '') {
            return alert('All fields are required.');
        }

        await editRecipe(ctx.params.id, {
            name,
            img,
            ingredients,
            steps
        });
        ctx.page.redirect('/recipes/details/' + ctx.params.id);
    }
}

async function loadData(id, onSubmit) {
    const recipe = await getById(id);
    return formTemplate(recipe, onSubmit);
}