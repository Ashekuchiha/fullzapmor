import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, FormHelperText, Grid, MenuItem } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import LocationInput from './locationInput/LocationInput';
import { useNavigate, useParams } from 'react-router';
import { values } from 'lodash';
import axios from 'axios';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

// Validation schema using Yup
const validationSchema = yup.object({
  organizationName: yup.string(),
  ownerName: yup.string(),
  state: yup.string(),
  city: yup.string(),
  address: yup.string(),
  organizationBio: yup.string(),
  organizationDescription: yup.string(),
  organizationWebsite: yup.string(),
  phoneNumber: yup.string().matches(/^[0-9]+$/, 'Phone Number must be only digits'),  
  emergencyPhoneNumber: yup.string().matches(/^[0-9]+$/, 'Emergency Phone Number must be only digits'), 
  employeeNumbers: yup.number().integer('Employee Numbers must be an integer').positive('Employee Numbers must be a positive number')
,});

export default function AddServicesLocationForm() {
  const basic = "https://fullzapmor-api.vercel.app";
  const cbasic = "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [StateNames, setStateNames] = useState([]);
  const [CityNames, setCityNames] = useState([]);

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
      organizationDocuments: null, // For multiple file uploads, initialize as an empty array
    },
    
    validationSchema: validationSchema,
    // onSubmit: async (values) => {
    //   const formData = new FormData();
    
    //   // Append each field to the FormData
    //   formData.append('organizationName', values.organizationName);
    //   formData.append('ownerName', values.ownerName);
    //   formData.append('state', values.state);
    //   formData.append('city', values.city);
    //   formData.append('address', values.address);
    
    //   // Append arrays like mapSelection by converting them to JSON
    //   formData.append('mapSelection', JSON.stringify(values.mapSelection));
    
    //   formData.append('organizationBio', values.organizationBio);
    //   formData.append('organizationDescription', values.organizationDescription);
    //   formData.append('organizationWebsite', values.organizationWebsite);
    //   formData.append('phoneNumber', values.phoneNumber);
    //   formData.append('emergencyPhoneNumber', values.emergencyPhoneNumber);
    //   formData.append('employeeNumbers', values.employeeNumbers);
    
    //   // Append file inputs if they are provided
    //   if (values.organizationLogo) {
    //     formData.append('organizationLogo', values.organizationLogo);
    //   }
    //   if (values.organizationBanner) {
    //     formData.append('organizationBanner', values.organizationBanner);
    //   }
    //   if (values.tradeLicense) {
    //     formData.append('tradeLicense', values.tradeLicense);
    //   }
    //   if (values.organizationDocuments) {
    //     formData.append('organizationDocuments', values.organizationDocuments);
    //   }
    
    //   console.log(formData)
    //   console.log(JSON.stringify(values))
    //   alert(JSON.stringify(values))
    //   try {
    //     const url = id
    //       ? `${basic}/api/service-organization/${id}`
    //       : `${basic}/api/service-organization`;
    //     const method = id ? 'PUT' : 'POST';

    //     // Send JSON instead of FormData
    //     const response = await fetch(url, {
    //       method: method,
    //       headers:{
    //         'Content-Type':'multipart/form-data'
    //       },
    //       body: formData,
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to submit form');
    //     }

    //     const data = await response.json();
    //     console.log('Success:', data);
    //     alert(id ? 'Service updated successfully!' : 'Form submitted successfully!');
    //     formik.resetForm(); // Reset form after successful submission
    //     navigate(`/admin/serviceslocation/all`);
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('Failed to submit the form.');
    //   }
    // },
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
      formData.append('organizationLogo', values.organizationLogo);
      formData.append('organizationBanner', values.organizationBanner);
      formData.append('tradeLicense', values.tradeLicense);
      formData.append('organizationDocuments', values.organizationDocuments);

      // Append file inputs if they are provided
      // if (values.organizationLogo) {
      //   formData.append('organizationLogo', values.organizationLogo);
      // }
      // if (values.organizationBanner) {
      //   formData.append('organizationBanner', values.organizationBanner);
      // }
      // if (values.tradeLicense) {
      //   formData.append('tradeLicense', values.tradeLicense);
      // }
      // if (values.organizationDocuments) {
      //   formData.append('organizationDocuments', values.organizationDocuments);
      // }
      alert(JSON.stringify(values),)
      console.log(JSON.stringify(values))
      try {
        const url = id
          ? `${basic}/api/service-organization/${id}`
          : `${basic}/api/service-organization`;
        const method = id ? 'PUT' : 'POST';
    
        // Send FormData without manually setting headers
        const response = await fetch(url, {
          method: method,
          body: formData,
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
      fetch(`${basic}/api/service-organization/${id}`)
        .then((response) => response.json())
        .then((data) => {
          formik.setValues({
            organizationName: data.data.organizationName || '',
            ownerName: data.data.ownerName || '',
            state: data.data.state || '',
            city: data.data.city || '',
            address: data.data.address || '',
            mapSelection: data.data.mapSelection || [], // Expecting [latitude, longitude]
            organizationBio: data.data.organizationBio || '',
            organizationDescription: data.data.organizationDescription || '',
            organizationWebsite: data.data.organizationWebsite || '',
            phoneNumber: data.data.phoneNumber || '',
            emergencyPhoneNumber: data.data.emergencyPhoneNumber || '',
            employeeNumbers: data.data.employeeNumbers || '',
            organizationLogo: data.data.organizationLogo || null, // For file uploads, initialize as null
            organizationBanner: data.data.organizationBanner || null, // For file uploads, initialize as null
            tradeLicense: data.data.tradeLicense || null, // For file uploads, initialize as null
            organizationDocuments: data.data.organizationDocuments || [], // For multiple file uploads, initialize as an empty array
        });        
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [id]); // Fetch data on mount if there's an ID

  //state
  useEffect(() => {
    // Fetch the service options from the API
    const fetchStateName = async () => {
        try {
            const response = await axios.get(`${basic}/api/states/all`);
            setStateNames(response.data.data.data); // Assuming the data is an array of service objects
            console.log(response)
        } catch (error) {
            console.error('Error fetching StateName:', error);
        }
    };

    fetchStateName();
}, []);

  //city
  useEffect(() => {
    // Fetch the service options from the API
    const fetchStateName = async () => {
        try {
            const response = await axios.get(`${basic}/api/cities/all`);
            setCityNames(response.data.data.data); // Assuming the data is an array of service objects
            console.log(response)
        } catch (error) {
            console.error('Error fetching StateName:', error);
        }
    };

    fetchStateName();
}, []);

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
                <CustomSelect
                    labelId="state-select"
                    fullWidth
                    id="state" 
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    >
                       {StateNames.map(state => (
                    <MenuItem key={state.id} value={state.StateName}>
                        {state.StateName}
                    </MenuItem>
                ))}
                    </CustomSelect>
                    {formik.errors.state && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.state}{' '}
                        </FormHelperText>
                    )}
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>City</CustomFormLabel>
                <CustomSelect
                    labelId="city-select"
                    fullWidth
                    id="city" 
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    >
                       {CityNames.map(city => (
                    <MenuItem key={city.id} value={city.cityName}>
                        {city.cityName}
                    </MenuItem>
                ))}
                    </CustomSelect>
                    {formik.errors.city && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {' '}
                            {formik.errors.city}{' '}
                        </FormHelperText>
                    )}
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
                <LocationInput setFieldValue={formik.setFieldValue}  mapSelection={formik.values.mapSelection}/>
                {formik.touched.mapSelection && formik.errors.mapSelection && (
                    <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.mapSelection}</div>
                  )
                }
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button component="label">
                      Upload organizationLogo Image
                      <input
                        type="file"
                        hidden
                        onChange={(event) => formik.setFieldValue('organizationLogo', event.currentTarget.files[0])}
                      />
                    </Button>
                    {formik.values.organizationLogo && (
                      <Box sx={{ ml: 2 }}>{typeof formik.values.organizationLogo === 'object' ? (
                        formik.values.organizationLogo.name // Display the uploaded file name
                      ) : (
                        <a href={formik.values.organizationLogo} target="_blank" rel="noopener noreferrer">
                          {formik.values.organizationLogo.split('/').pop()} {/* Display the fetched organizationLogo name */}
                        </a>
                      )}</Box>
                    )}
                  </Box>
                  {formik.touched.organizationLogo && formik.errors.organizationLogo && (
                    <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.organizationLogo}</div>
                  )}
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Banner/Cover Photo</CustomFormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button component="label">
                      Upload organizationBanner Image
                      <input
                        type="file"
                        hidden
                        onChange={(event) => formik.setFieldValue('organizationBanner', event.currentTarget.files[0])}
                      />
                    </Button>
                    {formik.values.organizationBanner && (
                      <Box sx={{ ml: 2 }}>{typeof formik.values.organizationBanner === 'object' ? (
                        formik.values.organizationBanner.name // Display the uploaded file name
                      ) : (
                        <a href={formik.values.organizationBanner} target="_blank" rel="noopener noreferrer">
                          {formik.values.organizationBanner.split('/').pop()} {/* Display the fetched organizationBanner name */}
                        </a>
                      )}</Box>
                    )}
                  </Box>
                  {formik.touched.organizationBanner && formik.errors.organizationBanner && (
                    <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.organizationBanner}</div>
                  )}
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Trade License</CustomFormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button component="label">
                      Upload tradeLicense Image
                      <input
                        type="file"
                        hidden
                        onChange={(event) => formik.setFieldValue('tradeLicense', event.currentTarget.files[0])}
                      />
                    </Button>
                    {formik.values.tradeLicense && (
                      <Box sx={{ ml: 2 }}>{typeof formik.values.tradeLicense === 'object' ? (
                        formik.values.tradeLicense.name // Display the uploaded file name
                      ) : (
                        <a href={formik.values.tradeLicense} target="_blank" rel="noopener noreferrer">
                          {formik.values.tradeLicense.split('/').pop()} {/* Display the fetched tradeLicense name */}
                        </a>
                      )}</Box>
                    )}
                  </Box>
                  {formik.touched.tradeLicense && formik.errors.tradeLicense && (
                    <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.tradeLicense}</div>
                  )}
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel>Organization Documents (PDF/Image/Word)</CustomFormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button component="label">
                      Upload organizationDocuments Image
                      <input
                        type="file"
                        hidden
                        onChange={(event) => formik.setFieldValue('organizationDocuments', event.currentTarget.files[0])}
                      />
                    </Button>
                    {formik.values.organizationDocuments && (
                      <Box sx={{ ml: 2 }}>{typeof formik.values.organizationDocuments === 'object' ? (
                        formik.values.organizationDocuments.name // Display the uploaded file name
                      ) : (
                        <a href={formik.values.organizationDocuments} target="_blank" rel="noopener noreferrer">
                          {formik.values.organizationDocuments.split('/').pop()} {/* Display the fetched organizationDocuments name */}
                        </a>
                      )}</Box>
                    )}
                  </Box>
                  {formik.touched.organizationDocuments && formik.errors.organizationDocuments && (
                    <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.organizationDocuments}</div>
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
