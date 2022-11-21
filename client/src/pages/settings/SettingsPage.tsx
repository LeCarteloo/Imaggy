import { Container, Box } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, NavTabs } from '../../components';
import CloseAccSettings from './CloseAccSettings';
import GeneralSettings from './GeneralSettings';
import PasswordSettings from './PasswordSettings';

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    {
      label: `General`,
      to: '',
    },
    {
      label: `Change password`,
      to: 'password',
    },
    {
      label: `Close account`,
      to: 'close',
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <>
      <Container sx={{ pt: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <NavTabs
            currentTab={currentTab}
            tabs={tabs}
            onChange={handleChange}
          />
        </Box>
        <Routes>
          <Route path="/" element={<GeneralSettings />} />
          <Route path="/password" element={<PasswordSettings />} />
          <Route path="/close" element={<CloseAccSettings />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default SettingsPage;
