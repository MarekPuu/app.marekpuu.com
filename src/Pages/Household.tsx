import React from 'react';
import DataTableContainer from '../components/HouseholdPage/DataTableContainer';
import './styles/Talous.css';
import SuspenseWithLoader from '../components/Suspense/Suspense';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMyHouseholds } from '../api/services/household';
import { useAxios } from '../api/axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Talous = () => {
  const { id } = useParams();
  const axios = useAxios();

  const { isLoading, error, data } = useQuery(
    'myHouseholds',
    () => getMyHouseholds(axios),
    { enabled: false }
  );

  const activeHousehold = data?.data?.find((h: any) => id === h.householdId);

  return (
    <SuspenseWithLoader>
      <div className="talouspage_page_container">
        <Breadcrumbs sx={{ marginBottom: '50px' }} aria-label="breadcrumb">
          <Typography color="text.primary">
            Talous / {`${activeHousehold?.householdName}`}
          </Typography>
        </Breadcrumbs>
        <Box sx={{ width: '100%' }}>
          <Typography
            className="fontSize-500 colorGrey"
            sx={{ marginBottom: 5, fontWeight: '500' }}
            variant="h4"
            component="h4"
          >
            Talouden Menot
          </Typography>
        </Box>
      </div>
    </SuspenseWithLoader>
  );
};

export default Talous;
