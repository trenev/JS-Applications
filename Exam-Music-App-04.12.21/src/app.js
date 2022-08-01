import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { getUserData } from './utils.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';



const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/catalog/create', createPage);
page('/catalog/details/:id', detailsPage);
page('/catalog/details/edit/:id', editPage);
page('/catalog/search', searchPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        [...document.querySelectorAll('.user')].forEach(e => {
            e.style.display = 'inline';
        });
        [...document.querySelectorAll('.guest')].forEach(e => {
            e.style.display = 'none';
        });
    } else {
        [...document.querySelectorAll('.guest')].forEach(e => {
            e.style.display = 'inline';
        });
        [...document.querySelectorAll('.user')].forEach(e => {
            e.style.display = 'none';
        });
    }
}