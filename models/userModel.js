
const sql = require('mssql');
const { fetchMealDataById } = require('C:/cloudComputingProject/cloudComputing/models/mealsModel.js');


// קונפיגורציה להתחברות למסד הנתונים
const config = {
    user: 'yael_SQLLogin_1',
    password: '65s55lgogc',
    server: 'usersInformation.mssql.somee.com',
    database: 'usersInformation',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// פונקציה לשליפת המשתמשים
exports.getAllUsers = async () => {
    try {
        // חיבור למסד הנתונים
        await sql.connect(config);

        // שליפת כל המשתמשים שבהם isRegistered הוא true
        const result = await sql.query`SELECT id, name FROM users WHERE isRegistered = 1`;


        // החזרת המידע שנמצא
        return result.recordset;
    } catch (err) {
        console.error('Error fetching users:', err);
        throw new Error('Error fetching users from database');
    } finally {
        // סגירת החיבור למסד הנתונים
        await sql.close();
    }
};

// Calculate average sugar level for a user
exports.getAverageSugarLevel = async (userId) => {
    // const user = users.find((u) => u.id === parseInt(userId));
    // if (!user) return null;

    

    // const sum = user.sugarLevels.reduce((total, level) => total + level, 0);
    // return (sum / user.sugarLevels.length).toFixed(2);

    try {
        // שליפת כל הארוחות עבור המשתמש לפי תעודת זהות
        const meals = await fetchMealDataById(userId);

        if (!meals || meals.length === 0) {
            // אם אין נתונים בכלל
            return "There is no data at all about the sugar level";
        }

        // מיון הארוחות לפי תאריך מהמאוחר למוקדם
        const sortedMeals = meals.sort((a, b) => new Date(b.Date) - new Date(a.Date));

        // זיהוי התאריך המאוחר ביותר במאגר
        const maxDate = new Date(sortedMeals[0].Date);

        // חישוב שלושה ימים אחורה מהתאריך המאוחר ביותר
        const threeDaysBeforeMaxDate = new Date(maxDate);
        threeDaysBeforeMaxDate.setDate(maxDate.getDate() - 3);

        // סינון הארוחות בין התאריך המאוחר לבין שלושה ימים אחורה
        const recentMeals = sortedMeals.filter(meal => {
            const mealDate = new Date(meal.Date);
            return mealDate >= threeDaysBeforeMaxDate && mealDate <= maxDate;
        });

        // if (recentMeals.length === 0) {
        //     // אם אין ארוחות בשלושת הימים המאוחרים ביותר, נשתמש בכל הארוחות
        //     const allSugarLevels = meals.map(meal => meal.sugarLevel);
        //     const totalSugar = allSugarLevels.reduce((sum, level) => sum + level, 0);
        //     const averageSugar = totalSugar / allSugarLevels.length;
        //     return `אין נתונים מ-3 הימים האחרונים במאגר, ממוצע כללי: ${averageSugar.toFixed(2)}`;
        // }

        // חישוב ממוצע הסוכר עבור הארוחות שסוננו
        const sugarLevels = recentMeals.map(meal => meal.sugarLevel);
        const totalSugar = sugarLevels.reduce((sum, level) => sum + level, 0);
        const averageSugar = totalSugar / sugarLevels.length;

        return averageSugar.toFixed(2); // החזרת הממוצע בפורמט שני מקומות אחרי הנקודה
    } catch (err) {
        console.error('Error calculating average sugar:', err);
        throw new Error('Error calculating average sugar');
    }
};

