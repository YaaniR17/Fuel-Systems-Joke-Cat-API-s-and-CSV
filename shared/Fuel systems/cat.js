async function fetchCat() {
    try {
        const { default: terminalImage } = await import('terminal-image');

        console.log("Summoning a cat... \n");

        const response = await fetch('https://cataas.com/cat/orange');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(await terminalImage.buffer(buffer, { width: 100 }));

    } catch (error) {
        console.error("Error retrieving cat:", error.message);
    }
}

fetchCat();