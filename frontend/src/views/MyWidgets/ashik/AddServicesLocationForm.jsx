import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import LocationInput from './locationInput/LocationInput';

// Validation schema using Yup
const validationSchema = yup.object({
  locname: yup.string().min(2, 'Too Short!').max(80, 'Too Long!').required('Location name is required'),
  address: yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Address is required'),
  location: yup
    .array()
    .of(yup.number().required('Coordinates are required')) // Ensuring that the location is an array of numbers (latitude, longitude)
    .length(2, 'Location must include both latitude and longitude') // Exactly two elements expected in the array
    .required('Location is required'),
});

export default function AddServicesLocationForm() {
  const formik = useFormik({
    initialValues: {
      locname: '', // Location name field
      location: [], // Location field as an array [latitude, longitude]
      address: '', // Address field
    },
    validationSchema: validationSchema, // Applying the validation schema
    onSubmit: async (values) => {
      // console.log(JSON.stringify(values));
      try {
        const response = await fetch('https://zapmor.sohabagcluster.com/api/service-locations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const data = await response.json();
        console.log('Success:', data);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the form.');
      }
    },
    // onSubmit: async (values) =>{
    //   axiosConfig
    //     .post("/service-locations", values)
    //     .then((response) => alert(response.data.message))
    //     .catch((error) => console.log(error));
    // }
  });

  return (
    <PageContainer title="Service" description="This is the Custom Form page">
      <Breadcrumb title="Service" subtitle="" />
      <ParentCard title="Fill up the Following Form">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel>Location Name</CustomFormLabel>
              <CustomTextField
                fullWidth
                id="locname"
                name="locname"
                value={formik.values.locname}
                onChange={formik.handleChange}
                error={formik.touched.locname && Boolean(formik.errors.locname)}
                helperText={formik.touched.locname && formik.errors.locname}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel>Address</CustomFormLabel>
              <CustomTextField
                fullWidth
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormLabel>Location</CustomFormLabel>
              {/* LocationInput component handles setting the location value */}
              <LocationInput setFieldValue={formik.setFieldValue} />
              {formik.touched.location && formik.errors.location && (
                <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.location}</div>
              )}
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </ParentCard>
    </PageContainer>
  );
}

