import { editGame, getById } from '../api/data.js';
import { html } from '../lib.js';


const editTemplate = (game, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${game.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${game.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value=${game.summary}></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const game = await getById(ctx.params.id);
    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = [...formData.entries()]
        .reduce((acc, [k, v]) => Object.assign(acc, {[k]: v.trim()}), {});
        
        if (Object.values(data).some(x => x == '')) {
            return alert('All fields are required.');
        }

        await editGame(game._id, data);
        ctx.page.redirect('/games/details/' + game._id);
    }
}