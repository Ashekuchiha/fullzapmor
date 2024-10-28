import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'featured', headerName: 'Featured' },
    { field: 'status', headerName: 'Status' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'type', headerName: 'type' },
    { field: 'icon', headerName: 'Icon' },
];

const handleCustomAction = (id) => {
    console.log('Custom action for id:', id);
};

const ServicesAll = () => (
    <div>
        <ReusablePaginationTable
        title="Services List"
        columns={columns}
        // apiUrl="https://fullzapmor-api.vercel.app/api/services"
        apiUrl="http://localhost:5000/api/services"
        enableSearch={true}
        enableSort={true}
        >
            <Button
                color="primary"
                variant="contained"
                component={Link}
                to= '/admin/addserviceform'
                type="submit"
            >
                Add Services
            </Button>
        </ReusablePaginationTable>
    </div>
);

export default ServicesAll;
