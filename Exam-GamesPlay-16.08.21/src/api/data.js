import * as api from './api.js';


const endpoints = {
    latest: '/data/games?sortBy=_createdOn%20desc&distinct=category', 
    all: '/data/games?sortBy=_createdOn%20desc',
    byId: '/data/games/',
    create: '/data/games',
    edit: '/data/games/',
    delete: '/data/games/',
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGames() {
    return api.get(endpoints.all);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getLatestGames() {
    return api.get(endpoints.latest);
}

export async function createGame(data) {
    return api.post(endpoints.create, data);
}

export async function editGame(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteGame(id) {
    return api.del(endpoints.delete + id);
}

export async function getAllCommentsByGame(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(gameId, comment) {
    return api.post('/data/comments', {gameId, comment});
}
