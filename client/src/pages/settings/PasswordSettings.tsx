import { Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { changePasswordSchema } from '../../schemas';

const pwdInputs = [
  {
    id: 'currentPassword',
    label: 'Current password',
  },
  {
    id: 'newPassword',
    label: 'New password',
  },
  {
    id: 'repeatPassword',
    label: 'Repeat new password',
  },
];

const PasswordSettings = () => {
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    onSubmit: async (values, actions) => {
      // TODO: Future api call
      // Clearing form
      actions.resetForm();
    },
    validationSchema: changePasswordSchema,
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
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" component="h1" sx={{ mb: 4 }}>
          Change password
        </Typography>
        {pwdInputs.map((input) => {
          const id = input.id as keyof typeof values;
          return (
            <TextField
              key={id}
              id={id}
              label={input.label}
              value={values[id]}
              helperText={errors[id] && touched[id] ? errors[id] : null}
              error={Boolean(errors[id] && touched[id])}
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          );
        })}
        <Button
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Changing password...' : 'Change password'}
        </Button>
      </form>
    </motion.section>
  );
};

export default PasswordSettings;
