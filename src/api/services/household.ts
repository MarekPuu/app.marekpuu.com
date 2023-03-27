const getMyHouseholds = async (axios: any) => {
  const response = await axios.get('/api/household');
  return response;
};

const createHousehold = async ({ axios, name }: ICT): Promise<IResponse> => {
  try {
    const { status, data } = await axios.post('/api/household', {
      name,
    });

    return { status, data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};

const deleteHousehold = async ({ axios, id }: IDH): Promise<IResponse> => {
  try {
    const { status, data } = await axios.delete(`/api/household/${id}`);
    return { status, data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};

export { getMyHouseholds, createHousehold, deleteHousehold };

interface IResponse {
  status: number;
  data: any;
}
interface ICT {
  axios: any;
  name: string;
}
interface IAUTH {
  axios: any;
  id: string;
  email: string;
}
interface IDH {
  axios: any;
  id: string;
}
