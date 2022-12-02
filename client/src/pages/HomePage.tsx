import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/postsApi';
import { ImageSection, SectionHeader } from '../components';

const HomePage = () => {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });

  return (
    <>
      <SectionHeader />
      <Container>
        <ImageSection posts={posts} />
      </Container>
    </>
  );
};

export default HomePage;
