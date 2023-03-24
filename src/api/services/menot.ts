const getMenot = async (axios: any, talousId: number) => {
  const response = await axios.get('/WeatherForecast');
  // console.log(response);
  return response;
};
const PostMenot = async (axios: any, talousId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};
const PutMenotById = async (axios: any, menotId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};
const DeleteMenotById = async (axios: any, menotId: number) => {
  const response = await axios.get('/WeatherForecast');
  return response;
};

export { getMenot, PostMenot, PutMenotById, DeleteMenotById };
