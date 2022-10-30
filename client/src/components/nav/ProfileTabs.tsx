import { Box, SvgIconProps, Tab, Tabs, tabsClasses } from '@mui/material';
import { Image, Collections, Favorite } from '@mui/icons-material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type ProfileTabsProps = {
  currentTab: number;
  onChange: (event: React.SyntheticEvent, newTab: number) => void;
};

type LinkTabProps = {
  label: string;
  to: string;
  icon?: React.ReactElement<SvgIconProps>;
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

const LinkTab = (props: LinkTabProps) => (
  <Tab component={Link} iconPosition="start" sx={{ minHeight: 0 }} {...props} />
);

const ProfileTabs = ({ currentTab, onChange }: ProfileTabsProps) => {
  const tabs = [
    {
      label: 'Posts',
      icon: <Image fontSize="small" />,
      to: '',
    },
    {
      label: 'Followers',
      icon: <Favorite fontSize="small" />,
      to: 'followers',
    },
    {
      label: 'Following',
      icon: <Favorite fontSize="small" />,
      to: 'following',
    },
    {
      label: 'Collection',
      icon: <Collections fontSize="small" />,
      to: 'collection',
    },
  ];

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
      <StyledTabs
        value={currentTab}
        onChange={onChange}
        variant={'scrollable'}
        scrollButtons
        allowScrollButtonsMobile
        sx={{ pl: { sm: 3 } }}
      >
        {tabs.map((tab) => (
          <LinkTab key={tab.label} {...tab}></LinkTab>
        ))}
      </StyledTabs>
    </Box>
  );
};

export default ProfileTabs;
