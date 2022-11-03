const baseUrl = 'http://localhost:3000';

const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  return response.json();
};

const getUser = async (id: number) => {
  const response = await fetch(`${baseUrl}/users/${id}`);
  return response.json();
};

export { getUsers, getUser };
