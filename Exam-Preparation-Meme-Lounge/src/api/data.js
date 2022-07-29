import * as api from './api.js';

const endpoints = {
    all: '/data/memes?sortBy=_createdOn%20desc',
    byId: '/data/memes/',
    myMemes: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/memes',
    edit: '/data/memes/',
    delete: '/data/memes/'
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllMemes() {
    return api.get(endpoints.all);
}

export async function getMyMemes(userId) {
    return api.get(endpoints.myMemes(userId));
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function createMeme(data) {
    return api.post(endpoints.create, data);
}

export async function editMeme(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteMeme(id) {
    return api.del(endpoints.delete + id);
}

