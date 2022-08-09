import { getAllPosts } from '../api/data.js';
import { html } from '../lib.js';
import { postCardTemplate } from './common.js';


const dashboardTemplate = (posts) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    ${posts.length == 0 
        ? html`<h1 class="title no-posts-title">No posts yet!</h1>` 
        : html`<div class="all-posts">${posts.map(postCardTemplate)}</div>`}
    
</section>`;

export async function dashboardPage(ctx) {
    const posts = await getAllPosts();
    ctx.render(dashboardTemplate(posts));
}