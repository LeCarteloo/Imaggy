import { Check } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  styled,
  Typography,
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '3px',
  backgroundImage: `linear-gradient(${theme.palette.primary.main}, #0099ff, ${theme.palette.primary.main})`,
}));

const PlanCard = () => {
  return (
    <StyledCard>
      <CardContent sx={{ p: 4, background: 'black' }}>
        <Typography variant="h4">$5 monthly</Typography>
        <Typography>5 dollars, billed monthly</Typography>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          <li>Uploading videos and gifs</li>
          <li>Special avatar outline</li>
          <li>Special banner on profile page</li>
          <li>Priority in search results</li>
        </ul>
        <Button variant="contained" fullWidth sx={{ mt: 3 }}>
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
  );
};

export default PlanCard;
