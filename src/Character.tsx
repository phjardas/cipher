import { type Dispatch } from "react";
import { SolveInput } from "./SolveInput";
import { type GameAction } from "./game";

export function Character({
  cleartext,
  ciphertext,
  index,
  solvable,
  solved,
  dispatch,
}: {
  cleartext: string;
  ciphertext: string;
  index: number;
  solvable: boolean;
  solved: boolean;
  dispatch: Dispatch<GameAction>;
}) {
  return (
    <div
      className="font-monospace"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".5rem",
        width: "2rem",
      }}
    >
      <div>{solvable ? ciphertext : cleartext}</div>
      <div className="text-primary">
        {solvable ? (
          solved ? (
            cleartext
          ) : (
            <SolveInput index={index} dispatch={dispatch} />
          )
        ) : (
          cleartext
        )}
      </div>
    </div>
  );
}
