import { Box, Paper, styled } from '@mui/material';

const StyledSpan = styled('span')(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled(Box)(({ theme }) => ({
  padding: '16px 16px 0 16px',
  position: 'relative',
  overflow: 'hidden',
  overflowWrap: 'break-word',
  fontSize: '12px',
  maxHeight: '305px',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '20px',
    pointerEvents: 'none',
    borderRadius: '4px',
    background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, transparent 100%);`,
  },
}));

interface IConsoleWindow {
  height?: string;
  width?: string;
  children: React.ReactNode;
}

const ConsoleWindow = ({ height, width, children }: IConsoleWindow) => {
  return (
    <Paper>
      <Box
        bgcolor={'divider'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
          height: '15px',
          borderRadius: '4px 4px 0 0',
          pl: 1,
        }}
      >
        <StyledSpan></StyledSpan>
        <StyledSpan></StyledSpan>
        <StyledSpan></StyledSpan>
      </Box>
      <StyledContent height={height} width={width}>
        {children}
      </StyledContent>
    </Paper>
  );
};

export default ConsoleWindow;
