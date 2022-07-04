import { showView } from './dom.js';
import { showHome } from './home.js';

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', addMovie);

section.remove();

export function showCreate() {
    showView(section);
}

async function addMovie(event) {
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

        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
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
        showHome();

    } catch (error) {
        alert(error.message);
    }
}