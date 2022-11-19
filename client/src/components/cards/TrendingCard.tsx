import { styled, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledTrendingCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  aspectRatio: '1/1',
  textDecoration: 'none',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,

  img: {
    position: 'absolute',
    top: 0,
    zIndex: -2,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  '&:hover': {
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
})) as typeof Box;

interface TrendingCardProps {
  title: string;
  img: string;
  to: string;
}

const TrendingCard = ({ title, img, to }: TrendingCardProps) => {
  return (
    <StyledTrendingCard component={Link} to={to}>
      <Typography textAlign="center" variant="h4" color="#fff">
        {title}
      </Typography>
      <img src={img} />
    </StyledTrendingCard>
  );
};

export default TrendingCard;
