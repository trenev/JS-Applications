import {html, render} from 'https://unpkg.com/lit-html?module';

const listTemplate = (towns) => html`
<ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`;

const div = document.getElementById('root');
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const towns = document.getElementById('towns')
    .value.split(',').map(t => t.trim());
    
    render(listTemplate(towns), div);
});





