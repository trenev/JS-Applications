import * as api from './api.js';


export const PAGE_SIZE = 5;

const endpoints = {
    RECIPE_LIST: '/data/recipes?select=_id%2Cname%2Cimg',
    RECIPE_COUNT: '/data/recipes?count',
    RECENT_RECIPES: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3',
    RECIPES: '/data/recipes',
    RECIPE_BY_ID: '/data/recipes/',
    COMMENTS: '/data/comments',
    COMMENT_BY_ID: '/data/comments/',
    COMMENTS_BY_RECIPE_ID: '/data/comments?where=' + encodeURIComponent('recipeId='),
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getRecipes(page, search) {
    let url = endpoints.RECIPE_LIST + `&offset=${(page - 1) * PAGE_SIZE}&pageSize=${PAGE_SIZE}`;
    if (search) {
        url += '&where=' + encodeURIComponent(`name like "${search}"`);
    }
    return await api.get(url);
}

export async function getRecipesCount(search) {
    let url = endpoints.RECIPE_COUNT;
    if (search) {
        url += '&where=' + encodeURIComponent(`name like "${search}"`);
    }
    return api.get(url);
}

export async function getLatestRecipies() {
    return api.get(endpoints.RECENT_RECIPES);
}

export async function getById(id) {
    return api.get(endpoints.RECIPE_BY_ID + id);
}

export async function createRecipe(data) {
    return api.post(endpoints.RECIPES, data);
}

export async function editRecipe(id, data) {
    return api.put(endpoints.RECIPE_BY_ID + id, data);
}

export async function deleteRecipe(id) {
    return api.del(endpoints.RECIPE_BY_ID + id);
}

export async function getAllCommentsByRecipe(recipeId) {
    return api.get(endpoints.COMMENTS_BY_RECIPE_ID + encodeURIComponent(`"${recipeId}"`) + '&load=' + encodeURIComponent('author=_ownerId:users'));
}

export async function createComment(recipeId, content) {
    const result = await api.post(endpoints.COMMENTS, {recipeId, content});
    return await api.get(endpoints.COMMENT_BY_ID + result._id + '?load=' + encodeURIComponent('author=_ownerId:users'));
}
