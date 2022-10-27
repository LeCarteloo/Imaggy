import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import {
  Explore as ExploreIcon,
  AddCard as AddCardIcon,
  WorkspacePremium as WorkspacePremiumIcon,
} from '@mui/icons-material';

type SideMenuProps = {
  open: boolean;
  handleOpen: () => void;
};

const SideMenu = ({ open, handleOpen }: SideMenuProps) => {
  const sideMenuItems = [
    {
      id: 1,
      text: 'Explore',
      icon: <ExploreIcon color="primary" />,
    },
    {
      id: 2,
      text: 'Advertise',
      icon: <AddCardIcon color="primary" />,
    },
    {
      id: 3,
      text: 'Imaggy+',
      icon: <WorkspacePremiumIcon color="primary" />,
    },
  ];

  return (
    <Drawer open={open} anchor="left" onClose={handleOpen}>
      <Box sx={{ width: '250px' }} role="presentation">
        <List>
          {sideMenuItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
