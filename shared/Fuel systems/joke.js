const readline = require('readline');

const Url = 'https://icanhazdadjoke.com/';
let isRunning = true;

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'n' || (key.ctrl && key.name === 'c')) {
        console.log('\nStopping the jokes. Goodbye!\n');
        process.exit(); 
    }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchJoke() {
    try {
        const response = await fetch(Url, {
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json();
        console.log(`${data.joke}\n`);

    } catch (error) {
        console.error("Error retrieving joke:", error.message);
    }
}

async function startJokeLoop() {
    console.log('\nStarting Random Ayaan Jokes...\n');
    console.log('Press "n" at any time to stop\n');

    while (isRunning) {
        await fetchJoke();
        await sleep(5000);
    }
}

startJokeLoop();