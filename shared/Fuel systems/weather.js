const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=53.7939&longitude=-1.7521&hourly=temperature_2m';

async function fetchHourlyWeather() {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        
        // The API returns two parallel arrays: one for times, one for temperatures
        const times = data.hourly.time;
        const temps = data.hourly.temperature_2m;

        console.log('\n📅 Hourly Temperature Forecast');
        console.log('===================================');
        
        // Loop through just the first 5 hours to keep the terminal clean
        for (let i = 0; i < 5; i++) {
            const timeString = times[i].replace('T', ' '); // Make the date look nicer
            console.log(`${timeString}  |  ${temps[i]}°C`);
        }
        console.log('===================================\n');

    } catch (error) {
        console.error("Error retrieving weather data:", error.message);
    }
}

fetchHourlyWeather();