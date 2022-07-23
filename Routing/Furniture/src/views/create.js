import { createItem } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (onSubmit, errorMsg, fields) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (fields.make ? ' is-invalid' : '')} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (fields.model ? ' is-invalid' : '')} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (fields.year ? ' is-invalid' : '')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (fields.description ? ' is-invalid' : '')} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (fields.price ? ' is-invalid' : '')} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (fields.img ? ' is-invalid' : '')} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create"/>
        </div>
    </div>
</form>`;


export function createPage(ctx) {
    update(null, {});

    function update(errorMsg, fields) {
        ctx.render(createTemplate(onSubmit, errorMsg, fields)); 
    }

    async function onSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const make = formData.get('make').trim();
        const model = formData.get('model').trim();
        const year = formData.get('year').trim();
        const description = formData.get('description').trim();
        const price = formData.get('price').trim();
        const img = formData.get('img').trim();
        const material = formData.get('material').trim();
        
        try {
            if (make.length < 4 || model.length < 4 || description.length < 11 || img == '' ||price <= 0 || year < 1950 || year > 2050) {
                throw {
                    error: new Error('All mandatory fields must be filled.'),
                    fields: {
                        make: make.length < 4,
                        model: model.length < 4,
                        description: description.length < 11,
                        img: img == '',
                        price: price <= 0,
                        year: year < 1950 || year > 2050,
                    }
                };
            }

            const data = {
                make,
                model,
                year: Number(year),
                description,
                price: Number(price),
                img,
                material
            };

            await createItem(data);
            ctx.page.redirect('/');
        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.fields || {});
        }
    }
}