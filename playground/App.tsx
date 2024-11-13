import type {
  EditorProps,
  Monaco,
  OnChange,
  OnMount,
} from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import { Button, ToggleButton } from "@mui/material";
import type { IRecognitionException } from "chevrotain";
import type { editor } from "monaco-editor";
import React, { Suspense, useRef, useState } from "react";

import Errors from "./components/Errors";
import ValueTable from "./components/ValueTable";
import { useEditorRef } from "./hooks/useEditorRef";
import { useEditorTheme } from "./hooks/useEditorTheme";
import { useMacroInterpreter } from "./hooks/useMacroInterpreter";
import { useToggle } from "./hooks/useToggle";
import { exampleCode } from "./lib/example";
import type { StandaloneEditor } from "./lib/FanucMacroB";
import { MacroInterpreter } from "./lib/FanucMacroB";
import { registerMonacoResources } from "./lib/monaco";

const interpreter = new MacroInterpreter();

export function App() {
  const interpreter = useMacroInterpreter();
  const [macros, setMacros] = useState<[number, number][]>([]);
  const [errors, setErrors] = useState<IRecognitionException[]>([]);

  const {
    monacoRef,
    editorRef,
    editorTheme,
    editorOptions,
    toggleEditorTheme,
  } = useEditorRef({
    theme: "gcode-dark",
    automaticLayout: true,
    minimap: { enabled: false },
  });

  const [checked, toggleChecked] = useToggle(false);
  const [autoRun, toggleAutoRun] = useToggle(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const parseGCode = code => {
    const result = interpreter.eval(code);
    console.log(result);
    const macroValues = Array.from(interpreter.getMacros());

    setErrors(interpreter.getParser().errors);
    setMacros(macroValues);
  };

  const handleEditorChange: OnChange = value => {
    parseGCode(value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    parseGCode(exampleCode);
  };

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(register => {
    interpreter.watchMacroVar(register, update => {
      console.log("macro variable updated!", update);
    });
  });

  return (
    <div className="flex flex-col overflow-y-hidden h-full bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 border-b border-b-purple-600 bg-violet-900">
        <div className="grow">
          <h1 className="py-2 pl-4 text-3xl chakra-petch-regular">
            Fanuc Macro B Playground
          </h1>
        </div>
        {/* <div className="flex flex-row">
          <p className="my-auto mr-2">Editor Theme</p>
          <label className="switch relative inline-block w-14 h-8 mr-4 mt-2">
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <span className="slider cursor-pointer inset-0 absolute round rounded-full"></span>
          </label>
        </div> */}
      </div>
      <div className="flex flex-row h-full">
        <div className="flex flex-col w-1/2 border-r border-r-purple-600">
          <div className="flex flex-row justify-between">
            <p
              className="px-6 py-3 text-sm italic border-b border-b-gray-900 text-violet-100"
              style={{ backgroundColor: "#1E1E1E" }}
            >
              {`\u00BB`} Try editing some of the values!
            </p>
            <Button
              onClick={() => {
                console.log("runnnnnnnnnnnnnnnnnnnnnnn");
              }}
            >
              run
            </Button>
            <ToggleButton
              value={false}
              onClick={() => {
                console.log("runnnnnnnnnnnnnnnnnnnnnnn");
              }}
            >
              auto run
            </ToggleButton>
          </div>
          <Suspense fallback={<EditorError />}>
            <Editor
              theme={editorTheme}
              defaultLanguage="gcode"
              options={editorOptions}
              defaultValue={exampleCode}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              beforeMount={registerMonacoResources}
            />
          </Suspense>
        </div>
        <div className="flex flex-col flex-grow bg-neutral-900">
          <span className="px-2 py-3 text-xl chakra-petch-regular shadow-neutral-800 bg-neutral-800 text-violet-500">
            Macro Registers
          </span>
          <div className="flex flex-col flex-grow gap-1 pt-2 px-4">
            <ValueTable macros={macros} />
          </div>
          <div className="px-4 py-2 bg-neutral-800">
            {errors.length > 0 ? <Errors errors={errors} /> : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorError() {
  return (
    <h1 className="chakra-petch-bold">There was an error loading the editor</h1>
  );
}
