import {deleteBook, getBooks, html, until} from './utils.js';

const catalogTemplate = (booksPromise) => html`
<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${until(booksPromise, html`<tr><td colspan="3">Loading&hellip;</td></tr>`)}    
        </tbody>
    </table>`;

const bookRow = (book, onEdit, onRemove) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${onEdit}>Edit</button>
        <button @click=${onRemove}>Delete</button>
    </td>
</tr>`;

export function showCatalog(ctx) {
    return catalogTemplate(loadBooks(ctx));
}

async function loadBooks(ctx) {
    const data = await getBooks();
    const books = Object.entries(data).map(([k, v]) => Object.assign(v, {_id: k}));
    
    return Object.values(books)
    .map(book => bookRow(book, togleEditor.bind(null, book, ctx), onDelete.bind(null, book._id, ctx)));
}

function togleEditor(book, ctx) {
    ctx.book = book;
    ctx.update();
}

async function onDelete(id, ctx) {
    await deleteBook(id);
    ctx.update();
}