import * as api from './api.js';

const endpoints = {
    all: '/data/cars?sortBy=_createdOn%20desc',
    byId: '/data/cars/',
    myCars: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/cars',
    edit: '/data/cars/',
    delete: '/data/cars/',
    search: (query) => `/data/cars?where=year%3D${query}`
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllCars() {
    return api.get(endpoints.all);
}

export async function getMyCars(userId) {
    return api.get(endpoints.myCars(userId));
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function createCar(data) {
    return api.post(endpoints.create, data);
}

export async function editCar(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteCar(id) {
    return api.del(endpoints.delete + id);
}

export async function searchCars(query) {
    return api.get(endpoints.search(query));
}