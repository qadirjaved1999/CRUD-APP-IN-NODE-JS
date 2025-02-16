import axios from 'axios';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useEffect, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import TableHead from '@mui/material/TableHead';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// Style Object
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UsersTable = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get all user from data base and show in table
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);
  
  // Redirect table to user form for edit or update user
  const editUser = (id) => {
    navigate(`/edit/${id}`);
  }

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        // Refresh the user list
        setUsers(users.filter(user => user._id !== id));
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
        alert('Failed to delete user');
    }
  }

  return (
    <Box sx={{ mt: 5, paddingRight: "58px", paddingLeft: "58px" }}>
      <Box>
        <Typography variant="h4" py={4} textAlign="center">My All Users List</Typography>
      </Box>
      <Link to="/" >
        <Button variant="contained" style={{ marginBottom: "15px" }}>Add New User</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: "center" }}>First name</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Last name</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Email</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Phone</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>City</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Postal code</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Address</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <>
              {console.log(row._id)}
              <StyledTableRow key={row._id}>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.first_name}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.last_name}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.email}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.phone}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.city}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.postal_code}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{row.address}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "20px" }}>
                  <EditIcon color="primary" onClick={() => editUser(row._id)}/>
                  <DeleteForeverIcon color="secondary" onClick={() => deleteUser(row._id)}/>
                </StyledTableCell>
              </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  )
}

export default UsersTable