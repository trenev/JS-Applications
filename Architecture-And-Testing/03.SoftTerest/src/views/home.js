const section = document.getElementById('homePage');
section.remove();
section.querySelector('#getStartedLink').addEventListener('click', (event) => {
    event.preventDefault();
    ctx.goTo('catalog');
});

let ctx = null;

export function showHomePage(ctxTrget) {
    ctx = ctxTrget;
    ctx.showSection(section);
}