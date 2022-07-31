import { getMyCars } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';
import { carTemplate } from './common.js';


const myCarsTemplate = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${cars == 0 
                ? html`<p class="no-cars"> You haven't listed any cars yet.</p>` 
                : cars.map(carTemplate)}
    </div>
</section>`;

export async function myCarsPage(ctx) {
    const userData = getUserData();
    let cars = [];

    if (userData) {
        cars = await getMyCars(userData.id);
    }

    ctx.render(myCarsTemplate(cars));
}