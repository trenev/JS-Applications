async function solution() {
    const section = document.querySelector('#main');
    section.replaceChildren();

    section.addEventListener('click', showContent);

    const titles = await getTitlesList();
    titles.forEach(t => {
        const article = document.createElement('div');
        article.classList.add('accordion');
        article.innerHTML = `
<div class="head">
    <span>${t.title}</span>
    <button class="button" id="${t._id}">More</button>
</div>
<div class="extra">
    <p></p>
</div>`;

        section.appendChild(article);
    });
}

solution();

async function getTitlesList() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getContent(id) {
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.content;
}

async function showContent(e) {
    if (e.target.tagName == 'BUTTON') {
        const btn = e.target;
        btn.disabled = true;
        const hiddenDiv = btn.parentElement.nextElementSibling;
        
        const id =  btn.id;
        const content  = await getContent(id);
        hiddenDiv.firstChild.textContent = content;
        
        if (btn.textContent == 'More') {
            btn.textContent = 'Less';
            hiddenDiv.className = '';
        } else {
            btn.textContent = 'More';
            hiddenDiv.className = 'extra';
        }

        btn.disabled = false;
    } else {
        return;
    }
}