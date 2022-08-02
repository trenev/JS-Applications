import { addDonation, deletePet, getById, getTotalDantionsByPet, getDonationForPetByUser } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (pet, userData, donation, hasDonate, onDelete, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donation}$</h4>
            </div>
            
            ${userData ? html`
            <div class="actionBtn">
                ${controlsTemplate(userData, pet, hasDonate, onDelete, onDonate)}
            </div>` : null}
            
        </div>
    </div>
</section>`;

function controlsTemplate(userData, pet, hasDonate, onDelete, onDonate) {
    if (userData.id == pet._ownerId) {
        return html`
            <a href="/pets/edit/${pet._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`;
    } else {
        return hasDonate ? null : html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`;
    }
}

export async function detailsPage(ctx) {
    const userData = getUserData();

    const [pet, donationsCount, hasDonate] = await Promise.all([
        await getById(ctx.params.id),
        await getTotalDantionsByPet(ctx.params.id),
        userData ? await getDonationForPetByUser(ctx.params.id, userData.id) : 0
    ]);

    const donationSum = donationsCount * 100;

    ctx.render(detailsTemplate(pet, userData, donationSum, hasDonate, onDelete, onDonate));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${pet.name}?`);

        if (choice) {
            await deletePet(pet._id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        await addDonation(pet._id);
        ctx.page.redirect('/pets/details/' + pet._id);
    }
}