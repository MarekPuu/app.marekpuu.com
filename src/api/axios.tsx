import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
  timeout: 10000,
});

const useAxios = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      async (config) => {
        const accessToken = await getAccessTokenSilently();
        if (!config.headers['Authorization'] && accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await getAccessTokenSilently();
          if (!!!newAccessToken) return Promise.reject(error);
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return instance;
};

export { useAxios };
