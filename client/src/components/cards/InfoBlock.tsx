import { Paper, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'reverse' && prop !== 'bgColor',
})<StyledProps>(({ theme, reverse, bgColor }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: reverse ? 'row' : 'row-reverse',
  img: {
    width: '50%',
    objectFit: 'cover',
  },
  backgroundColor: bgColor ? bgColor : '',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    img: {
      width: '100%',
    },
  },
}));

interface StyledProps {
  reverse: boolean;
  bgColor?: string;
}

interface InfoBlockProps {
  img: string;
  title: string;
  desc: string;
  reverse?: boolean;
  bgColor?: string;
}

const InfoBlock = ({
  img,
  title,
  desc,
  bgColor,
  reverse = false,
}: InfoBlockProps) => {
  return (
    <StyledPaper bgColor={bgColor} reverse={reverse}>
      <img src={img} />
      <Box
        sx={{
          pl: 4,
          pr: 4,
          pt: 10,
          pb: 10,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Box>
    </StyledPaper>
  );
};

export default InfoBlock;
