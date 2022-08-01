import { getMyItems } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const profileTemplate = (events, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="/images/profilePic.png">
        </div>
        <h2>${user}</h2>
    </div>
    <div class="board">

        ${events.length == 0 ? html`
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>` 
            : events.map(eventTemplate)}
        
    </div>
</section>`;

const eventTemplate = (event) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${event.imageUrl}>
        <h2>${event.title}</h2>
        <h6>${event.date}</h6>
        <a href="/details/${event._id}" class="details-button">Details</a>
    </div>
</div>`;

export async function profilePage(ctx) {
    const userData = getUserData();
    if (userData == undefined) {
        return ctx.page.redirect('/login');
    }
    
    const events = await getMyItems(userData.id);
    ctx.render(profileTemplate(events, userData.email));
}