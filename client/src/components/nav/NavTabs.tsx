import {
  Box,
  SvgIconProps,
  Tab,
  Tabs,
  tabsClasses,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

type TabsProps = {
  label: string;
  icon?: React.ReactElement<SvgIconProps>;
  to: string;
};

interface NavTabsProps {
  currentTab: number;
  tabs: TabsProps[];
  onChange: (event: React.SyntheticEvent, newTab: number) => void;
}

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

const NavTabs = ({ currentTab, tabs, onChange }: NavTabsProps) => {
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

export default NavTabs;
