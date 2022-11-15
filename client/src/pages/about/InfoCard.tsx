import { Paper, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Img from '../../assets/imaggyplus-profile.png';

const StyledPaper = styled(Paper)<DirectionType>(({ theme, reverse }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: reverse ? 'row' : 'row-reverse',
  img: {
    width: '50%',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    img: {
      width: '100%',
    },
  },
}));

type DirectionType = {
  reverse: boolean;
};

interface InfoCardProps {
  img: string;
  title: string;
  desc: string;
  reverse?: boolean;
}

const InfoCard = ({ img, title, desc, reverse = false }: InfoCardProps) => {
  return (
    <StyledPaper reverse={reverse}>
      <img src={img} />
      <Box sx={{ p: 8 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Box>
    </StyledPaper>
  );
};

export default InfoCard;
