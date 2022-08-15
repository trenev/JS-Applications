import { editItem, getItemById } from '../api/data.js';
import { html } from '../lib.js';


const editTemplate = (item, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onSubmit} class="edit-form">
        <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        .value=${item.brand}
        />
        <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        .value=${item.model}
        />
        <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        .value=${item.imageUrl}
        />
        <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        .value=${item.release}
        />
        <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        .value=${item.designer}
        />
        <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        .value=${item.value}
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const item = await getItemById(ctx.params.id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = [... formData.entries()]
        .reduce((acc, [k, v]) => Object.assign(acc, {[k]: v.trim()}), {});

        if (Object.values(data).some(f => f == '')) {
            return alert('All fields are required.');
        }

        await editItem(item._id, data);
        ctx.page.redirect('/catalog/details/' + item._id);
    }
}