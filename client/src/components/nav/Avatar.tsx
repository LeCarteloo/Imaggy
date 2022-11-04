import { Avatar as UserAvatar, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

type AvatarProps = {
  name: string;
  surname: string;
  isPro?: boolean;
  fontSize?: 'sm' | 'md';
  img?: string;
  width?: number | string;
  height?: number | string;
};

type StyledAvatarProps = {
  isPro?: boolean;
};

type StyledLinkProps = {
  fontSize?: 'sm' | 'md';
};

const StyledAvatar = styled(UserAvatar, {
  shouldForwardProp: (prop) => prop !== 'isPro',
})<StyledAvatarProps>(({ theme, isPro }) => ({
  outline: isPro ? `2px solid ${theme.palette.primary.main}` : '',
}));

const StyledLink = styled(Link)<StyledLinkProps>(({ theme, fontSize }) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  padding: '2px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: fontSize === 'sm' ? '8px' : '13px',
}));

const Avatar = ({
  img,
  name,
  surname,
  isPro = false,
  fontSize = 'md',
  width,
  height,
}: AvatarProps) => {
  console.log(name, surname);

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledAvatar
        sx={{ width: width, height: height }}
        isPro={isPro}
        alt={`${name} ${surname}`}
        src={img}
      >
        {`${name[0]}${surname[0]}`}
      </StyledAvatar>
      {isPro ? (
        <StyledLink fontSize={fontSize} to="/imaggyplus">
          PRO
        </StyledLink>
      ) : null}
    </Box>
  );
};

export default Avatar;
