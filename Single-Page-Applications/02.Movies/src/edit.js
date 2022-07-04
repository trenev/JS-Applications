import { showView } from './dom.js';
import { showDetails } from './details.js';

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', editMovie);

let id = null;

section.remove();

export function showEdit(movie) {
    showView(section);

    form.querySelector('[name="title"]').value = movie.title;
    form.querySelector('[name="description"]').value = movie.description;
    form.querySelector('[name="imageUrl"]').value = movie.img;
    id = movie._id;
}

async function editMovie(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();

    if (title == '' || description == '' || img == '') {
        alert('All fields must be filled.');
        return;
    }

    try {
        const userData = JSON.parse(localStorage.getItem('userData'));

        const res = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({ title, description, img })
        });

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        form.reset();
        showDetails(id);

    } catch (error) {
        alert(error.message);
    }
}
