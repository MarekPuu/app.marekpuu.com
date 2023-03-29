import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './styles/HouseholdSettings.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import MembersTabPanel from '../components/HouseholdSetttingsPage/MembersTabPanel';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SuspenseWithLoader from '../components/Suspense/Suspense';
import GeneralTabPanel from '../components/HouseholdSetttingsPage/HouseholdGeneralTabPanel';

const acceptedHash = ['#general', '#members'];

const HouseholdSettings = () => {
  const { id } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(() => {
    if (acceptedHash.find((e) => e === hash)) return hash;
    return '#general';
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (hash !== value) navigate(`${value}`);
  }, [value]);

  useEffect(() => {
    if (acceptedHash.find((e) => e === hash)) setValue(hash);
    else navigate(`${value}`);
  }, [hash]);

  return (
    <SuspenseWithLoader>
      <div className="householdsetting_container ">
        <Breadcrumbs sx={{ marginBottom: '50px' }} aria-label="breadcrumb">
          <Link to={`/talous/${id}`}>Talous</Link>
          <Typography color="text.primary">Asetukset</Typography>
        </Breadcrumbs>
        <TabContext value={value}>
          <Box sx={{ width: '100%' }}>
            <Typography
              className="fontSize-500 colorGrey"
              sx={{ marginBottom: 5, fontWeight: '500' }}
              variant="h4"
              component="h4"
            >
              Talouden asetukset
            </Typography>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              value={value}
              onChange={handleChange}
              aria-label="asetukset tabs"
            >
              <Tab value="#general" label="Yleiset" />
              <Tab value="#members" label="Jäsenet" />
            </Tabs>
            <TabPanel className="padding-500" value="#general">
              <GeneralTabPanel />
            </TabPanel>
            <TabPanel className="padding-500" value="#members">
              <MembersTabPanel />
            </TabPanel>
          </Box>
        </TabContext>
      </div>
    </SuspenseWithLoader>
  );
};

export default HouseholdSettings;
