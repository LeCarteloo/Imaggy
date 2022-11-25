import { Box, Paper, styled } from '@mui/material';

const StyledSpan = styled('span')(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
}));

interface IConsoleWindow {
  children: React.ReactNode;
}

const ConsoleWindow = ({ children }: IConsoleWindow) => {
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
      <Box
        sx={{
          p: '16px 16px 0 16px',
          position: 'relative',
          overflow: 'hidden',
          overflowWrap: 'break-word',
          maxHeight: '305px',
          fontSize: '12px',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            height: '20px',
            pointerEvents: 'none',
            borderRadius: '4px',
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%);',
          },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default ConsoleWindow;
