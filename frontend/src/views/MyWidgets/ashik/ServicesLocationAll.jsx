import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';
import iconn from '../../../../src/assets/icons/deafult.png'
import doc from '../../../../src/assets/icons/DefaultDocuments.png'

const columns = [
    { field: 'organizationName', headerName: 'Organization Name' },
    { field: 'ownerName', headerName: 'Owner Name' },
    { field: 'state', headerName: 'State' },
    { field: 'city', headerName: 'City' },
    { field: 'mapSelection', headerName: 'Longitude & Latitude', renderCell:(value)=>(<><p>{`Longitude : ${value[0]}`}</p> <p>{`Latitude : ${value[1]}`}</p></>) },
    { field: 'organizationBio', headerName: 'Organization Bio' },
    { field: 'organizationDescription', headerName: 'Organization Description' },
    { field: 'organizationWebsite', headerName: 'Organization Website' },
    { field: 'phoneNumber', headerName: 'Phone Number' },
    { field: 'emergencyPhoneNumber', headerName: 'Emergency Phone Number' },
    { field: 'employeeNumbers', headerName: 'Employee Numbers' },
    { field: 'organizationLogo', headerName: 'Organization Logo' , renderCell: (value) => (<img src={value?value:iconn} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>)},
    { field: 'organizationBanner', headerName: 'Organization Banner', renderCell: (value) => (<img src={value?value:iconn} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>) },
    { field: 'tradeLicense', headerName: 'Trade License', renderCell: (value) => (<img src={value?value:iconn} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>) },
    { field: 'organizationDocuments', headerName: 'Organization Documents', renderCell: (value) => (<img src={value?value:iconn} style={{ width: 50, height: 50, borderRadius: '50%' }} alt='no image'/>) },
    { field: 'featured', headerName: 'Featured' },
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
