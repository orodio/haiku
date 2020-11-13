import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export async function fetchProfile(address) {
  if (address == null) return Promise.resolve(null);

  return fcl
    .send([
      fcl.script`
      import Profile from ${await fcl.config().get("Contract.Profile")}   

      pub fun main(address: Address): Profile.ReadOnly? {
        return Profile.fetchProfile(address)
      }
    `,
      fcl.args([fcl.arg(fcl.withPrefix(address), t.Address)]),
    ])
    .then(fcl.decode);
}
