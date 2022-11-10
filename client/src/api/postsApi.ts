const baseUrl = 'http://localhost:3000';

const getPosts = async () => {
  const response = await fetch(`${baseUrl}/posts`);
  return response.json();
};

const getPost = async (postId: string | undefined) => {
  const response = await fetch(`${baseUrl}/posts/${postId}`);
  return response.json();
};

export { getPosts, getPost };
