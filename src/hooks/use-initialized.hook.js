import { useState, useEffect } from "react";
import { fetchInitialized } from "../flow/fetch-initialized.script";

export function useInitialized(address) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (address == null) {
      setValue(null);
    }
    fetchInitialized(address).then(setValue);
  }, [address]);

  return [value];
}
