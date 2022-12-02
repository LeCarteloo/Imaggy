import { Close, SearchOutlined } from '@mui/icons-material';
import {
  InputAdornment,
  Box,
  TextField,
  styled,
  IconButton,
} from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const SearchInput = ({ value, onChange, onClear }: SearchInputProps) => {
  return (
    <Box width="100%" maxWidth="600px">
      <StyledTextField
        value={value}
        onChange={onChange}
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment:
            onClear && value !== '' ? (
              <InputAdornment position="end">
                <IconButton onClick={onClear}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        role="search"
        fullWidth
      />
    </Box>
  );
};

export default SearchInput;
