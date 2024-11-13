import { useState } from "react";

import type { GCodeTheme } from "../../src";

export function useEditorTheme(theme: GCodeTheme = "gcode-dark") {
  const [editorTheme, setEditorTheme] = useState<GCodeTheme>(theme);

  return {
    editorTheme,
    toggleEditorTheme() {
      setEditorTheme(old => (old === "gcode-dark" ? "gcode-light" : old));
    },
  } as const;
}
