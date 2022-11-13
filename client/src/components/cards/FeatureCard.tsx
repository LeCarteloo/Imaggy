import { Box, Typography, Card, CardContent, styled } from '@mui/material';
import Gif01 from '../assets/imaggyplus-gif-01.gif';
import Gif02 from '../assets/imaggyplus-gif-02.gif';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  img: string;
  display?: 'column' | 'row';
}

type StyledBoxProps = {
  display: 'column' | 'row';
};

const StyledBox = styled(Box)<StyledBoxProps>(({ theme, display }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: display,

  img: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: display === 'row' ? 'column' : '',
    img: {
      width: '100%',
      height: '200px',
    },
  },
}));

const FeatureCard = ({
  title,
  subtitle,
  img,
  display = 'row',
}: FeatureCardProps) => {
  return (
    <Card>
      <StyledBox display={display}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 4,
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" component="h3">
            {title}
          </Typography>
          <Typography>{subtitle}</Typography>
        </CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <img src={img} />
        </Box>
      </StyledBox>
    </Card>
  );
};

export default FeatureCard;
