import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, FormHelperText, Grid, MenuItem } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import LocationInput from './locationInput/LocationInput';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

// Validation schema using Yup
const validationSchema = yup.object({
    cityName: yup
    .string()
    .min(2, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Location name is required'),
  StateName: yup
    .string()
    .min(2, 'Too Short!')
    .max(80, 'Too Long!')
    .required('Location name is required'),
  longitude: yup
    .string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!'),
  latitude: yup
    .string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!'),
});

export default function AddCityForm() {
    const [StateNames, setStateNames] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Loading state for fetching data

  const formik = useFormik({
    initialValues: {
      StateName: '',
      cityName:'',
      longitude: '',
      latitude:'',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const url = id
          ? `http://localhost:5000/api/cities/${id}`
          : `http://localhost:5000/api/cities`;
        const method = id ? 'PUT' : 'POST';

        // Send JSON instead of FormData
        const response = await fetch(url, {
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', // Set Content-Type to JSON
          },
          body: JSON.stringify({
            StateName: values.StateName,
            cityName:values.cityName,
            latitude: values.latitude, // Assuming it's an array of [latitude, longitude]
            longitude: values.longitude,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const data = await response.json();
        console.log('Success:', data);
        alert(id ? 'Service updated successfully!' : 'Form submitted successfully!');
        formik.resetForm(); // Reset form after successful submission
        navigate(`/admin/location/city/all`);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the form.');
      }
    },

  });

  useEffect(() => {
    if (id) {
      setLoading(true); // Loading while fetching data
      fetch(`http://localhost:5000/api/cities/${id}`)
        .then((response) => response.json())
        .then((data) => {console.log("fetchdata",data)
          formik.setValues({
            StateName: data.StateName || '',
            cityName:data.cityName || '',
            latitude: data.latitude || '',
            longitude: data.longitude || '',
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [id]); // Fetch data on mount if there's an ID

  useEffect(() => {
    // Fetch the service options from the API
    const fetchStateName = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/states/all');
            setStateNames(response.data.data.data); // Assuming the data is an array of service objects
            console.log(response)
        } catch (error) {
            console.error('Error fetching StateName:', error);
        }
    };

    fetchStateName();
}, []);

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
                <CustomFormLabel>State Name</CustomFormLabel>
                <CustomSelect
                    labelId="StateName-select"
                    fullWidth
                    id="StateName" 
                    name="StateName"
                    value={formik.values.StateName}
                    onChange={formik.handleChange}
                    >
                       {StateNames.map(StateName => (
                    <MenuItem key={StateName.id} value={StateName.StateName}>
                        {StateName.StateName}
                    </MenuItem>
                ))}
                    </CustomSelect>
                    {formik.errors.StateName && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.StateName}{' '}
                        </FormHelperText>
                    )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel>City Name</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="cityName"
                  name="cityName"
                  value={formik.values.cityName}
                  onChange={formik.handleChange}
                  error={formik.touched.cityName && Boolean(formik.errors.cityName)}
                  helperText={formik.touched.cityName && formik.errors.cityName}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel>longitude</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="longitude"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                  helperText={formik.touched.longitude && formik.errors.longitude}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomFormLabel>Latitude</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="latitude"
                  name="latitude"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                  helperText={formik.touched.latitude && formik.errors.latitude}
                />
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