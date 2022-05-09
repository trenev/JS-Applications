function attachEvents() {
    let input = document.querySelector('#location');
    const forecast = document.querySelector('#forecast');
    const btn = document.querySelector('#submit');

    btn.addEventListener('click', async () => {
        forecast.innerHTML = '<div id="current"><div class="label">Loading...</div></div>';
        forecast.style.display = 'block';

        try {
            const data = await getForecast(input.value);
            forecast.innerHTML = forecastRender(data);
        } catch (error) {
            forecast.innerHTML = '<div id="current"><div class="label">Error</div></div>';
        }
    });   
}

attachEvents();

async function getForecast(name) {
    const code = await getLocationCode(name);
    
    const [current, upcoming] = await Promise.all([
        getData('today', code),
        getData('upcoming', code),
    ]);

    return { current, upcoming };
}

async function getLocationCode(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    const res = await fetch(url);
    const data = await res.json();
    const locationCode = data.find(l => l.name == name);
    return locationCode.code;
}

async function getData(time, code) {
    const url = `http://localhost:3030/jsonstore/forecaster/${time}/${code}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
}

function forecastRender(data) {
    const conditions = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;',
    };

    return `
    <div id="current"><div class="label">Current condition</div><div class="forecasts">
    <span class="condition symbol">${conditions[data.current.forecast.condition]}</span><span class="condition">
    <span class="forecast-data">${data.current.name}</span><span class="forecast-data">${data.current.forecast.low}${conditions.Degrees}/${data.current.forecast.high}${conditions.Degrees}</span><span class="forecast-data">${data.current.forecast.condition}</span></span></div></div><div id="upcoming"><div class="label">Three-day forecast</div><div class="forecast-info"><span class="upcoming"><span class="symbol">${conditions[data.upcoming.forecast[0].condition]}</span><span class="forecast-data">${data.upcoming.forecast[0].low}${conditions.Degrees}/${data.upcoming.forecast[0].high}${conditions.Degrees}</span><span class="forecast-data">${data.upcoming.forecast[0].condition}</span></span><span class="upcoming"><span class="symbol">${conditions[data.upcoming.forecast[1].condition]}</span><span class="forecast-data">${data.upcoming.forecast[1].low}${conditions.Degrees}/${data.upcoming.forecast[1].high}${conditions.Degrees}</span><span class="forecast-data">${data.upcoming.forecast[1].condition}</span></span><span class="upcoming"><span class="symbol">${conditions[data.upcoming.forecast[2].condition]}</span><span class="forecast-data">${data.upcoming.forecast[2].low}${conditions.Degrees}/${data.upcoming.forecast[2].high}${conditions.Degrees}</span><span class="forecast-data">${data.upcoming.forecast[2].condition}</span></span></div>`;
}