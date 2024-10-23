import React from 'react'
import PageContainer from 'src/components/container/PageContainer'
import ParentCard from 'src/components/shared/ParentCard'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, FormHelperText, Grid, MenuItem } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomSwitch from 'src/components/forms/theme-elements/CustomSwitch';
import LiveSwitch from './switch/LiveSwitch';
import MyCheckBox from './checkbox/MyCheckBox.jsx';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    service: yup.string().required('Service is required'),
    specialization: yup.string().required('Specialization is required'),
    experience: yup.string().required('Experience is required'),
    location: yup.array().min(1, 'At least one location is required'),
    phnnumber: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must be numeric'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    status: yup.string().required('Status is required'),
    certificate: yup.mixed(),
    profileImage: yup.mixed(),
  });
export default function AddProviderForm() {
    const basic = "https://fullzapmor-api.vercel.app";
    const mainBasic = "http://localhost:5000";
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            service: '',
            specialization: '',
            experience: '',
            location: [],
            phnnumber: '',
            email: '',
            password: '',
            status: '',
            certificate: null,  // For file input
            profileImage: null, // For file input
          },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            alert(JSON.stringify(values, null, 2));
            console.log("values",values)

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('service', values.service);
            formData.append('specialization', values.specialization);
            formData.append('experience', values.experience);
            values.location.forEach((loc, index) => {
                formData.append(`location[${index}]`, loc); // Append each location value as a part of an array
              });
              
            // formData.append('location', JSON.stringify(values.location)); // Convert array to JSON string
            formData.append('phnnumber', values.phnnumber);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('status', values.status);
            formData.append('certificate', values.certificate); // Assuming this is a file
            formData.append('profileImage', values.profileImage); // Assuming this is a file

            console.log('form == ',formData)

            try {
                const response = await fetch(`${basic}/api/services-providers`, {
                  method: 'POST',
                  headers:{
                    'Accept':'application/json'
                  },
                  body: formData, // Let the browser handle the multipart/form-data
                });
                if (!response.ok) {
                  throw new Error('Failed to submit form');
                }
              
                const data = await response.json();
                console.log('Success:', data);
                alert('Form submitted successfully!');
                navigate(`/admin/providers/all`);
              } catch (error) {
                console.error('Error:', error);
                alert('Failed to submit the form.');
              }
        },
      });

      const data = [
        { title: 'Dhaka ' },
        { title: 'Cumilla' },
      ];

  return (
    <PageContainer title="Service Providers" description="this is Custom Form page">
        <Breadcrumb title="Service Providers" subtitle="" />
        <ParentCard title="Fill up the Following from">
        <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} mb={3}>
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12} sm={12} lg={6} order={{ xs: 1, lg: 1 }}>
                            <CustomFormLabel>Name</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <CustomFormLabel>Service</CustomFormLabel>
                            <CustomSelect
                            labelId="service-select"
                            fullWidth
                            id="service" 
                            name="service"
                            value={formik.values.service}
                            onChange={formik.handleChange}
                            >
                            <MenuItem value='driving'>Driving</MenuItem>
                            <MenuItem value='cooking'>Cooking</MenuItem>
                            </CustomSelect>
                            {formik.errors.service && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.service}{' '}
                                </FormHelperText>
                            )}
                            <CustomFormLabel>Specialization</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="specialization"
                                name="specialization"
                                value={formik.values.specialization}
                                onChange={formik.handleChange}
                                error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                                helperText={formik.touched.specialization && formik.errors.specialization}
                            />
                            <CustomFormLabel>Experience</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="experience"
                                name="experience"
                                value={formik.values.experience}
                                onChange={formik.handleChange}
                                error={formik.touched.experience && Boolean(formik.errors.experience)}
                                helperText={formik.touched.experience && formik.errors.experience}
                            />
                            <CustomFormLabel>Service Locations</CustomFormLabel>
                            <MyCheckBox
  data={data}
  value={formik.values.location}
  onChange={(newValue) => formik.setFieldValue('location', newValue)}
/>

                            <CustomFormLabel>Certificate</CustomFormLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                component="label"
                            >
                                Upload Certificate Image
                                <input
                                type="file"
                                hidden
                                onChange={(event) => formik.setFieldValue('certificate', event.currentTarget.files[0])}
                                />
                            </Button>
                            {formik.values.certificate && (
                                <Box sx={{ ml: 2 }}>{formik.values.certificate.name}</Box>
                            )}
                            </Box>
                            
                            <CustomFormLabel>Profile Image</CustomFormLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                component="label"
                            >
                                Upload Profile Image
                                <input
                                type="file"
                                hidden
                                onChange={(event) => formik.setFieldValue('profileImage', event.currentTarget.files[0])}
                                />
                            </Button>
                            {formik.values.profileImage && (
                                <Box sx={{ ml: 2 }}>{formik.values.profileImage.name}</Box>
                            )}
                            </Box>
                            <CustomFormLabel>Phone number</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="phnnumber"
                                name="phnnumber"
                                value={formik.values.phnnumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phnnumber && Boolean(formik.errors.phnnumber)}
                                helperText={formik.touched.phnnumber && formik.errors.phnnumber}
                            />
                            <CustomFormLabel>Email</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <CustomFormLabel>Password</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <CustomFormLabel>Status</CustomFormLabel>
                            <CustomSelect
                            labelId="status-select"
                            fullWidth
                            id="status" 
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            >
                            <MenuItem value='good'>Good</MenuItem>
                            <MenuItem value='bad'>Bad</MenuItem>
                            </CustomSelect>
                            {formik.errors.status && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.status}{' '}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>            </form>
        </ParentCard>
    </PageContainer>
  )
}
