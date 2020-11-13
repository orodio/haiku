import { useState, useEffect } from "react";
import { fetchProfile } from "../flow/fetch-profile.script";

export function useProfile(address) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetchProfile(address).then(setProfile);
  }, [address]);

  return [profile];
}
