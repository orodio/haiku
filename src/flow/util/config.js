import * as fcl from "@onflow/fcl";

export function config(key) {
  return fcl.config().get(key);
}
