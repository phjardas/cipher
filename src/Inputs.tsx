import { type Dispatch } from "react";
import { WordBlock } from "./WordBlock";
import { type Game, type GameAction } from "./game";
import { splitWords } from "./words";

export default function Inputs({
  game,
  dispatch,
}: {
  game: Game;
  dispatch: Dispatch<GameAction>;
}) {
  const words = splitWords(game.cleartext);

  return (
    <div className="d-flex flex-wrap column-gap-4 row-gap-3 row-gap-md-5">
      {words.map((word) => (
        <WordBlock
          key={word.indices.join(",")}
          game={game}
          word={word}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
