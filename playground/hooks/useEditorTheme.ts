import { useState } from "react";

export type GCodeTheme = "gcode-dark" | "gcode-light";

export function useEditorTheme(theme: GCodeTheme = "gcode-dark") {
  const [editorTheme, setEditorTheme] = useState<GCodeTheme>(theme);

  return {
    editorTheme,
    toggleEditorTheme() {
      setEditorTheme(old => (old === "gcode-dark" ? "gcode-light" : old));
    },
  } as const;
}
