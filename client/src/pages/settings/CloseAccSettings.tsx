import { Button, Box, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CloseAccSettings = () => {
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
      <TextField label="Current password" margin="normal" fullWidth />
      <Button variant="contained" sx={{ mt: 2 }} aria-label="Delete account">
        Delete account
      </Button>
    </motion.section>
  );
};

export default CloseAccSettings;
