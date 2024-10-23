import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import LocationInput from './locationInput/LocationInput';
import { useNavigate, useParams } from 'react-router';

// Validation schema using Yup
const validationSchema = yup.object({
  locname: yup
    .string()
    .min(2, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Location name is required'),
  address: yup
    .string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Address is required'),
  location: yup
    .array()
    .of(yup.number().required('Coordinates are required'))
    .length(2, 'Location must include both latitude and longitude')
    .required('Location is required'),
});

export default function AddServicesLocationForm() {
  const basic = "https://fullzapmor-api.vercel.app";
  const mainBasic = "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Loading state for fetching data

  const formik = useFormik({
    initialValues: {
      locname: '',
      location: [], // Expecting [latitude, longitude]
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id
          ? `${basic}/api/service-locations/${id}`
          : `${basic}/api/service-locations/`;
        const method = id ? 'PUT' : 'POST';

        // Send JSON instead of FormData
        const response = await fetch(url, {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', // Set Content-Type to JSON
          },
          body: JSON.stringify({
            locname: values.locname,
            location: values.location, // Assuming it's an array of [latitude, longitude]
            address: values.address,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const data = await response.json();
        console.log('Success:', data);
        alert(id ? 'Service updated successfully!' : 'Form submitted successfully!');
        formik.resetForm(); // Reset form after successful submission
        navigate(`/admin/serviceslocation/all`);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the form.');
      }
    },

  });

  useEffect(() => {
    if (id) {
      setLoading(true); // Loading while fetching data
      fetch(`${basic}/api/service-locations/${id}`)
        .then((response) => response.json())
        .then((data) => {console.log("fetchdata",data)
          formik.setValues({
            locname: data.locname || '',
            location: data.location || [],
            address: data.address || '',
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [id]); // Fetch data on mount if there's an ID

  return (
    <PageContainer title="Service" description="This is the Custom Form page">
      <Breadcrumb title={id ? 'Edit location' : 'Add location'} subtitle="" />
      <ParentCard title={id ? 'Edit the Following Form' : 'Fill up the Following Form'}>
        {loading ? (
          <div>Loading...</div>
        ) : (
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
                <LocationInput setFieldValue={formik.setFieldValue} />
                {formik.touched.location && formik.errors.location && (
                  <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.location}</div>
                )}
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Submitting...' : id ? 'Update' : 'Submit'}
            </Button>
          </form>
        )}
      </ParentCard>
    </PageContainer>
  );
}
