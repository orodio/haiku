import * as fcl from "@onflow/fcl";
import { config } from "./util/config";
import { authz, tx } from "./util/tx";

export async function initializeAll(opts = {}) {
  return tx(opts, [
    fcl.transaction`
      import Profile from ${await config("Contract.Profile")}

      transaction {
        prepare(account: AuthAccount) {
          if (!Profile.hasProfile(account.address)) {
            let profile <- Profile.new() as! @Profile.Base
            
            let address: String = account.address.toString()
            profile.setDisplayName(address)
            profile.color("#233445")
            profile.setAvatar("https://avatars.onflow.org/avatar/".concat(address).concat(".svg"))

            account.save(<- profile, to: Profile.privatePath)
            account.link<&{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
          }
        }
      }

    `,
    fcl.limit(100),
    fcl.proposer(authz),
    fcl.payer(authz),
    fcl.authorizations(authz),
  ]);
}
