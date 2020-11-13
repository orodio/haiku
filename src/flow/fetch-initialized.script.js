import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { config } from "./util/config";
import { script } from "./util/script";

export async function fetchInitialized(address) {
  if (address == null) return Promise.resolve(null);

  return script({}, [
    fcl.script`
      import Profile from ${await config("Contract.Profile")}
      import Connections from ${await config("Contract.Connections")}
      import Status from ${await config("Contract.Status")}

      pub fun main(address: Address): {String: Bool} {
        var ret: {String: Bool} = {}
        ret["profile"] = Profile.hasProfile(address)
        ret["connections"] = Connections.hasConnections(address)
        ret["status"] = Status.hasStatus(address)
        return ret
      }
    `,
    fcl.args([fcl.arg(fcl.withPrefix(address), t.Address)]),
  ]);
}
