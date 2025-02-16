const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/dbConnect');
const userRoutes = require('./routes/userRoutes')

dotenv.config();
const app = express();

// Cross-Origin Resource Sharing
app.use(cors({origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"]})); 

// Form Data handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Route for users
app.use('/api/users', userRoutes);

// Default Route
app.use('/', ((req, res) => {
    res.send('Hello Welcom to my MERN Stack Courese, are you Running on port 5000, but i have face problem in my code')
}))

//Server Runinig to port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})