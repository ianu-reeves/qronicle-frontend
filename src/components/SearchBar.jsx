import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 5,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: 10,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function SearchBar() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handlePressEnter = (e) => {
    if (value.trim() !== '') {
      // TODO: Navigate to search page with value param
      navigate(`/items/search?term=${value.trim()}`);
      setValue('');
      e.target.blur();
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search items"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handlePressEnter(e);
          }
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Search>
  );
}