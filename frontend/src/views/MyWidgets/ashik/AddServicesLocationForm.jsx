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
  organizationName: yup.string(),
  ownerName: yup.string(),
  state: yup.string(),
  city: yup.string(),
  address: yup.string().required('Address is required'),
  organizationBio: yup.string().required('Organization Bio is required'),
  organizationDescription: yup.string().required('Organization Description is required'),
  organizationWebsite: yup.string().url('Invalid URL format'),
  phoneNumber: yup.string().matches(/^[0-9]+$/, 'Phone Number must be only digits'),  
  emergencyPhoneNumber: yup.string().matches(/^[0-9]+$/, 'Emergency Phone Number must be only digits'), 
  employeeNumbers: yup.number().integer('Employee Numbers must be an integer').positive('Employee Numbers must be a positive number')
,});

export default function AddServicesLocationForm() {
  const basic = "https://fullzapmor-api.vercel.app";
  const mainBasic = "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Loading state for fetching data

  const formik = useFormik({
    initialValues: {
      organizationName: '',
      ownerName: '',
      state: '',
      city: '',
      address: '',
      mapSelection: [], // Expecting [latitude, longitude]
      organizationBio: '',
      organizationDescription: '',
      organizationWebsite: '',
      phoneNumber: '',
      emergencyPhoneNumber: '',
      employeeNumbers: '',
      organizationLogo: null, // For file uploads, initialize as null
      organizationBanner: null, // For file uploads, initialize as null
      tradeLicense: null, // For file uploads, initialize as null
      organizationDocuments: [], // For multiple file uploads, initialize as an empty array
    },
    
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
    
      // Append each field to the FormData
      formData.append('organizationName', values.organizationName);
      formData.append('ownerName', values.ownerName);
      formData.append('state', values.state);
      formData.append('city', values.city);
      formData.append('address', values.address);
    
      // Append arrays like mapSelection by converting them to JSON
      formData.append('mapSelection', JSON.stringify(values.mapSelection));
    
      formData.append('organizationBio', values.organizationBio);
      formData.append('organizationDescription', values.organizationDescription);
      formData.append('organizationWebsite', values.organizationWebsite);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('emergencyPhoneNumber', values.emergencyPhoneNumber);
      formData.append('employeeNumbers', values.employeeNumbers);
    
      // Append file inputs if they are provided
      if (values.organizationLogo) {
        formData.append('organizationLogo', values.organizationLogo);
      }
      if (values.organizationBanner) {
        formData.append('organizationBanner', values.organizationBanner);
      }
      if (values.tradeLicense) {
        formData.append('tradeLicense', values.tradeLicense);
      }
    
      // Append each document in organizationDocuments array
      values.organizationDocuments.forEach((file, index) => {
        formData.append(`organizationDocuments[${index}]`, file);
      });
      console.log(formData)
      console.log(JSON.stringify(values))
      alert(JSON.stringify(values))
      navigate(`/admin/serviceslocation/all`);
      // try {
      //   const url = id
      //     ? `${basic}/api/service-locations/${id}`
      //     : `${basic}/api/service-locations/`;
      //   const method = id ? 'PUT' : 'POST';

      //   // Send JSON instead of FormData
      //   const response = await fetch(url, {
      //     method: method,
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json', // Set Content-Type to JSON
      //     },
      //     body: JSON.stringify({
      //       locname: values.locname,
      //       location: values.location, // Assuming it's an array of [latitude, longitude]
      //       address: values.address,
      //     }),
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to submit form');
      //   }

      //   const data = await response.json();
      //   console.log('Success:', data);
      //   alert(id ? 'Service updated successfully!' : 'Form submitted successfully!');
      //   formik.resetForm(); // Reset form after successful submission
      //   navigate(`/admin/serviceslocation/all`);
      // } catch (error) {
      //   console.error('Error:', error);
      //   alert('Failed to submit the form.');
      // }
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
    <PageContainer title="Service organization" description="This is the Custom Form page">
      <Breadcrumb title={id ? 'Edit service organization' : 'Add service organization'} subtitle="" />
      <ParentCard title={id ? 'Edit the Following Form' : 'Fill up the Following Form'}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Name</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="organizationName"
                  name="organizationName"
                  value={formik.values.organizationName}
                  onChange={formik.handleChange}
                  error={formik.touched.organizationName && Boolean(formik.errors.organizationName)}
                  helperText={formik.touched.organizationName && formik.errors.organizationName}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Owner Name</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="ownerName"
                  name="ownerName"
                  value={formik.values.ownerName}
                  onChange={formik.handleChange}
                  error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
                  helperText={formik.touched.ownerName && formik.errors.ownerName}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>State</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="state"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>City</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
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

              <Grid item xs={12} lg={12}>
                <CustomFormLabel>Map Selection</CustomFormLabel>
                <LocationInput setFieldValue={formik.setFieldValue} />
                {formik.touched.mapSelection && formik.errors.mapSelection && (
                  <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.mapSelection}</div>
                )}
              </Grid>

              <Grid item xs={12} lg={12}>
                <CustomFormLabel>Organization Bio</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={2}
                  id="organizationBio"
                  name="organizationBio"
                  value={formik.values.organizationBio}
                  onChange={formik.handleChange}
                  error={formik.touched.organizationBio && Boolean(formik.errors.organizationBio)}
                  helperText={formik.touched.organizationBio && formik.errors.organizationBio}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <CustomFormLabel>Organization Description</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={2}
                  id="organizationDescription"
                  name="organizationDescription"
                  value={formik.values.organizationDescription}
                  onChange={formik.handleChange}
                  error={formik.touched.organizationDescription && Boolean(formik.errors.organizationDescription)}
                  helperText={formik.touched.organizationDescription && formik.errors.organizationDescription}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Employee Numbers</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="employeeNumbers"
                  name="employeeNumbers"
                  value={formik.values.employeeNumbers}
                  onChange={formik.handleChange}
                  error={formik.touched.employeeNumbers && Boolean(formik.errors.employeeNumbers)}
                  helperText={formik.touched.employeeNumbers && formik.errors.employeeNumbers}
                />
              </Grid>
              
              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Website (optional)</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="organizationWebsite"
                  name="organizationWebsite"
                  value={formik.values.organizationWebsite}
                  onChange={formik.handleChange}
                  error={formik.touched.organizationWebsite && Boolean(formik.errors.organizationWebsite)}
                  helperText={formik.touched.organizationWebsite && formik.errors.organizationWebsite}
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
                <CustomFormLabel>Emergency Phone Number</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="emergencyPhoneNumber"
                  name="emergencyPhoneNumber"
                  value={formik.values.emergencyPhoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.emergencyPhoneNumber && Boolean(formik.errors.emergencyPhoneNumber)}
                  helperText={formik.touched.emergencyPhoneNumber && formik.errors.emergencyPhoneNumber}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Logo</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="file"
                  id="organizationLogo"
                  name="organizationLogo"
                  onChange={formik.handleChange}
                  error={formik.touched.organizationLogo && Boolean(formik.errors.organizationLogo)}
                  helperText={formik.touched.organizationLogo && formik.errors.organizationLogo}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Banner/Cover Photo</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="file"
                  id="organizationBanner"
                  name="organizationBanner"
                  onChange={formik.handleChange}
                  error={formik.touched.organizationBanner && Boolean(formik.errors.organizationBanner)}
                  helperText={formik.touched.organizationBanner && formik.errors.organizationBanner}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Trade License</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="file"
                  id="tradeLicense"
                  name="tradeLicense"
                  onChange={formik.handleChange}
                  error={formik.touched.tradeLicense && Boolean(formik.errors.tradeLicense)}
                  helperText={formik.touched.tradeLicense && formik.errors.tradeLicense}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Documents (PDF/Image/Word)</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  type="file"
                  inputProps={{ multiple: true }}
                  id="organizationDocuments"
                  name="organizationDocuments"
                  onChange={formik.handleChange}
                  error={formik.touched.organizationDocuments && Boolean(formik.errors.organizationDocuments)}
                  helperText={formik.touched.organizationDocuments && formik.errors.organizationDocuments}
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
