import { useState } from "react";

export function useToggle(init: boolean) {
  const [val, set] = useState<boolean>(init);
  const toggler = () => set(old => !old);
  return [val, toggler];
}
