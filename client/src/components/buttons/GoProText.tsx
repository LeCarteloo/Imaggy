import { Typography } from '@mui/material';
import { keyframes, styled } from '@mui/system';

const gradientChange = keyframes`
  from {
    background-position: 0% center;
  }
  
  to {
    background-position: -200% center;
  }
`;

const StyledTypography = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, #0099ff, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  backgroundSize: '200%',
  color: 'transparent',
  fontWeight: 'bold',
  animation: `${gradientChange} 3s linear infinite;`,
}));

const GoProText = () => {
  return <StyledTypography variant="h6">Imaggy+</StyledTypography>;
};

export default GoProText;
