import { ChangeEvent } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from 'styled-components';

const StyledSearchContainer= styled.div`
    width: 26rem;
    height: 5rem;
    border: 1px solid var(--color-grey-200);
    display: flex;
    align-items: center;
`
const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  color: var(--color-grey-400);
  &:focus {
    outline: none;
  }
`;
const StyledSearchIcon = styled(HiMagnifyingGlass)`
    margin-left: -2rem;
`;

const SearchBox = () => {

  const [searchText, setSearchText] = useSearchParams()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    searchText.set('searchText', e.target.value)
    setSearchText(searchText)
  }

  return (
    <StyledSearchContainer>
      <StyledInput placeholder="Search..." onChange={handleChange} />
      <StyledSearchIcon />
    </StyledSearchContainer>
  );
}

export default SearchBox