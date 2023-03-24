import { AxiosResponse, AxiosError } from 'axios';

const getMyHouseholds = async (axios: any) => {
  const response = await axios.get('/api/household');
  return response;
};
const createTalous = async (axios: any, name: string): Promise<IResponse> => {
  try {
    const { status, data } = await axios.post('/api/household', {
      name,
    });

    return { status, data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};
const editTalousById = async (axios: any, menotId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};
const deleteTalousById = async (axios: any, talousId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};
const addUser = async (axios: any, talousId: number, userId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};
const deleteUser = async (axios: any, talousId: number, userId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};

export {
  getMyHouseholds,
  createTalous,
  editTalousById,
  deleteTalousById,
  addUser,
  deleteUser,
};

interface IResponse {
  status: number;
  data: any;
}
