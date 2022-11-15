import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from '@mui/material';
import { useState } from 'react';
import PlanCard from './PlanCard';

const PricingSection = () => {
  const [plan, setPlan] = useState('monthly');

  const handlePlanChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlan: string
  ) => {
    setPlan(newPlan);
  };

  const plans = [
    {
      title: '$5 monthly',
      subtitle: '5 dollars, billed monthly',
      list: [
        'Uploading videos and gifs',
        'Special avatar outline',
        'Special banner on profile page',
        'Priority in search results',
      ],
    },
    {
      title: '$48 yearly',
      subtitle: '4 dollars, billed monthly',
      list: [
        'Uploading videos and gifs',
        'Special avatar outline',
        'Special banner on profile page',
        'Priority in search results',
      ],
    },
  ];
  return (
    <Box component={'section'} sx={{ mt: 10 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{ textAlign: 'center', pb: 3 }}
      >
        Imaggy+ Pricing
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>
        No bundles. No add-ons. One simple plan unlocks everything.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, pb: 4 }}>
        <ToggleButtonGroup
          exclusive
          value={plan}
          onChange={handlePlanChange}
          aria-label="Premium plans"
        >
          <ToggleButton value="monthly" aria-label="Monthly plan">
            Monthly
          </ToggleButton>
          <ToggleButton value="yearly" aria-label="Yearly plan">
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <PlanCard {...plans[plan === 'monthly' ? 0 : 1]} />
      </Box>
    </Box>
  );
};

export default PricingSection;
