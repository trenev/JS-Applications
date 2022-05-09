function solve() {
    const infoBox = document.querySelector('#info span');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let busStop = {
        next: 'depot',
        name: '',
    };

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;

        departBtn.disabled = true;
        infoBox.textContent = 'Loading...';

        try {
            const res = await fetch(url);
            busStop = await res.json();
            infoBox.textContent = `Next stop ${busStop.name}`;

            arriveBtn.disabled = false;
        } catch (error) {
            infoBox.textContent = 'Error';
        }
    }

    function arrive() {
        arriveBtn.disabled = true;

        infoBox.textContent = `Arriving at ${busStop.name}`;

        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();