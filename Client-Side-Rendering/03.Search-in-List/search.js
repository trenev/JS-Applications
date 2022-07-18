import {html, render} from 'https://unpkg.com/lit-html?module';
import {towns as names} from './towns.js';


const listTemplate = (towns) => html`
<ul>
   ${towns.map(t => html`<li class="${t.match ? 'active' : ''}">${t.name}</li>`)}
</ul>`;

const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch);

const towns = names.map(t => ({name: t, match: false}));
update();

function update() {
   render(listTemplate(towns), document.getElementById('towns'));
}

function onSearch() {
   const town = input.value.trim().toLocaleLowerCase();
   let result = 0;

   towns.forEach(t => {
      if (town && t.name.toLocaleLowerCase().includes(town)) {
         result ++;
         t.match = true;
      } else {
         t.match = false;
      }
   });

   if (result) {
      output.textContent = `${result} matches found`;
   } else {
      output.textContent = '';
   }

   update();
}