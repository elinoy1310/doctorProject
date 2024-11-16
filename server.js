const express = require('express');
const path = require('path');
const generalRoutes = require('./routes/generalRoutes');

const app = express();
const PORT = 3333;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', generalRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



// ///

// const { fetchMealDataById } = require('cloudcomputing');
// ; // קריאה לדוגמה
// ///

// const { fetchMealDataById } = require('C:/cloudComputingProject/cloudComputing/models/mealsModel.js');
// console.log(fetchMealDataById("123456789"))
