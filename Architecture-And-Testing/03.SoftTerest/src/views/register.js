import { register } from '../api/api.js';

let ctx = null;

const section = document.getElementById('registerPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.querySelector('.alreadyUser > a').addEventListener('click', (event) => {
    event.preventDefault();
    ctx.goTo('login');
});

export function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repeatPassword').trim();

    if (!email || !password) {
        return alert('All fields are required!');
    }
    if (password != repass) {
        return alert('Passwords do not match!');
    }

    await register(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
}