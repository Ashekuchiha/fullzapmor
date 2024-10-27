import React, { useState } from 'react'
import PageContainer from 'src/components/container/PageContainer'
import ParentCard from 'src/components/shared/ParentCard'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, Grid, MenuItem } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomSwitch from 'src/components/forms/theme-elements/CustomSwitch';
import LiveSwitch from './switch/LiveSwitch';
import MyCheckBox from './checkbox/MyCheckBox.jsx';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { useNavigate } from 'react-router';
import CommissionSetup from './CommissionSetup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone Number must be only digits')
      .required('Phone Number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    service: Yup.string().required('Service is required'),
    specialized: Yup.string().required('Specialized field is required'),
    experience: Yup.number()
      .integer('Experience must be a whole number')
      .positive('Experience must be a positive number')
      .required('Experience is required'),
    serviceOrganization: Yup.string().required('Service Organization is required'),
    status: Yup.string().required('Status is required'),
  });


export default function AddProviderForm() {
    const Call =()=>{
        return(
            <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Amount</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="amount"
                        name="amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                    />
                </Grid>
                
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel>type</CustomFormLabel>
                    <CustomSelect
                    style={{ width: '50%' }} 
                    labelId="type-select"
                    id="type" 
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    >
                    <MenuItem value='percent'>Percent</MenuItem>
                    <MenuItem value='flat'>Flat</MenuItem>
                    </CustomSelect>
                    {formik.errors.type && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.type}{' '}
                        </FormHelperText>
                    )}
                </Grid>
            </Grid>
            </>
        )
      }
    const basic = "https://fullzapmor-api.vercel.app";
    const cbasic = "http://localhost:5000";
    const navigate = useNavigate();
    const [switchs, setswitchs] = useState(false); 
    const formik = useFormik({
         initialValues : {
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            service: '',
            specialized: '',
            experience: '',
            serviceOrganization: '',
            amount: '',
            type:'',
            profileImage: null,       // For single file upload (not required)
            certificates: null,         // For multiple file uploads (not required)
          },          
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
          
            // Append text and other basic fields
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('password', values.password);
            formData.append('service', values.service);
            formData.append('specialized', values.specialized);
            formData.append('experience', values.experience);
            formData.append('serviceOrganization', values.serviceOrganization);
            formData.append('profileImage', values.profileImage);
            formData.append('certificates', values.certificates);
            formData.append('serviceOrganization', values.serviceOrganization);
            formData.append('status', values.status);
            formData.append('amount', values.amount);
            formData.append('type', values.type);
            
            // Append files (if they are provided)
            if (values.profileImage) {
              formData.append('profileImage', values.profileImage);
            }

            if (values.certificates) {
                formData.append('certificates', values.certificates);
              }
          
            // // Append multiple files for certificates
            // values.certificates.forEach((file, index) => {
            //   formData.append(`certificates[${index}]`, file);
            // });

            alert(JSON.stringify(values),)
            console.log(JSON.stringify(values))
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

      const statuss = [
        { id: 1, name: "Active" },
        { id: 2, name: "Pending" },
        { id: 3, name: "Completed" },
        { id: 4, name: "Cancelled" },
        { id: 4, name: "Banned" },
    ];
  return (
    <PageContainer title="Service Providers" description="this is Custom Form page">
        <Breadcrumb title="Service Providers" subtitle="" />
        <ParentCard title="Fill up the Following from">
        <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} mb={3}>
                    <Grid item xs={12} lg={6}>
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
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Email</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Phone Number</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Password</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Service</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="service"
                        name="service"
                        value={formik.values.service}
                        onChange={formik.handleChange}
                        error={formik.touched.service && Boolean(formik.errors.service)}
                        helperText={formik.touched.service && formik.errors.service}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Specialized</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="specialized"
                        name="specialized"
                        value={formik.values.specialized}
                        onChange={formik.handleChange}
                        error={formik.touched.specialized && Boolean(formik.errors.specialized)}
                        helperText={formik.touched.specialized && formik.errors.specialized}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
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
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Service Organization</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="serviceOrganization"
                        name="serviceOrganization"
                        value={formik.values.serviceOrganization}
                        onChange={formik.handleChange}
                        error={formik.touched.serviceOrganization && Boolean(formik.errors.serviceOrganization)}
                        helperText={formik.touched.serviceOrganization && formik.errors.serviceOrganization}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Profile Image</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        onChange={(event) => formik.setFieldValue("profileImage", event.currentTarget.files[0])}
                        error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
                        helperText={formik.touched.profileImage && formik.errors.profileImage}
                    />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                    <CustomFormLabel>Certificates</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        type="file"
                        id="certificates"
                        name="certificates"
                        onChange={(event) => formik.setFieldValue("certificates", event.currentTarget.files)}
                        error={formik.touched.certificates && Boolean(formik.errors.certificates)}
                        helperText={formik.touched.certificates && formik.errors.certificates}
                    />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                    <CustomFormLabel>Individual Commission</CustomFormLabel>
                    <LiveSwitch
                    initialChecked={switchs}
                    onSwitchChange={() => switchs ? setswitchs(false): setswitchs(true)}
                    />
                    {switchs ? <Call/> : <></>}
                    </Grid>

                    <Grid item xs={12} sm={12} lg={6}>
                  <CustomFormLabel>Status</CustomFormLabel>
                  <CustomSelect
                    labelId="status-select"
                    fullWidth
                    id="status" 
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    >
                       {statuss.map(status => (
                    <MenuItem key={status.id} value={status.name}>
                        {status.name}
                    </MenuItem>
                ))}
                    </CustomSelect>
                    {formik.errors.status && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.status}{' '}
                        </FormHelperText>
                    )}
                </Grid>

                </Grid>
                <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>            
          </form>
          
        </ParentCard>

    </PageContainer>
  )
}
