import { Page } from "../comps/page.comp";
import styled from "styled-components";
import { useConfig } from "../hooks/use-config.hook";

const Wrapper = styled.div`
  width: 100%;
  max-width: 460px;
`;

const H1 = styled.h1`
  margin-bottom: 13px;
`;

const H3 = styled.h3`
  margin-bottom: 13px;
`;

const P = styled.p`
  margin-bottom: 13px;
`;

const Ul = styled.ul`
  margin-bottom: 13px;
`;

const Li = styled.li``;

const A = styled.a`
  color: var(--wow);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: bold;
`;

export function Root() {
  const [profile] = useConfig("Contract.Profile");
  const [connections] = useConfig("Contract.Connections");
  const [status] = useConfig("Contract.Status");
  const [env] = useConfig("env");

  return (
    <Page>
      <Wrapper>
        <H1>Haiku</H1>
        <H3>Small decentralized statuses....</H3>
        <P>
          Haiku is a decentralized application built on the{" "}
          <A href="https://onflow.org" target="_blank" rel="norefferer">
            Flow Blockchain
          </A>{" "}
          and hosted on{" "}
          <A href="https://ipfs.io" target="_blank" rel="norefferer">
            IPFS
          </A>
          .
        </P>
        <P>It currently ustilizes three contract.</P>
        <Ul>
          <Li>
            Profile Contract:{" "}
            <A
              href={`https://flow-view-source.com/${env}/account/${profile}`}
              target="_blank"
              rel="noreferrer"
            >
              {profile}
            </A>
          </Li>
          <Li>
            Connections Contract:{" "}
            <A
              href={`https://flow-view-source.com/${env}/account/${connections}`}
              target="_blank"
              rel="noreferrer"
            >
              {connections}
            </A>
          </Li>
          <Li>
            Status Contract:{" "}
            <A
              href={`https://flow-view-source.com/${env}/account/${status}`}
              target="_blank"
              rel="norefferrer"
            >
              {status}
            </A>
          </Li>
        </Ul>
        <P>
          You can find this projects source code on{" "}
          <A
            href="https://github.com/orodio/haiku"
            target="_blank"
            rel="norefferrer"
          >
            GitHub
          </A>
        </P>
      </Wrapper>
    </Page>
  );
}
