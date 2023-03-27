const AddUser = async ({ axios, email, id }: IAUTH): Promise<IResponse> => {
  try {
    const response = await axios.post(`/api/household/${id}/users`, {
      email,
    });
    return response;
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};

const DeleteUser = async ({
  axios,
  userId,
  householdId,
}: IDUGH): Promise<IResponse> => {
  try {
    const response = await axios.delete(
      `/api/household/${householdId}/users/${userId}`
    );
    return response;
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};

const UpdateUserRole = async ({
  axios,
  userId,
  householdId,
  roleId,
}: IUUR): Promise<IResponse> => {
  try {
    const response = await axios.patch(`/api/household/${householdId}/users`, {
      userId,
      roleId,
    });
    return response;
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};

const getHouseholdUsers = async (axios: any, id: string) => {
  const response = await axios.get(`/api/household/${id}/users`);
  return response;
};

export { AddUser, DeleteUser, UpdateUserRole, getHouseholdUsers };

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
interface IDUGH {
  axios: any;
  userId: string;
  householdId: string;
}
interface IUUR {
  axios: any;
  userId: string;
  householdId: string;
  roleId: number;
}
