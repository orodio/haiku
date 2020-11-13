import * as fcl from "@onflow/fcl";
import { config } from "./util/config";
import { authz, tx } from "./util/tx";

export async function initializeAll(opts = {}) {
  return tx(
    [
      fcl.transaction`
      import Status from ${await config("Contract.Status")}

      transaction {
        prepare(account: AuthAccount) {
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
      fcl.authorizations(authz),
    ],
    opts
  );
}
