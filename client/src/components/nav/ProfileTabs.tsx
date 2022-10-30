import { Box, Tab, Tabs, tabsClasses } from '@mui/material';
import { Image, Collections, Favorite } from '@mui/icons-material';
import styled from '@emotion/styled';

type ProfileTabsProps = {
  currentTab: number;
  onChange: (event: React.SyntheticEvent, newTab: number) => void;
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  [`& .${tabsClasses.scrollButtons}`]: {
    '&.Mui-disabled': {
      opacity: 0.3,
    },
    [theme.breakpoints.up('sm')]: {
      '&.Mui-disabled': {
        display: 'none',
      },
    },
  },
}));

const ProfileTabs = ({ currentTab, onChange }: ProfileTabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
      <StyledTabs
        value={currentTab}
        onChange={onChange}
        variant={'scrollable'}
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab
          label="Photos"
          icon={<Image fontSize="small" />}
          iconPosition="start"
          sx={{ minHeight: 0 }}
        />
        <Tab
          label="Followers"
          icon={<Favorite fontSize="small" />}
          iconPosition="start"
          sx={{ minHeight: 0 }}
        />
        <Tab
          label="Following"
          icon={<Favorite fontSize="small" />}
          iconPosition="start"
          sx={{ minHeight: 0 }}
        />
        <Tab
          label="Collection"
          icon={<Collections fontSize="small" />}
          iconPosition="start"
          sx={{ minHeight: 0 }}
        />
      </StyledTabs>
    </Box>
  );
};

export default ProfileTabs;
