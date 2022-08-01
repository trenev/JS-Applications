import { html } from '../lib.js';
import { getUserData } from '../utils.js';


export const albumTemplate = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${checkUserData(album._id)}
    </div>
</div>`;

function checkUserData(id) {
    const userData = getUserData();
    if (userData) {
        return html`
            <div class="btn-group">
                <a href="/catalog/details/${id}" id="details">Details</a>
            </div>`;
    } else {
        return null;
    }
}