import { deleteItem, getItemById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (item, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
        <img src=${item.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${item.brand}</span></p>
        <p>
        Model: <span id="details-model">${item.model}</span>
        </p>
        <p>Release date: <span id="details-release">${item.release}</span></p>
        <p>Designer: <span id="details-designer">${item.designer}</span></p>
        <p>Value: <span id="details-value">${item.value}</span></p>
    </div>

    ${isOwner ? controls(item, onDelete) : null}
    
    </div>
</section>`;

const controls = (item, onDelete) => html`
<div id="action-buttons">
    <a href="/catalog/details/edit/${item._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>`;


export async function detailsPage(ctx) {
    const item = await getItemById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && userData.id == item._ownerId;

    ctx.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${item.model}?`);

        if (choice) {
            await deleteItem(item._id);
            ctx.page.redirect('/catalog');
        }
    }
}