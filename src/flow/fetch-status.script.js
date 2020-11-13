import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { config } from "./util/config";
import { script } from "./util/script";

export async function fetchStatus(address) {
  if (address == null) return Promise.resolve(null);

  return script({}, [
    fcl.script`
      import Status from ${await config("Contract.Status")}   

      pub fun main(address: Address): Status.ReadOnly? {
        return Status.fetchStatus(address)
      }
    `,
    fcl.args([fcl.arg(fcl.withPrefix(address), t.Address)]),
  ]);
}
