import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../api/axios';
import { getMyHouseholds } from '../../api/services/household';
import { Button, Tooltip } from '@mui/material';
import DeleteHouseholdDialog from '../Dialog/DeleteHousehold';

const HouseholdGeneralTabPanel = () => {
  const axios = useAxios();
  const { user } = useAuth0();
  const { id } = useParams();

  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const { isLoading, error, data } = useQuery('myHouseholds', () =>
    getMyHouseholds(axios)
  );

  const activeHousehold: IActiveHousehold = data?.data?.find(
    (h: IActiveHousehold) => id === h.householdId
  );

  const canDeleteHousehold = activeHousehold?.ownerId === user?.sub;

  return (
    <Box
      className="colorGrey"
      sx={{
        // bgcolor: '#cfe8fc',
        width: '100%',
        height: '100%',
        paddingTop: 2,
      }}
    >
      <Box sx={styles}>
        <Typography fontWeight={500}>Talouden nimi</Typography>
        <Typography>{activeHousehold.householdName}</Typography>
      </Box>
      <Box sx={styles}>
        <Typography fontWeight={500}>Talouden omistaja</Typography>
        <Typography>{activeHousehold.ownerName}</Typography>
      </Box>
      <Box sx={styles}>
        <Typography fontWeight={500}>Talous luotu</Typography>
        <Typography>{formatDate(activeHousehold.createdAt)}</Typography>
      </Box>
      <Box sx={styles}>
        <Typography fontWeight={500}>Minun rooli</Typography>
        <Typography>{activeHousehold.roleName}</Typography>
      </Box>
      <Box sx={{ marginTop: '100px', paddingBottom: '20px' }}>
        <Box sx={styles}>
          <Typography fontWeight={500}>Vaihda omistajaa</Typography>
          <Tooltip title="Ominaisuus tulossa">
            <div>
              <Button
                disabled={true}
                sx={{
                  color: 'red',
                  borderColor: 'red',
                  '&:hover': {
                    backgroundColor: 'red',
                    color: 'white',
                    borderColor: 'red',
                  },
                }}
                variant="outlined"
              >
                Vaihda omistajaa
              </Button>
            </div>
          </Tooltip>
        </Box>
        <Box sx={styles}>
          <Typography fontWeight={500}>Poista talous pysyvästi</Typography>
          <Tooltip title={canDeleteHousehold ? '' : 'Ei oikeuksia'}>
            <div>
              <Button
                onClick={() => setIsOpenDelete(true)}
                disabled={!canDeleteHousehold}
                sx={{
                  color: 'red',
                  borderColor: 'red',
                  '&:hover': {
                    backgroundColor: 'red',
                    color: 'white',
                    borderColor: 'red',
                  },
                }}
                variant="outlined"
              >
                Poista
              </Button>
            </div>
          </Tooltip>
        </Box>
      </Box>
      <DeleteHouseholdDialog setOpen={setIsOpenDelete} open={isOpenDelete} />
    </Box>
  );
};

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

interface IActiveHousehold {
  householdId: string;
  householdName: string;
  roleName: string;
  ownerName: string;
  createdAt: string;
  ownerId: string;
}

export default HouseholdGeneralTabPanel;
