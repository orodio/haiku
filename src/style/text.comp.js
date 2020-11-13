import styled from "styled-components";

export const Section = styled.div`
  width: 100%;
  max-width: 460px;
`;

export const Wow = styled.div`
  width: 100%;
  max-width: 460px;
  box-sizing: border-box;
  border: 5px solid var(--wow);
  padding: 21px;
  border-radius: 8px;
  margin-bottom: 13px;
`;

export const H1 = styled.h1`
  margin-bottom: 13px;
`;

export const H3 = styled.h3`
  margin-bottom: 13px;
`;

export const P = styled.p`
  margin-bottom: 13px;
`;

export const Ul = styled.ul`
  margin-bottom: 13px;
  padding-left: 21px;
`;

export const Li = styled.li`
  margin-bottom: 5px;
`;

export const A = styled.a`
  color: var(--wow);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: bold;
`;

export const Button = styled.button`
  background: ${(p) => (p.disabled ? "rgba(0,0,0,0.1)" : "var(--fg)")};
  color: ${(p) => (p.disabled ? "var(--fg)" : "var(--bg)")};
  font-size: 13px;
  font-weight: bold;
  line-height: 34px;
  padding: 0 21px;
  border-radius: 3px;
  letter-spacing: 0.1em;
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};

  &:hover,
  &:focus {
    background: ${(p) => (p.disabled ? "rgba(0,0,0,0.1)" : "var(--wow)")};
  }
`;
