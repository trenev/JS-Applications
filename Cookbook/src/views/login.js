import { login } from '../api/data.js';
import { html } from '../lib.js';


const loginTemplate = (onSubmit) => html`
<section id="login">
    <article>
        <h2>Login</h2>
        <form @submit=${onSubmit}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
    </article>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email == '' || password == '') {
            return alert('All fields are required.');
        }

        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}