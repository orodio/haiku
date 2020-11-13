import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";

export function useConfig(key) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    fcl.config().get(key).then(setValue);
  }, []);

  return [value];
}
