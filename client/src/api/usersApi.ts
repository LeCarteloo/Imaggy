const baseUrl = 'http://localhost:3000';

const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  return response.json();
};

const getUser = async (username: string | undefined) => {
  const response = await fetch(`${baseUrl}/users/?username=${username}`);
  return response.json();
};

export { getUsers, getUser };
