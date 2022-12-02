import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { SearchInput } from '../../components';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ query: '' });
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  console.log(searchParams.get('query'));

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
        {searchTerm}
      </Typography>
      <Typography>Found 2 posts and 2 users</Typography>
      <hr />
    </Container>
  );
};

export default SearchPage;
