import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'email' },
    { field: 'phoneNumber', headerName: 'phoneNumber' },
    { field: 'service', headerName: 'service', renderCell: (value) => `$${value}` },
    { field: 'specialized', headerName: 'specialized', renderCell: (value) => `$${value}` },
    { field: 'experience', headerName: 'experience' },
    { field: 'serviceOrganization', headerName: 'serviceOrganization', renderCell: (value) => `$${value}` },
    { field: 'status', headerName: 'status', renderCell: (value) => `$${value}` },
    { field: 'certificate', headerName: 'certificate', renderCell: (value) => `$${value}` },
    { field: 'profileImage', headerName: 'profileImage', renderCell: (value) => `$${value}` },
    { field: 'amount', headerName: 'amount', renderCell: (value) => `$${value}` },
    { field: 'type', headerName: 'type', renderCell: (value) => `$${value}` },
    { field: 'featured', headerName: 'featured', renderCell: (value) => `$${value}` },
];

const handleCustomAction = (id) => {
    console.log('Custom action for id:', id);
};

const ProviderAll = () => (


    <div>
        <ReusablePaginationTable
        title="Services List"
        columns={columns}
        apiUrl="https://fullzapmor-api.vercel.app/api/services-providers"
        // apiUrl="http://localhost:5000/api/services-providers"
        enableSearch={true}
        enableSort={true}
        >
            <Button
                color="primary"
                variant="contained"
                component={Link}
                to='/admin/addproviderform'
                type="submit"
            >
                Add Provider/Vendor
            </Button>
        </ReusablePaginationTable>
    </div>
);

export default ProviderAll;
