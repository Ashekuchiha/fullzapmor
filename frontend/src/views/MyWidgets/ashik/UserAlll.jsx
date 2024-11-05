import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'address', headerName: 'Address'},
    { field: 'profile', headerName: 'Profile'},
];

const handleCustomAction = (id) => {
    console.log('Custom action for id:', id);
};

const UserAll = () => (

    <div>
        <ReusablePaginationTable
        title="Services List"
        columns={columns}
        // apiUrl="https://fullzapmor-api.vercel.app/api/appusers"
        apiUrl="http://localhost:5000/api/service-organization"
        enableSearch={true}
        enableSort={true}
        >
            <Button
                color="primary"
                variant="contained"
                component={Link}
                to= '/admin/adduserform'
                type="submit"
            >
                Add User
            </Button>
        </ReusablePaginationTable>
    </div>
);

export default UserAll;
