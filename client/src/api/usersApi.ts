import axios from './axios';

const getUsers = async () => {
  const response = await axios.get(`/users`);
  return response.data;
};

const getUser = async (username: string | undefined) => {
  const response = await axios.get(`/users/?username=${username}`);
  return response.data;
};

export { getUsers, getUser };
