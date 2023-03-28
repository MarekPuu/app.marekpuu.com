import { useQuery } from 'react-query';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAxios } from '../../api/axios';
import { getMyHouseholds } from '../../api/services/household';
import Loading from '../LoadingSpinner/Loading';

const HouseholdStateManager = () => {
  const axios = useAxios();
  const { id } = useParams();

  const myHouseholds = useQuery('myHouseholds', () => getMyHouseholds(axios));

  const { isLoading, data } = myHouseholds;

  const haveCurrentHousehold = data?.data.some(
    (household: any) => household.householdId === id
  );

  if (isLoading) return <Loading />;

  if (haveCurrentHousehold) return <Outlet />;

  return <Navigate replace to={'/'} />;
};

export default HouseholdStateManager;
