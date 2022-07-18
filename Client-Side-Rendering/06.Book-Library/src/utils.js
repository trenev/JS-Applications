import {html, render} from '../node_modules/lit-html/lit-html.js';
import {until} from '../node_modules/lit-html/directives/until.js';

const host = 'http://localhost:3030/jsonstore/collections';

async function request(url, method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();

    } catch (err) {
        alert(err.message);
    }
}

async function getBooks() {
    return request('/books');
}

async function getById(id) {
    return request('/books/' + id);
}

async function createBook(book) {
    return request('/books', 'post', book);
}

async function editBook(id, book) {
    return request('/books/' + id, 'put', book);
}

async function deleteBook(id) {
    return request('/books/' + id, 'delete');
}

export {
    html,
    render,
    until,
    getBooks,
    getById,
    createBook,
    editBook,
    deleteBook
};