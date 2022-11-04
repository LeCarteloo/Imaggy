const baseUrl = 'http://localhost:3000';

const getPosts = async () => {
  const response = await fetch(`${baseUrl}/posts`);
  return response.json();
};

const getPost = async (postId: number) => {
  const response = await fetch(`${baseUrl}/posts/${postId}`);
  return response.json();
};

export { getPosts, getPost };
