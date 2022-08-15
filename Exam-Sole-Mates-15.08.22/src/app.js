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


const root = document.querySelector('main');
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
    page.redirect('/catalog');
}

function updateUserNav() {
    const userData = getUserData();
    
    if (userData) {
        document.querySelector('.user').style.display = 'inline';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline';
    }
}