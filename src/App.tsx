import { type Dispatch } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Game, useGame, type GameAction } from "./game";

export default function App() {
  const [game, dispatch] = useGame();
  const words = splitWords(game.cleartext);

  return (
    <div className="container  pt-4">
      <div className="row">
        <div
          className="col-12 col-md-8 col-lg-9"
          style={{ display: "flex", flexWrap: "wrap", gap: "3rem 2rem" }}
        >
          {words.map((word) => (
            <WordBlock
              key={word.indices.join(",")}
              game={game}
              word={word}
              dispatch={dispatch}
            />
          ))}
        </div>
        <div className="col">
          {game.message && (
            <div className={`alert alert-${game.message.type}`}>
              {game.message.message}
            </div>
          )}
          {game.done && <ConfettiExplosion />}
          <div className="progress" role="progressbar">
            <div
              className="progress-bar"
              style={{
                width:
                  (game.solvedCharacters.length /
                    (game.solvedCharacters.length +
                      game.unsolvedCharacters.length)) *
                    100 +
                  "%",
              }}
            />
          </div>
          <p>
            {game.solvedCharacters.length} von{" "}
            {game.solvedCharacters.length + game.unsolvedCharacters.length}{" "}
            Buchstaben entschlüsselt
          </p>
          <p>Fehlversuche: {game.misses}</p>
          <button
            className={`btn btn-${game.done ? "primary" : "outline-primary"}`}
            onClick={() => dispatch({ type: "start" })}
          >
            Neues Spiel
          </button>
        </div>
      </div>
    </div>
  );
}

type Word = {
  indices: Array<number>;
};

function splitWords(text: string) {
  let words: Array<Word> = [];
  let word: Word | undefined;

  for (let i = 0; i < text.length; i++) {
    const c = text.charAt(i);

    if (c === " ") {
      if (word) words.push(word);
      word = undefined;
      continue;
    }

    if (!word) word = { indices: [] };
    word.indices.push(i);
  }

  if (word) words.push(word);
  return words;
}

function WordBlock({
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

function Character({
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

function SolveInput({
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
