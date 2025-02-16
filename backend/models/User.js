const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String, 
    email: String,
    phone: Number, 
    city: String, 
    postal_code: Number, 
    address: String
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the model
module.exports = mongoose.model('User', userSchema);
