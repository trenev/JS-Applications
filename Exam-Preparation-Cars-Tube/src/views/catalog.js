import { getAllCars } from '../api/data.js';
import { html } from '../lib.js';
import { carTemplate } from './common.js';


const catalogTemplate = (cars) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${cars == 0 
            ? html`<p class="no-cars">No cars in database.</p>` 
            : cars.map(carTemplate)}
    </div>
</section>`;

export async function catalogPage(ctx) {
    const cars = await getAllCars();
    ctx.render(catalogTemplate(cars));
}