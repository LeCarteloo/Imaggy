import { motion } from 'framer-motion';

const UserSection = () => {
  return (
    <motion.section
      animate={{ x: '0%' }}
      exit={{ x: '-100%' }}
      initial={{ x: '100%' }}
      transition={{
        duration: 0.75,
        ease: 'easeInOut',
      }}
      style={{ position: 'absolute', width: '100%' }}
    >
      UserSection
    </motion.section>
  );
};

export default UserSection;
