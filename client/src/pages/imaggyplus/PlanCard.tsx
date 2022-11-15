import { Check } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  styled,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '3px',
  backgroundImage: `linear-gradient(${theme.palette.primary.main}, #0099ff, ${theme.palette.primary.main})`,
}));

interface PlanCardProps {
  title: string;
  subtitle: string;
  list: string[];
}

const PlanCard = ({ title, subtitle, list }: PlanCardProps) => {
  return (
    <motion.div style={{ width: '100%' }}>
      <StyledCard>
        <CardContent sx={{ p: 4, background: 'black' }}>
          <Typography variant="h4">{title}</Typography>
          <Typography>{subtitle}</Typography>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {list.map((item, i) => (
              <li key={i}>- {item}</li>
            ))}
          </ul>
          <Button
            variant="contained"
            component={Link}
            to={'/biling'}
            sx={{ mt: 3 }}
            fullWidth
          >
            Get Imaggy+
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 3 }}>
            <Box sx={{ display: 'flex' }}>
              <Check /> Renews automatically
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Check /> Cancel anytime
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default PlanCard;
