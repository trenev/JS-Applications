import { createRecipe } from '../api/data.js';
import { html } from '../lib.js';


const createTemplate = (onSubmit) => html`
<section id="create">
    <article>
        <h2>New Recipe</h2>
        <form @submit=${onSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label class="ml">Ingredients: <textarea name="ingredients"
                    placeholder="Enter ingredients on separate lines"></textarea></label>
            <label class="ml">Preparation: <textarea name="steps"
                    placeholder="Enter preparation steps on separate lines"></textarea></label>
            <input type="submit" value="Create Recipe">
        </form>
    </article>
</section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

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

        await createRecipe({
            name,
            img,
            ingredients,
            steps
        });
        ctx.page.redirect('/');
    }
}