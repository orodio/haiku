import * as fcl from "@onflow/fcl";

function noop() {}

export const authz = fcl.currentUser().authorization;

export async function tx(opts = {}, wat = []) {
  const onStart = opts.onStart || noop;
  const onUpdate = opts.onUpdate || noop;
  const onSubmitted = opts.onSubmitted || noop;
  const onSuccess = opts.onSuccess || noop;
  const onError = opts.onError || noop;

  try {
    onStart();
    const resp = await fcl.send(wat);
    onSubmitted(resp);
    const unsub = fcl.tx(resp).subscribe(onUpdate);
    const result = await fcl.tx(resp).onceExecuted();
    unsub();
    onSuccess(result);
    return result;
  } catch (error) {
    console.error("TX ERROR", error);
    onError(error);
    throw error;
  }
}
