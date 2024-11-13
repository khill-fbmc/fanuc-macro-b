import type { EditorProps, Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useRef, useState } from "react";

import { type GCodeTheme, useEditorTheme } from "./useEditorTheme";

export type UseEditorRefHookOptions = Partial<
  EditorProps["options"] & {
    theme: GCodeTheme;
  }
>;

export function useEditorRef(options: UseEditorRefHookOptions) {
  const { theme, ...initEditorOptions } = options;

  const monacoRef = useRef<Monaco>();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const { editorTheme, toggleEditorTheme } = useEditorTheme(
    theme ?? "gcode-dark"
  );

  const [editorOptions, setEditorOptions] =
    useState<EditorProps["options"]>(initEditorOptions);

  return {
    refs: {
      editor: editorRef,
      monaco: monacoRef,
    },
    editorTheme,
    editorOptions,
    setEditorOptions,
    toggleEditorTheme,
  };
}
