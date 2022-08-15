import { createItem } from '../api/data.js';
import { html } from '../lib.js';


const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
    <h2>Add item</h2>
    <form @submit=${onSubmit} class="create-form">
        <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        />
        <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        />
        <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        />
        <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        />
        <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        />
        <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = [... formData.entries()]
        .reduce((acc, [k, v]) => Object.assign(acc, {[k]: v.trim()}), {});

        if (Object.values(data).some(f => f == '')) {
            return alert('All fields are required.');
        }

        await createItem(data);
        ctx.page.redirect('/catalog');
    }
}