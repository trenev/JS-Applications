import { register } from '../api/data.js';
import { html } from '../lib.js';


const registerTemplate = (onSubmit) => html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form @submit=${onSubmit}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </article>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('rePass').trim();

        if (email == '' || password == '') {
            return alert('All fields are required.');
        }
        if (password != repass) {
            return alert('Passwords don\'t match.');
        }

        await register(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}