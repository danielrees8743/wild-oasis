import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2.4rem 4.8rem;
  border-bottom: 0.1rem solid var(--color-grey-100);

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
