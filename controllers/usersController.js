const userModel = require('../models/userModel');

// // Render the sendMessages.ejs page
// exports.getSendMessagesPage = async (req, res) => {
//     try {
//         // Fetch users from the model
//         const users = await userModel.getAllUsers();
//         res.render('sendMessages', { users });
//     } catch (error) {
//         res.status(500).send('Error loading sendMessages page');
//     }
// };


exports.getSendMessagesPage = async (req, res) => {
    try {
        // שליפת כל המשתמשים שבהם isRegistered הוא true
        const users = await userModel.getAllUsers();
        console.log(1)
        console.log(users)

        // שליחה של המידע לתבנית sendMessages.ejs
        res.render('sendMessages', { users });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error loading sendMessages page');
    }
};


// Handle sending the message
exports.sendMessage = async (req, res) => {
    try {
        const { doctorName, userId, message } = req.body;

        // Logic to send message (replace with real implementation)
        console.log(`Message sent by Dr. ${doctorName} to user ${userId}: ${message}`);

        res.send('Message sent successfully!');
    } catch (error) {
        res.status(500).send('Error sending message');
    }
};

// Fetch average sugar level for a user
exports.getAverageSugarLevel = async (req, res) => {
    try {
        const average = await userModel.getAverageSugarLevel(req.params.userId);
        res.json({ average });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching average sugar level' });
    }
};
