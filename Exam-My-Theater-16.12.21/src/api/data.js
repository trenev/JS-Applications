import * as api from './api.js';

const endpoints = {
    all: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    byId: '/data/theaters/',
    getMyItems: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/theaters',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
    likeItem: '/data/likes',
    itemLikesCount: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    itemLikesByUser: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllTheaters() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getMyItems(userId) {
    return api.get(endpoints.getMyItems(userId));
}

export async function createTheater(data) {
    return api.post(endpoints.create, data);
}

export async function editTheater(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteTheater(id) {
    return api.del(endpoints.delete + id);
}

export async function likeTheater(theaterId) {
    return api.post(endpoints.likeItem, {theaterId});
}

export async function getLikesByTheaterId(theaterId) {
    return api.get(endpoints.itemLikesCount(theaterId));
}

export async function getMyLikeByTheaterId(theaterId, userId) {
    return api.get(endpoints.itemLikesByUser(theaterId, userId));
}
