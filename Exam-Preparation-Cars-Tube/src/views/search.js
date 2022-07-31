import { searchCars } from '../api/data.js';
import { html } from '../lib.js';
import { carTemplate } from './common.js';


const searchTemplate = (cars, onChange, onSearch, params = '') => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input @input=${onChange} id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${params}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${cars == 0 
                ? html`<p class="no-cars"> No results.</p>` 
                : cars.map(carTemplate)}
    </div>
</section>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let cars = [];
    let search = '';

    if (params) {
        cars = await searchCars(params);
    }

    const onSearchChange = (event) => {
        search = event.target.value;
    };

    const onSearchClick = () => {
        if (search) {
            ctx.page.redirect('/search?query=' + search);
        }
    };
    
    ctx.render(searchTemplate(cars, onSearchChange, onSearchClick, params));
}