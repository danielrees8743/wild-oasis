import styled from 'styled-components';

import Logo from './Logo';
import MainNav from './MainNav';

// import Uploader from '../data/Uploader';

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 0.1rem solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function SideBar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledAside>
  );
}
