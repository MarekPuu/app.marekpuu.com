import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import Loading from '../components/LoadingSpinner/Loading';
import CreateTalousModal from '../components/Modals/CreateHousehold';
import Button from '@mui/material/Button';
import { getMyHouseholds } from '../api/services/household';
import { useAxios } from '../api/axios';

const NavigateToTalousById = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [haveError, setHaveError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const axios = useAxios();

  const { isLoading, error, data } = useQuery('myHouseholds', () =>
    getMyHouseholds(axios)
  );

  const redirectTo = data?.data[0]?.householdId || null;
  const canCreateHousehold = !!!redirectTo && !haveError;

  useEffect(() => {
    if (!!error && error instanceof Error) {
      setErrorMessage(error.message);
      setHaveError(true);
    }
  }, [error]);

  if (!!redirectTo)
    return <Navigate to={`/talous/${data.data[0]?.householdId}`} />;

  return (
    <div style={styles}>
      {haveError ? (
        <h2>{errorMessage}</h2>
      ) : isLoading ? (
        <Loading />
      ) : canCreateHousehold ? (
        <Button onClick={() => setIsOpenModal(true)} variant="outlined">
          Luo uusi talous
        </Button>
      ) : (
        <h2>Odottamaton virhe</h2>
      )}
      <CreateTalousModal open={isOpenModal} setOpen={setIsOpenModal} />
    </div>
  );
};

const styles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default NavigateToTalousById;
