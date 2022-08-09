import { createDonation, deletePost, getDonationCountByPostId, getDonationForPostByUserId, getPostById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (post, user, donationCount, hasDonation, onDelete, onDonate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${post.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: ${donationCount}</p>

                ${user ? html`
                            <div class="btns">${controlsTemplate(post, user, hasDonation, onDelete, onDonate)}
                            </div>` 
                        : null}
                
            </div>
        </div>
    </div>
</section>`;

function controlsTemplate(post, user, hasDonation, onDelete, onDonate) {
    if (user.id == post._ownerId) {
        return html`
        <a href="/details/edit/${post._id}" class="edit-btn btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`;
    } else {
        if (!hasDonation) {
            return html`
            <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`;
        }
    }
}

export async function detailsPage(ctx) {
    const userData = getUserData();

    let [post, donationCount, hasDonation] = await Promise.all([
        getPostById(ctx.params.id),
        getDonationCountByPostId(ctx.params.id),
        userData ? getDonationForPostByUserId(ctx.params.id, userData.id) : 0
    ]);

    renderTemplate(post, userData, donationCount, hasDonation, onDelete, onDonate);

    function renderTemplate(post, userData, donationCount, hasDonation, onDelete, onDonate) {
        ctx.render(detailsTemplate(post, userData, donationCount, hasDonation, onDelete, onDonate));
    }

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${post.title}?`);

        if (choice) {
            await deletePost(post._id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        await createDonation(post._id);
        renderTemplate(post, userData, donationCount += 1, 1, onDelete, onDonate);
    }
}