import React from "react";

import { zeroPad } from "../lib";

export default function ValueTable({ macros }) {
  return (
    <>
      <div className="flex flex-row chakra-petch-regular">
        <div className="w-12 text-violet-400">NO.</div>
        <div className="pl-1 text-violet-400">DATA</div>
      </div>

      {macros.map(macro => {
        return (
          !isNaN(macro[1]) && (
            <div key={macro[0]} className="flex flex-row gap-2 font-mono">
              <div className="w-10 text-violet-100">
                #{zeroPad(macro[0], 3)}
              </div>
              <div className="flex-grow pl-1 bg-gray-300">{macro[1]}</div>
            </div>
          )
        );
      })}
    </>
  );
}
