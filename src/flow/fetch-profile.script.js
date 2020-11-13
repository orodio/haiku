import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { config } from "./util/config";
import { script } from "./util/script";

export async function fetchProfile(address) {
  if (address == null) return Promise.resolve(null);

  return script({}, [
    fcl.script`
      import Profile from ${await config("Contract.Profile")}   

      pub fun main(address: Address): Profile.ReadOnly? {
        return Profile.fetchProfile(address)
      }
    `,
    fcl.args([fcl.arg(fcl.withPrefix(address), t.Address)]),
  ]);
}
