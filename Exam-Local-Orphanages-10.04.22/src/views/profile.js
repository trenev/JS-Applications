import { getMyPosts } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';
import { postCardTemplate } from './common.js';


const myPostsTemplate = (posts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    ${posts.length == 0 
        ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>` 
        : html`<div class="my-posts">${posts.map(postCardTemplate)}</div>`}
    
</section>`;

export async function myPostsPage(ctx) {
    const userData = getUserData();
    const posts = await getMyPosts(userData.id);
    ctx.render(myPostsTemplate(posts));
}
