import { html } from '../lib.js';


export const itemCard = (item, user) => html`
<li class="card">
    <img src=${item.imageUrl} alt="travis"/>
    <p><strong>Brand: </strong><span class="brand">${item.brand}</span></p>
    <p>
        <strong>Model: </strong
        ><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>

    ${user ? html`<a class="details-btn" href="/catalog/details/${item._id}">Details</a>` : null}
</li>`;