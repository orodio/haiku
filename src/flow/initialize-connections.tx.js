import * as fcl from "@onflow/fcl";
import { config } from "./util/config";
import { authz, tx } from "./util/tx";

export async function initializeAll(opts = {}) {
  return tx(opts, [
    fcl.transaction`
      import Connections from ${await config("Contract.Connections")}

      transaction {
        prepare(account: AuthAccount) {
          if (!Connections.hasConnections(account.address)) {
            let connections <- Connections.new() as! @Connections.Base
            account.save(<- connections, to: Connections.privatePath)
            account.link<&{Connections.Public}>(Connections.publicPath, target: Connections.privatePath)
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
