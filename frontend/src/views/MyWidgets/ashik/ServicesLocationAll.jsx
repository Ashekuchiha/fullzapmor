import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';

const columns = [
    { field: 'organizationName', headerName: 'organizationName' },
    { field: 'ownerName', headerName: 'ownerName' },
    { field: 'state', headerName: 'state' },
    { field: 'city', headerName: 'city' },
    { field: 'mapSelection', headerName: 'mapSelection' },
    { field: 'organizationBio', headerName: 'organizationBio' },
    { field: 'organizationDescription', headerName: 'organizationDescription' },
    { field: 'organizationWebsite', headerName: 'organizationWebsite' },
    { field: 'phoneNumber', headerName: 'phoneNumber' },
    { field: 'emergencyPhoneNumber', headerName: 'emergencyPhoneNumber' },
    { field: 'employeeNumbers', headerName: 'employeeNumbers' },
    { field: 'organizationLogo', headerName: 'organizationLogo' , renderCell: (value) => (<img src={value} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>)},
    { field: 'organizationBanner', headerName: 'organizationBanner', renderCell: (value) => (<img src={value} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>) },
    { field: 'tradeLicense', headerName: 'tradeLicense', renderCell: (value) => (<img src={value} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>) },
    { field: 'organizationDocuments', headerName: 'organizationDocuments', renderCell: (value) => (<img src={value} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>) },
    { field: 'featured', headerName: 'featured' },
   ];
const handleCustomAction = (id) => {
    console.log('Custom action for id:', id);
};

const ServicesLocationAll = () => (

    <div>
        <ReusablePaginationTable
        title="Services List"
        columns={columns}
        apiUrl="https://fullzapmor-api.vercel.app/api/service-organization"
        // apiUrl="http://localhost:5000/api/service-organization"
        enableSearch={true}
        enableSort={true}
        >
            <Button
                color="primary"
                variant="contained"
                component={Link}
                to= '/admin/addserviceslocationform'
                type="submit"
            >
                Add Services Location
            </Button>
        </ReusablePaginationTable>
    </div>
);

export default ServicesLocationAll;
