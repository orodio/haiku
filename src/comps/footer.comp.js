import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user.hook";

const Root = styled.div`
  position: fixed;
  bottom: 8px;
  left: 8px;
  display: flex;
  padding: 0 21px;
  background: var(--bg);
`;

const A = styled(NavLink)`
  font-weight: bold;
  line-height: 34px;
  padding: 0 21px;
  cursor: pointer;
  color: var(--fg);
  border-radius: 3px 3px 0 0;

  & + & {
    margin-left: 3px;
  }

  &.active {
    background: var(--fg);
    color: var(--bg);
  }

  &:hover,
  &:focus {
    color: var(--bg);
    background: var(--wow);
  }
`;

export function Footer() {
  const [_, loggedIn] = useCurrentUser();

  return (
    <Root>
      <A exact to="/">
        Haiku
      </A>
      {loggedIn && (
        <A exact to="/settings">
          Settings
        </A>
      )}
    </Root>
  );
}
