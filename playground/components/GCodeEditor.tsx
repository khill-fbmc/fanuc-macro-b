import type {
  BeforeMount,
  EditorProps,
  OnChange,
  OnMount,
} from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import type { useRef } from "react";
import React from "react";

type Props = {
  defaultValue: string;
  options: EditorProps["options"];
  theme: "gcode-light" | "gcode-dark" | string;
  ref: ReturnType<typeof useRef<editor.IStandaloneCodeEditor>>;
  onMount: OnMount;
  onChange: OnChange;
  beforeMount: BeforeMount;
};

export default function GCodeEditor({
  ref,
  options,
  defaultValue,
  onChange,
  onMount,
  beforeMount,
}: Props) {
  return (
    <Editor
      height="100%"
      theme={"gcode-dark"}
      defaultLanguage="gcode"
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      onMount={(editor, monaco) => {
        ref.current = editor;
        typeof onMount === "function" && onMount(ref.current, monaco);
      }}
      beforeMount={monaco => {
        typeof beforeMount === "function" && beforeMount(monaco);
      }}
    />
  );
}
