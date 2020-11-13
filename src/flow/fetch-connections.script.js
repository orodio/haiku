import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { config } from "./util/config";
import { script } from "./util/script";

export async function fetchConnections(address) {
  if (address == null) return Promise.resolve(null);

  return script({}, [
    fcl.script`
      import Connections from ${await config("Contract.Connections")}   

      pub fun main(address: Address): Connections.ReadOnly? {
        return Connections.fetchConnections(address)
      }
    `,
    fcl.args([fcl.arg(fcl.withPrefix(address), t.Address)]),
  ]);
}
