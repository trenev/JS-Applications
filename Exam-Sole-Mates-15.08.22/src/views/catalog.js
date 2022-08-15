import { getAllItems } from '../api/data.js';
import { html } from '../lib.js';
import { itemCard } from './common.js';


const catalogTemplate = (items) => html`
<section id="dashboard">
    <h2>Collectibles</h2>

    ${items.length == 0 ? html`<h2>There are no items added yet.</h2>` 
                        : html`<ul class="card-wrapper">${items.map(i => itemCard(i, true))}</ul>`}
    
</section>`;

export async function catalogPage(ctx) {
    const items = await getAllItems();
    ctx.render(catalogTemplate(items));
}