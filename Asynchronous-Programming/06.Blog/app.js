function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function getAllPosts() {
    const h1 = document.querySelectorAll('h1')[0];
    const postsTitles = document.getElementById('posts');
    postsTitles.replaceChildren();

    const url = 'http://localhost:3030/jsonstore/blog/posts';

    try {
        h1.textContent = 'Loading...';
        const response = await fetch(url);
        const data = await response.json();

        for (const key in data) {
            const optionElement = document.createElement('option');
            optionElement.textContent = data[key].title;
            optionElement.value = data[key].id;
            postsTitles.appendChild(optionElement);
        
        h1.textContent = 'Load Posts';
    }
    } catch (error) {
        h1.textContent = 'Error';
    }
}

async function displayPost() {
    const postId = document.getElementById('posts').value;
    const comments = document.querySelector('#post-comments');
    comments.replaceChildren();

    const data = await getPostAndComments(postId);
    
    document.querySelectorAll('h1')[1].textContent = data.post.title;
    document.querySelector('#post-body').textContent = data.post.body;

    data.comments.forEach(c => {
        const comment = document.createElement('li');
        comment.textContent = c.text;
        comments.appendChild(comment);
    });    
}

async function getPostById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getCommentsById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';

    const response = await fetch(url);
    const data = await response.json();
    const comments = Object.values(data).filter(c => c.postId == postId);
    return comments;
}

async function getPostAndComments(postId) {
    const h1 = document.querySelectorAll('h1')[1];

    try {
        h1.textContent = 'Loading...';

        const [post, comments] = await Promise.all([
            getPostById(postId),
            getCommentsById(postId),
        ]);

        // h1.textContent = 'Post Details'; 
        return { post, comments };
    } catch (error) {
        h1.textContent = 'Error';
    }   
}