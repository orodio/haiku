import { Page } from "../comps/page.comp";
import { useParams } from "react-router-dom";
import * as fcl from "@onflow/fcl";

export function Profile() {
  const { address } = useParams();
  return (
    <Page title={fcl.display(address)}>Profile: {fcl.display(address)}</Page>
  );
}
