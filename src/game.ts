import { useReducer, type Reducer } from "react";
import { createRandomCipher, type Cipher } from "./cipher";
import { getRandomCleartext } from "./cleartext";

export type Message = {
  type: "info" | "success" | "danger";
  message: string;
};

export type Game = {
  cleartext: string;
  ciphertext: string;
  cipher: Cipher;
  solvedCharacters: string[];
  unsolvedCharacters: string[];
  misses: number;
  done: boolean;
  message?: Message;
};

export type StartAction = { type: "start" };

export type SolveCharacterAction = {
  type: "solve-character";
  index: number;
  character: string;
};

export type GameAction = StartAction | SolveCharacterAction;

const reducer: Reducer<Game, GameAction> = (state, action) => {
  switch (action.type) {
    case "start":
      return startGame();

    case "solve-character": {
      const character = action.character.toLowerCase();
      if (state.solvedCharacters.includes(character)) {
        return {
          ...state,
          message: {
            type: "info",
            message: "Diesen Buchstaben hast du bereits entschlüsselt.",
          },
        };
      }

      const actualCharacter = state.cleartext[action.index].toLowerCase();

      if (actualCharacter === character) {
        const unsolvedCharacters = state.unsolvedCharacters.filter(
          (c) => c !== character
        );
        const done = unsolvedCharacters.length === 0;

        return {
          ...state,
          solvedCharacters: [...state.solvedCharacters, character],
          unsolvedCharacters,
          done,
          message: done
            ? { type: "success", message: "Du hast es geschafft!" }
            : undefined,
        };
      }

      return {
        ...state,
        misses: state.misses + 1,
        message: {
          type: "danger",
          message: "Dieser Buchstabe stimmt leider nicht.",
        },
      };
    }

    default: {
      return {
        ...state,
        message: {
          type: "danger",
          message: `Unhandled action type: ${(action as any).type}`,
        },
      };
    }
  }
};

export function useGame() {
  return useReducer(reducer, startGame());
}

function startGame(): Game {
  const cleartext = getRandomCleartext();
  const cipher = createRandomCipher();
  const ciphertext = cipher.encrypt(cleartext);
  const unsolvedCharacters = cleartext
    .split("")
    .map((s) => s.toLowerCase())
    .filter((s) => cipher.characters.includes(s))
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    cleartext,
    ciphertext,
    cipher,
    solvedCharacters: [],
    unsolvedCharacters,
    done: false,
    misses: 0,
  };
}
