import * as fcl from "@onflow/fcl";
import { config } from "./util/config";
import { authz, tx } from "./util/tx";

export async function initializeAll(opts = {}) {
  return tx(opts, [
    fcl.transaction`
      import Profile from ${await config("Contract.Profile")}
      import Connections from ${await config("Contract.Connections")}
      import Status from ${await config("Contract.Status")}

      transaction {
        prepare(account: AuthAccount) {
          if (!Profile.hasProfile(account.address)) {
            let profile <- Profile.new() as! @Profile.Base

            let address: String = account.address.toString()
            profile.setDisplayName(address)
            profile.setColor("#233445")
            profile.setAvatar("https://avatars.onflow.org/avatar/".concat(address).concat(".svg"))

            account.save(<- profile, to: Profile.privatePath)
            account.link<&{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
          }

          if (!Connections.hasConnections(account.address)) {
            let connections <- Connections.new() as! @Connections.Base
            account.save(<- connections, to: Connections.privatePath)
            account.link<&{Connections.Public}>(Connections.publicPath, target: Connections.privatePath)
          }

          if (!Status.hasStatus(account.address)) {
            let status <- Status.new() as! @Status.Base
            account.save(<- status, to: Status.privatePath)
            account.link<&{Status.Public}>(Status.publicPath, target: Status.privatePath)
          }
        }
      }

    `,
    fcl.limit(100),
    fcl.proposer(authz),
    fcl.payer(authz),
    fcl.authorizations([authz]),
  ]);
}
