import { register } from '../api/data.js';
import { html } from '../lib.js';

const registerTemplate = (onSubmit, errorMsg, fields) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (fields.email ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (fields.password ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${'form-control' + (fields.rePass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export function registerPage(ctx) {
    update(null, {});

    function update(errorMsg, fields) {
        ctx.render(registerTemplate(onSubmit , errorMsg, fields)); 
    }
    
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        try {
            if (email == '' || password == '') {
                throw {
                    error: new Error('All fields are required.'),
                    fields: {
                        email: email == '',
                        password: password == '',
                        rePass: rePass == ''
                    }
                };
            }
            if (password != rePass) {
                throw {
                    error: new Error('Passwords do not match.'),
                    fields: {
                        password: true,
                        rePass: true
                    }
                };
            }

            await register(email, password);
            ctx.updateUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.fields || {});
        }
    }
}