import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { UserInterface } from '../../types/types';
import UserCard from '../cards/UserCard';

interface UserSectionProps {
  users: UserInterface[];
}

const UserSection = ({ users }: UserSectionProps) => {
  return (
    <motion.section
      animate={{ x: '0%' }}
      exit={{ x: '-150%' }}
      initial={{ x: '100%' }}
      transition={{
        duration: 0.75,
        ease: 'easeInOut',
      }}
      style={{ position: 'relative', width: '100%' }}
    >
      <Grid container sx={{ mt: 1, position: 'absolute' }} spacing={1}>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </motion.section>
  );
};

export default UserSection;
