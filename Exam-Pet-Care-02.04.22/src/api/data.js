import * as api from './api.js';

const endpoints = {
    all: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    byId: '/data/pets/',
    create: '/data/pets',
    edit: '/data/pets/',
    delete: '/data/pets/',
    donate: '/data/donation',
    totalDonations: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    hasDonate: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllPets() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function createPet(data) {
    return api.post(endpoints.create, data);
}

export async function editPet(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deletePet(id) {
    return api.del(endpoints.delete + id);
}

export async function addDonation(petId) {
    return api.post(endpoints.donate, {petId});
}

export async function getTotalDantionsByPet(petId) {
    return api.get(endpoints.totalDonations(petId));
}

export async function getDonationForPetByUser(petId, userId) {
    return api.get(endpoints.hasDonate(petId, userId));
}
