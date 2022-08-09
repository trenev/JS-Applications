import * as api from './api.js';


const endpoints = {
    POST_LIST: '/data/posts?sortBy=_createdOn%20desc',
    MY_POSTS: '/data/posts?where=_ownerId%3D',
    POSTS: '/data/posts',
    POST_BY_ID: '/data/posts/',
    DONATIONS: '/data/donations',
    DONATION_BY_POST_ID: '/data/donations?where=postId%3D',
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllPosts() {
    return await api.get(endpoints.POST_LIST);
}

export async function getMyPosts(userId) {
    return api.get(endpoints.MY_POSTS + encodeURIComponent(`"${userId}"`) + '&sortBy=_createdOn%20desc');
}

export async function getPostById(id) {
    return api.get(endpoints.POST_BY_ID + id);
}

export async function createPost(data) {
    return api.post(endpoints.POSTS, data);
}

export async function editPost(id, data) {
    return api.put(endpoints.POST_BY_ID + id, data);
}

export async function deletePost(id) {
    return api.del(endpoints.POST_BY_ID + id);
}

export async function createDonation(postId) {
    return api.post(endpoints.DONATIONS, {postId});
}

export async function getDonationCountByPostId(postId) {
    return api.get(endpoints.DONATION_BY_POST_ID + encodeURIComponent(`"${postId}"`) + '&distinct=_ownerId&count');
}

export async function getDonationForPostByUserId(postId, userId) {
    return api.get(endpoints.DONATION_BY_POST_ID + encodeURIComponent(`"${postId}"`) + '%20and%20_ownerId%3D' + encodeURIComponent(`"${userId}"`) + '&count');
}