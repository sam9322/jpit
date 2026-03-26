const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data storage (replace with a real DB later)
let leads = [];
let newsletterSubs = [];

// API Route for Discovery Modal
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    const newLead = {
        id: Date.now(),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    leads.push(newLead);
    console.log('New Discovery Lead:', newLead);
    
    // Here you would typically send an email using nodemailer

    res.status(200).json({ 
        success: true, 
        message: 'Lead received successfully! Our team will contact you soon.' 
    });
});

// API Route for Newsletter
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const newSub = {
        id: Date.now(),
        email,
        timestamp: new Date().toISOString()
    };

    newsletterSubs.push(newSub);
    console.log('New Newsletter Subscription:', newSub);

    res.status(200).json({ 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
