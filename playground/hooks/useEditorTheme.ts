import { useState } from "react";

type Theme = "gcode-dark" | "gcode-light";

export function useEditorTheme(theme: Theme = "gcode-dark") {
  const [editorTheme, setEditorTheme] = useState<Theme>(theme);

  return {
    editorTheme,
    toggleEditorTheme() {
      setEditorTheme(old => (old === "gcode-dark" ? "gcode-light" : old));
    },
  } as const;
}
