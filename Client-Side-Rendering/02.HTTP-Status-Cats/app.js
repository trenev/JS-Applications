import {html, render} from 'https://unpkg.com/lit-html?module';
import {cats} from './catSeeder.js';

const catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => onTogle(cat)} class="showBtn">Show status code</button>
        ${cat.info ? html`<div class="status" id="${cat.id}">
            <h4 class="card-title">Status Code: ${cat.catusCode}</h4>
            <p class="card-text">${cat.statusMessage}</p>
        </div>` : null}
    </div>
</li>`;

const section = document.getElementById('allCats');
cats.forEach(c => c.info = false);
update();

function update() {
    render(html`<ul>${cats.map(catTemplate)}</ul>`, section);
}

function onTogle(cat) {
    cat.info = !cat.info;
    update();
}