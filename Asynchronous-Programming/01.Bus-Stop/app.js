async function getInfo() {
    const btn = document.getElementById('submit');
    btn.disabled = true;

    const stopName = document.getElementById('stopName');
    const timeTable = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;

    timeTable.replaceChildren();
    stopName.textContent = 'Loading...';

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error('Stop ID not found.');
        }

        const data = await res.json();
        
        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTable.appendChild(liElement);
        });
    } catch (error) {
        stopName.textContent = 'Error';
    }

    btn.disabled = false;
}