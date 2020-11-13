import * as fcl from "@onflow/fcl";

export function script(opts = {}, wat = []) {
  return fcl.send(wat).then(fcl.decode);
}
