import type { OnChange, OnMount } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import { Button, ToggleButton } from "@mui/material";
import type { IRecognitionException } from "chevrotain";
import React, { Suspense, useState } from "react";

import { registerMonacoResources } from "../src";
import Errors from "./components/Errors";
import Footer from "./components/Footer";
import ValueTable from "./components/ValueTable";
import {
  type UseEditorRefHookOptions,
  useEditorRef,
} from "./hooks/useEditorRef";
import { useMacroInterpreter } from "./hooks/useMacroInterpreter";
import { useToggle } from "./hooks/useToggle";
import { exampleCode } from "./lib/example";

const MONACO_INIT_OPTIONS: UseEditorRefHookOptions = {
  theme: "gcode-dark",
  automaticLayout: true,
  minimap: { enabled: false },
};

export function App() {
  const interpreter = useMacroInterpreter();
  const [macros, setMacros] = useState<[number, number][]>([]);
  const [errors, setErrors] = useState<IRecognitionException[]>([]);

  const {
    refs,
    editorTheme,
    editorOptions,
    // toggleEditorTheme,
  } = useEditorRef(MONACO_INIT_OPTIONS);

  const [checked, toggleChecked] = useToggle(false);
  const [autoRun, toggleAutoRun] = useToggle(false);

  // const handleChange = () => {
  //   setChecked(!checked);
  // };

  const editorValueChanged: OnChange = value => {
    interpreter.eval(`${value}`);
    console.log(interpreter.getMacroArray());
    setErrors(interpreter.getParser().errors);
    setMacros(interpreter.getMacroArray());
  };

  const onEditorMount: OnMount = (editor, monaco) => {
    refs.editor.current = editor;
    refs.monaco.current = monaco;
    interpreter.eval(exampleCode);
  };

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(register => {
    interpreter.watchMacroVar(register, update => {
      console.log("macro variable updated!", update);
    });
  });

  return (
    <div className="flex flex-col overflow-y-hidden h-screen bg-neutral-800">
      <header className="flex flex-row font-bold text-purple-200 border-b border-b-purple-600 bg-violet-900">
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
      </header>
      <main className="flex flex-row flex-grow">
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
              options={editorOptions}
              defaultLanguage="gcode"
              defaultValue={exampleCode}
              beforeMount={registerMonacoResources}
              onMount={onEditorMount}
              onChange={editorValueChanged}
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
      </main>
      <Footer
        lhs={[
          {
            label: "Tacos!",
            onClick: () => {
              console.log("tacos");
            },
          },
        ]}
        rhs={[
          {
            label: "Eat",
            onClick: () => {
              console.log("eat them");
            },
          },
        ]}
      />
    </div>
  );
}

function EditorError() {
  return (
    <h1 className="chakra-petch-bold">There was an error loading the editor</h1>
  );
}
