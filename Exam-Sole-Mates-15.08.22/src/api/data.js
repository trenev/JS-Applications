import * as api from './api.js';


const endpoints = {
    sortedItems: '/data/shoes?sortBy=_createdOn%20desc',
    items: '/data/shoes',
    itemById: '/data/shoes/',
    search: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems() {
    return await api.get(endpoints.sortedItems);
}

export async function getItemById(id) {
    return api.get(endpoints.itemById + id);
}

export async function createItem(data) {
    return api.post(endpoints.items, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.itemById + id, data);
}

export async function deleteItem(id) {
    return api.del(endpoints.itemById + id);
}

export async function searchItem(query) {
    return api.get(endpoints.search(query));
}

