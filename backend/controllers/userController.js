const User = require('../models/User');

// Create new user
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, city, postal_code, address } = req.body;
        const user = await User.create({first_name, last_name, email, phone, city, postal_code, address });
        console.log('User Created Successfully', user);
        res.status(201).json(user);
    } catch (error) {
        debugger;
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        console.log('All Users Fetched Successfully', users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get specific user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user in database
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Updated Successfully", updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Deleted Successfully", deletedUser);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };