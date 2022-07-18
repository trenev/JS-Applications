import {html, render} from 'https://unpkg.com/lit-html?module';

const tableTemplate = (student) => html`
<tr class="${student.match ? 'select' : ''}">
   <td>${student.item.firstName} ${student.item.lastName}</td>
   <td>${student.item.email}</td>
   <td>${student.item.course}</td>
</tr>`;

const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);
let data;

getStudents();


function onSearch() {
   const value = input.value.trim().toLocaleLowerCase();
   input.value = '';

   for (let student of data) {
      student.match = Object.values(student.item).some(v => value && v.toLocaleLowerCase().includes(value));
   }
   
   update();
}

async function getStudents() {
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   data = Object.values(await res.json())
      .map(x => ({item: x, match: false}));

   update();
}

 function update() {
   render(data.map(tableTemplate), document.querySelector('tbody'));
}

