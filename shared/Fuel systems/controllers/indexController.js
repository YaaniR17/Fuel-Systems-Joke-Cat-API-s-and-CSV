const path = require('path');

const getHomePage = (req, res) => { res.render('index', { title: 'Home' }); };
const getAboutPage = (req, res) => { res.render('about', { title: 'About' }); };
const getContactPage = (req, res) => { res.render('contact-me', { title: 'Contact' }); };

const getFuelData = async (req, res) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/flask/fuel');
        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.error("Express failed to reach Flask:", error);
        res.status(500).json({ error: 'Express could not connect to Flask API' });
    }
};

module.exports = {
    getHomePage,
    getAboutPage,
    getContactPage,
    getFuelData
};