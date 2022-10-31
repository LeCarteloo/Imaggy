import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import UserCard from '../cards/UserCard';

const UserSection = () => {
  return (
    <motion.section
      animate={{ x: '00%' }}
      exit={{ x: '-150%' }}
      initial={{ x: '100%' }}
      transition={{
        duration: 0.75,
        ease: 'easeInOut',
      }}
      style={{ position: 'relative', width: '100%' }}
    >
      <Grid container sx={{ mt: 1, position: 'absolute' }} spacing={1}>
        <Grid item xs={12} md={6} lg={4}>
          <UserCard imgs={[]} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UserCard
            imgs={[
              '/images/photo.avif',
              '/images/photo.avif',
              '/images/photo.avif',
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UserCard imgs={[]} />
        </Grid>
      </Grid>
    </motion.section>
  );
};

export default UserSection;
