import styled from 'styled-components';
import SearchBox from './SearchBox';
import GroupButton from './GroupButton';
import { useContext } from 'react';
import { SettingsContext } from './Settings';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Header = () => {
  const { activeToggle } = useContext(SettingsContext);
  return (
    <StyledHeader>
      <img width="150px" src={"/images/kn-logo-full.png"} />
      {activeToggle[1] === true && <SearchBox />}
      {activeToggle[2] === true && <GroupButton />}
    </StyledHeader>
  );
}

export default Header