import { type Dispatch } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { type Game, type GameAction } from "./game";

export default function Info({
  game,
  dispatch,
}: {
  game: Game;
  dispatch: Dispatch<GameAction>;
}) {
  return (
    <>
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
    </>
  );
}
