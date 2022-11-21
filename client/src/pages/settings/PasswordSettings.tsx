import { Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const PasswordSettings = () => {
  const [values, setValues] = useState({
    current: '',
    new: '',
    repeat: '',
  });

  const pwdInputs = [
    {
      id: 'current',
      label: 'Current password',
    },
    {
      id: 'new',
      label: 'New password',
    },
    {
      id: 'repeat',
      label: 'Repeat new password',
    },
  ];

  const handleChangePasswd = () => {};

  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
      }}
    >
      <form onSubmit={handleChangePasswd}>
        <Typography variant="h6" component="h1" sx={{ mb: 4 }}>
          Change password
        </Typography>
        {pwdInputs.map((input) => (
          <TextField key={input.id} {...input} margin="normal" fullWidth />
        ))}
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Change password
        </Button>
      </form>
    </motion.section>
  );
};

export default PasswordSettings;
