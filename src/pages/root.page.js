import { Page } from "../comps/page.comp";
import { Section, H1, H3, P, Ul, Li, A } from "../style/text.comp";
import { useConfig } from "../hooks/use-config.hook";

export function Root() {
  const [profile] = useConfig("Contract.Profile");
  const [connections] = useConfig("Contract.Connections");
  const [status] = useConfig("Contract.Status");
  const [env] = useConfig("env");

  return (
    <Page>
      <Section>
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
        <P>It currently ustilizes three contracts.</P>
        <Ul>
          <Li>
            <A
              href={`https://flow-view-source.com/${env}/account/${profile}`}
              target="_blank"
              rel="noreferrer"
            >
              {profile} (Profile)
            </A>
          </Li>
          <Li>
            <A
              href={`https://flow-view-source.com/${env}/account/${connections}`}
              target="_blank"
              rel="noreferrer"
            >
              {connections} (Connections)
            </A>
          </Li>
          <Li>
            <A
              href={`https://flow-view-source.com/${env}/account/${status}`}
              target="_blank"
              rel="norefferrer"
            >
              {status} (Status)
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
      </Section>
    </Page>
  );
}
