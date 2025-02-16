import axios from 'axios';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UsersForm = () => {

    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        postal_code: '',
        address: ''
    }

    const [data, setData] = useState(initialState);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch Existing specific User Data if you can edit user
    useEffect(() => {
        const fetchData = async () => {

            if (id) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${id}`);
                    if (response?.data) {
                        setData(response?.data)
                    } else {
                        console.error("No user data found....");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        }

        fetchData();
    }, [id])
    
    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSave = async () => {

        try {
            if (id) {
                // if id exist then update specific user
                await axios.put(`http://localhost:5000/api/users/${id}`, data);
                alert("User updated successfully");

            } else {
                // Create new user
                await axios.post('http://localhost:5000/api/users', data);
                alert("User created successfully");
            }

            setData(initialState); // clear form
            navigate('/allusers'); // Redirect to users list

        } catch (error) {
            console.error('Error saving user:', error.response?.data || error.message);
            alert('Failed to save user');
        }
    }

    return (
        <Grid container spacing={2} px={8}>

            <Grid size={12}>
                <Typography variant="h4" py={4} textAlign="center">{id ? "Edit Existing User" : "Create New User"}</Typography>
            </Grid>
            <Grid size={12}>
                <Link to="/allusers">
                    <Button variant="contained">Show All Users</Button>
                </Link>
            </Grid>
            <Grid size={4}>
                <TextField name='first_name' value={data.first_name} label="First name" onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={4}>
                <TextField name='last_name' value={data.last_name} label="Last name" onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={4}>
                <TextField name='email' value={data.email} label="Email" onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={4}>
                <TextField name='phone' value={data.phone} label="Phone" onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={4}>
                <TextField name='city' value={data.city} label="City" onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={4}>
                <TextField name='postal_code' value={data.postal_code} label="Postal(City code)" type='number' onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={12}>
                <TextField name='address' value={data.address} label="Address" onChange={handleChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid size={12}>
                <Button variant="contained" color="primary" onClick={handleSave}> {id ? "Update User" : "Submit"}</Button>
            </Grid>
        </Grid>
    )
}

export default UsersForm