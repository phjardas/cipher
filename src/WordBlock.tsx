import { type Dispatch } from "react";
import { Character } from "./Character";
import { type Game, type GameAction } from "./game";
import { type Word } from "./words";

export function WordBlock({
  word,
  game,
  dispatch,
}: {
  word: Word;
  game: Game;
  dispatch: Dispatch<GameAction>;
}) {
  return (
    <div style={{ display: "flex", gap: ".1rem" }}>
      {word.indices.map((index) => {
        const clearChar = game.cleartext.charAt(index);
        const clearCharLower = clearChar.toLowerCase();

        return (
          <Character
            key={index}
            index={index}
            cleartext={clearChar}
            ciphertext={game.ciphertext.charAt(index)}
            solvable={game.cipher.characters.includes(clearCharLower)}
            solved={game.solvedCharacters.includes(clearCharLower)}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
}
