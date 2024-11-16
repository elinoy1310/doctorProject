const userModel = require('../models/userModel');
const produceMessage=require('../producer.js')

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
        
        const users=await userModel.getAllUsers();
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
        console.log(`Message sent by Dr. ${doctorName} to user ${userId}: ${message}`);

        produceMessage.runProducer(userId,{
            date: new Date().toISOString(),
            doctorName: doctorName,
            message:message
        })
        const users=await userModel.getAllUsers();

        res.render('sendMessages', { successMessage: 'Message sent successfully!',users });

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
