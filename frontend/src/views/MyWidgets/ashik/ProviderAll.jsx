import React from 'react';
import img1 from 'src/assets/icons/bus.png';
import img2 from 'src/assets/icons/bus.png';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';
import ReusablePaginationTable from '../CustomPaginationTable';
import { Link } from 'react-router-dom';
// import ReusablePaginationTable from './CustomPaginationTable';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'sku', headerName: 'SKU' },
    { field: 'barcode', headerName: 'Barcode' },
    { field: 'cost_price', headerName: 'Cost Price', renderCell: (value) => `$${value}` },
    { field: 'selling_price', headerName: 'Selling Price', renderCell: (value) => `$${value}` },
    { field: 'stock_qty', headerName: 'Stock Qty' },
    { field: 'discount', headerName: 'Discount', renderCell: (value) => `$${value}` },
    { field: 'vat', headerName: 'VAT', renderCell: (value) => `$${value}` },
    { field: 'tax', headerName: 'Tax', renderCell: (value) => `$${value}` },
];

const handleCustomAction = (id) => {
    console.log('Custom action for id:', id);
};

const ProviderAll = () => (


    <div>
        <ReusablePaginationTable
        title="Services List"
        columns={columns}
        apiUrl="https://fullzapmor-api.vercel.app/api/providers"
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
