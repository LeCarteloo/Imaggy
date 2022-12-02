import axios from './axios';

const getPosts = async () => {
  const response = await axios.get('/posts');
  return response.data;
};

const getPost = async (postId: string | undefined) => {
  const response = await axios.get(`/posts/${postId}`);
  return response.data;
};

export { getPosts, getPost };
