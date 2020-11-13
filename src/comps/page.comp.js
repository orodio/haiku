import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Footer } from "./footer.comp";
import { Header } from "./header.comp";

const Root = styled.div`
  border: 8px solid var(--fg);
  padding: 55px 89px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`;

const calcTitle = (title) => ["∆ Haiku", title].filter(Boolean).join(" - ");

export function Page({ children, title }) {
  return (
    <>
      <Helmet>
        <title>{calcTitle(title)}</title>
      </Helmet>
      <Root>{children}</Root>
      <Header />
      <Footer />
    </>
  );
}
