const main = document.querySelector('main');

export function showView(...section) {
    main.replaceChildren(...section);
}

export function createTopicElement(data) {
    const element = document.createElement('div');
    element.className = 'topic-name-wrapper';
    element.id = data._id;
    element.innerHTML = `
<div class="topic-name">
    <a href="#" class="normal">
        <h2>${data.topic}</h2>
    </a>
    <div class="columns">
        <div>
            <p>Date: <time>${data.date}</time></p>
            <div class="nick-name">
                <p>Username: <span>${data.user}</span></p>
            </div>
        </div>
    </div>
</div>`;

    return element;
}

export function createCommentElement(data) {
    const time = data.date.split('.')[0]
    .split('T').join(' ').split(' ').join(', ').split('-').join('/');

    const element = document.createElement('div');
    element.className = 'topic-name-wrapper';
    element.innerHTML = `
<div class="topic-name">
    <p><strong>${data.user}</strong> commented on <time>${time}</time></p>
    <div class="post-content">
        <p>${data.post}</p>
    </div>
</div>`;

    return element;
}