import { type Dispatch } from "react";
import { type GameAction } from "./game";

export function SolveInput({
  index,
  dispatch,
}: {
  index: number;
  dispatch: Dispatch<GameAction>;
}) {
  return (
    <input
      size={1}
      maxLength={1}
      onChange={(e) => {
        const character = e.target.value;
        if (character.length) {
          dispatch({
            type: "solve-character",
            index,
            character: e.target.value,
          });
        }
        e.target.value = "";
      }}
      className="form-control form-control-sm"
    />
  );
}
