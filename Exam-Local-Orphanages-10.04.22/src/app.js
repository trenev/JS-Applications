import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { getUserData } from './utils.js';
import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myPostsPage } from './views/profile.js';
import { registerPage } from './views/register.js';


const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-posts', myPostsPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/details/edit/:id', editPage);

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
        document.getElementById('user').style.display = 'inline';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline';
    }
}