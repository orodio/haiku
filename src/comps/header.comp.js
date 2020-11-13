import * as fcl from "@onflow/fcl";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/use-current-user.hook";
import { useProfile } from "../hooks/use-profile.hook";

const Root = styled.div`
  position: fixed;
  top: 8px;
  left: 16px;
  display: flex;
  background: var(--bg);
`;

const tab = css`
  font-weight: bold;
  line-height: 34px;
  padding: 0 21px;
  cursor: pointer;
  border-radius: 0 0 3px 3px;
  margin-right: 3px;

  &:hover,
  &:focus {
    color: var(--bg);
    background: var(--wow);
  }
`;

const A = styled(Link)`
  ${tab}
  color: var(--bg);
  background: var(--fg);
`;

const Button = styled.button`
  ${tab}
  color: var(--fg);
  background: var(--bg);
`;

const RawrButton = styled.button`
  ${tab}
  color: var(--bg);
  background: var(--fg);
`;

const Img = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: -200px;
  background: var(--fg);
  border-radius: 50px;
  border: 5px solid var(--fg);
  display: block;
`;

function displayName(user, profile) {
  if (profile == null) return fcl.display(user.addr);
  return profile.displayName;
}

function Authenticated() {
  const [user] = useCurrentUser();
  const [profile] = useProfile(user.addr);

  return (
    <Root>
      {(profile || {}).avatar && (
        <Link to={`/${fcl.display(user.addr)}`}>
          <Img src={profile.avatar} />
        </Link>
      )}
      <A to={`/${fcl.display(user.addr)}`}>{displayName(user, profile)}</A>
      <Button onClick={fcl.unauthenticate}>Log Out</Button>
    </Root>
  );
}

function Unauthenticated() {
  return (
    <Root>
      <RawrButton onClick={fcl.authenticate}>Log In</RawrButton>
      <Button onClick={fcl.authenticate}>Sign Up</Button>
    </Root>
  );
}

export function Header() {
  const [_, loggedIn] = useCurrentUser();

  return loggedIn ? <Authenticated /> : <Unauthenticated />;
}
