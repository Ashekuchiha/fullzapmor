import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import LiveSwitch from './switch/LiveSwitch';

const validationSchema = yup.object({
  name: yup.string().min(2, 'Too Short!').max(80, 'Too Long!').required('required'),
  description: yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('required'),
  icon: yup.mixed().required('Icon is required'),
});

export default function AddServiceForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      icon: null,
      featured: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {console.log(values)
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('icon', values.icon);
      formData.append('featured', values.featured);

      try {
        const response = await fetch('https://fullzapmor-api.vercel.app/api/services', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData, // Let the browser handle the multipart/form-data
        });
        if (!response.ok) {
          throw new Error('Failed to submit form ');
        }

        const data = await response.json();
        console.log('Success:', data);
        alert('Form submitted successfully!');
        formik.resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the form.');
      }
    },
  });

  return (
    <PageContainer title="Service" description="this is Custom Form page">
      <Breadcrumb title="Service" subtitle="" />
      <ParentCard title="Fill up the Following Form">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mb={3}>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={12} lg={6}>
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

              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel>Description</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel>Icon</CustomFormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button component="label">
                    Upload Icon Image
                    <input
                      type="file"
                      hidden
                      onChange={(event) => formik.setFieldValue('icon', event.currentTarget.files[0])}
                    />
                  </Button>
                  {formik.values.icon && (
                    <Box sx={{ ml: 2 }}>{formik.values.icon.name}</Box>
                  )}
                </Box>
                {formik.touched.icon && formik.errors.icon && (
                  <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.icon}</div>
                )}
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <CustomFormLabel>Featured</CustomFormLabel>
                <LiveSwitch
                  initialChecked={formik.values.featured}
                  onSwitchChange={(value) => formik.setFieldValue('featured', value)}
                />
              </Grid>
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
