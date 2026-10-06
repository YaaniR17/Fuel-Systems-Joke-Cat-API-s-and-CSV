const readline = require('readline');

const Url = 'https://icanhazdadjoke.com/';

// Configure Node to listen to your keyboard
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

// Listen for specific key presses
process.stdin.on('keypress', async (str, key) => {
    // If 'n' or Ctrl+C is pressed, exit
    if (key.name === 'n' || (key.ctrl && key.name === 'c')) {
        console.log('\nStopping the jokes. Goodbye!\n');
        process.exit(); 
    } 
    // If Spacebar or Enter is pressed, fetch a new joke
    else if (key.name === 'space' || key.name === 'return') {
        await fetchJoke();
    }
});

async function fetchJoke() {
    try {
        const response = await fetch(Url, {
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json();
        
        // Print the joke, skip a line, and print the interactive prompt
        console.log(`${data.joke}\n`);
        console.log('\x1b[90mPress [SPACE] for another joke, or [n] to quit...\x1b[0m');

    } catch (error) {
        console.error("Error retrieving joke:", error.message);
    }
}

// Start the app by printing the welcome message and fetching the very first joke
console.log('\nInteractive Ayaan Jokes!\n========================');
fetchJoke();