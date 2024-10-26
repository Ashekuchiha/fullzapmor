import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'service', headerName: 'service' },
    { field: 'specialization', headerName: 'specialization' },
    { field: 'experience', headerName: 'experience', renderCell: (value) => `$${value}` },
    { field: 'location', headerName: 'location', renderCell: (value) => `$${value}` },
    { field: 'phnnumber', headerName: 'phnnumber' },
    { field: 'email', headerName: 'email', renderCell: (value) => `$${value}` },
    { field: 'status', headerName: 'status', renderCell: (value) => `$${value}` },
    { field: 'certificate', headerName: 'certificate', renderCell: (value) => `$${value}` },
    { field: 'profileImage', headerName: 'profileImage', renderCell: (value) => `$${value}` },
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
