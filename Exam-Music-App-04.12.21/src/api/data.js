import * as api from './api.js';

const endpoints = {
    all: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/albums/',
    create: '/data/albums',
    edit: '/data/albums/',
    delete: '/data/albums/',
    search: '/data/albums?where='
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function createAlbum(data) {
    return api.post(endpoints.create, data);
}

export async function editAlbum(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteAlbum(id) {
    return api.del(endpoints.delete + id);
}

export async function searchAlbum(query) {
    return api.get(endpoints.search + encodeURIComponent(`name LIKE "${query}"`));
}