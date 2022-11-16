import { Paper, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Img from '../../assets/imaggyplus-profile.png';

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'reverse',
})<DirectionType>(({ theme, reverse }) => ({
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

interface InfoBlockProps {
  img: string;
  title: string;
  desc: string;
  reverse?: boolean;
}

const InfoBlock = ({ img, title, desc, reverse = false }: InfoBlockProps) => {
  return (
    <StyledPaper reverse={reverse}>
      <img src={img} />
      <Box sx={{ pl: 4, pr: 4, pt: 10, pb: 10 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Box>
    </StyledPaper>
  );
};

export default InfoBlock;
