const path = require('path');

// Define the logic for each route
const getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
};

const getAboutPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'about.html'));
};

const getContactPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'contact-me.html'));
};

// Export the functions so the router can use them
module.exports = {
    getHomePage,
    getAboutPage,
    getContactPage
};