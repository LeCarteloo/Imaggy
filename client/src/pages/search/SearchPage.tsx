import { Box, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { getPost } from '../../api/postsApi';
import { ImageSection, SearchInput } from '../../components';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ query: '' });
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const { data: searchResult } = useQuery({
    queryKey: ['search', searchParams.get('query')],
    queryFn: () => getPost(searchParams.get('query') as string),
  });

  console.log(searchParams.get('query'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Later add useMutation query with real API
    // console.log(searchTerm);
    setSearchParams(createSearchParams({ query: searchTerm }));
  };

  return (
    <Container sx={{ pt: { xs: 5, sm: 10 } }}>
      <Box
        component="form"
        sx={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={handleSubmit}
      >
        <SearchInput
          value={searchTerm}
          onChange={handleChange}
          onClear={handleClear}
        />
      </Box>
      <Typography
        component="h1"
        variant="h3"
        sx={{
          textTransform: 'capitalize',
          textAlign: 'center',
          mt: 2,
        }}
      >
        {searchParams.get('query')}
      </Typography>
      <Typography sx={{ mb: 5 }}>Found 2 posts and 2 users</Typography>
      {/* <ImageSection posts={searchResult} animated /> */}
    </Container>
  );
};

export default SearchPage;
