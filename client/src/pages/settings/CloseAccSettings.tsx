import { Button, TextField, Typography } from '@mui/material';
import { useFormik, validateYupSchema } from 'formik';
import { motion } from 'framer-motion';
import { closeAccountSchema } from '../../schemas';


const CloseAccSettings = () => {
  const handleDeleteAccount = () => {
    // TODO: Future api call
    console.log(values);
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      currentPassword: '',
    },
    onSubmit: handleDeleteAccount,
    validationSchema: closeAccountSchema,
  });


  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
      }}
    >
      <Typography variant="h6" component="h1" sx={{ mb: 4 }}>
        Close account
      </Typography>
      <Typography>
        <Typography color="primary" component="strong" fontWeight="bolder">
          {'Warning: '}
        </Typography>
        closing your account is irreversible. It deletes all of your photos,
        connections, and stats.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          id="currentPassword"
          label="Current password" 
          margin="normal" 
          fullWidth 
          error={Boolean(errors.currentPassword) && touched.currentPassword}
          helperText={errors.currentPassword && touched.currentPassword ? errors.currentPassword : null}
          value={values.currentPassword}
          onChange={handleChange} 
          onBlur={handleBlur}
        />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {isSubmitting ? "Deleting account..." : "Delete account"}
      </Button>
      </form>
    </motion.section>
  );
};

export default CloseAccSettings;
