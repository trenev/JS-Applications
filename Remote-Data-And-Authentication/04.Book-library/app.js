const table = document.querySelector('tbody');
const createForm = document.querySelector('#createForm');
const editForm = document.querySelector('#editForm');

document.querySelector('#loadBooks').addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreate);
editForm.addEventListener('submit', onEditSave);
table.addEventListener('click', onTableClick);

loadBooks();

function onTableClick(event) {
    if (event.target.className == 'edit') {
        onEdit(event.target);
    } else if (event.target.className == 'delete') {
        onDelete(event.target);   
    }
}

async function onCreate(event) {
    event.preventDefault();
    
    const formData = new FormData(createForm);
    const title = formData.get('title');
    const author = formData.get('author');

    if (title == '' || author == '') {
        return;
    }

    const result = await createBook({ author, title });
    table.appendChild(createTableRow(result._id, result));

    createForm.reset();
}

async function onEditSave(event) {
    event.preventDefault();

    const formData = new FormData(editForm);
    const id = formData.get('id');
    const title = formData.get('title');
    const author = formData.get('author');

    await updateBook(id, { author, title });

    const tableElement = table.querySelector(`[data-id="${id}"]`);
    tableElement.previousElementSibling.textContent = author;
    tableElement.previousElementSibling.previousElementSibling.textContent = title;

    editForm.reset();
    editForm.style.display = '';
    createForm.style.display = 'block';
}

async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await getBookById(id);
    
    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
}

async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id);
    button.parentElement.parentElement.remove();
}

async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    
    const result = Object.entries(books)
    .map(([id, book]) => createTableRow(id, book));

    table.replaceChildren(...result);
}

async function getBookById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

async function createBook(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book),
    });
    return result;
}

async function updateBook(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book),
    });
    return result;
}

async function deleteBook(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
    return result;
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const response = await fetch(url, options);

        if (response.statusText != 'OK') {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}

function createTableRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td data-id=${id}>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
</td>`;
    
    return row;
}