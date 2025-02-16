import './App.css';
import * as React from 'react';
// import Grid from '@mui/material/Grid2';
import UsersForm from './components/UsersForm';
import UsersTable from './components/UsersTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<UsersForm />} />
        <Route path="/edit/:id" element={<UsersForm />} /> 
        <Route path="/allusers" element={<UsersTable />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
