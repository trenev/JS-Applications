import * as api from './api.js';

const endpoints = {
    all: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/',
    myBooks: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/books',
    edit: '/data/books/',
    delete: '/data/books/',
    like: '/data/likes',
    allLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    likesByUser: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    search: '/data/books?where='
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllBooks() {
    return api.get(endpoints.all);
}

export async function getMyBooks(userId) {
    return api.get(endpoints.myBooks(userId));
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function createBook(data) {
    return api.post(endpoints.create, data);
}

export async function editBook(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteBook(id) {
    return api.del(endpoints.delete + id);
}

export async function likeBook(bookId) {
    return api.post(endpoints.like, bookId);
}

export async function getAllLikes(bookId) {
    return api.get(endpoints.allLikes(bookId));
}

export async function getLikesByUser(bookId, userId) {
    return api.get(endpoints.likesByUser(bookId, userId));
}

export async function searchBooks(query) {
    return api.get(endpoints.search + encodeURIComponent(`title LIKE "${query}"`));
}