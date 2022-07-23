import { getAll, getMyItems } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../utils.js';

const catalogTemplate = (dataPromise, userItems) => html`
<div class="row space-top">
    <div class="col-md-12">
        ${userItems 
            ? html`
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>` 
            : html`
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>`}  
    </div>    
</div>
<div class="row space-top">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
</div>`;

const itemTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="${item.img}" />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${item._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

export function catalogPage(ctx) {
    const userItems = ctx.pathname == '/my-furniture';
    ctx.render(catalogTemplate(loadItems(userItems), userItems));
}

async function loadItems(userItems) {
    let items = [];
    if (userItems) {
        const userId = getUserData().id;
        items = await getMyItems(userId);
    } else {
        items = await getAll();
    }
    
    return items.map(itemTemplate);
}