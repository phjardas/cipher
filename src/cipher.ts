export type Cipher = {
  characters: string[];
  encrypt(cleartext: string): string;
};

const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "ä",
  "ö",
  "ü",
  "ß",
];

export function createRandomCipher(): Cipher {
  const table = createTable(characters);

  return {
    characters,
    encrypt: (cleartext) => {
      const length = cleartext.length;
      const ciphertext: Array<string> = [];

      for (let i = 0; i < length; i++) {
        const c = cleartext.charAt(i);
        const cipher = table[toLowerCase(c)];

        if (cipher !== undefined) {
          const upper = toUpperCase(c) === c;
          ciphertext.push(upper ? toUpperCase(cipher) : cipher);
        } else {
          ciphertext.push(c);
        }
      }

      return ciphertext.join("");
    },
  };
}

function toUpperCase(s: string): string {
  return s === "ß" ? "ẞ" : s.toUpperCase();
}

function toLowerCase(s: string): string {
  return s === "ẞ" ? "ß" : s.toLowerCase();
}

function createTable(characters: Array<string>): Record<string, string> {
  const remaining = [...characters];
  const table: Record<string, string> = {};

  for (let i = 0; i < characters.length; i++) {
    const index = Math.floor(Math.random() * remaining.length);
    const cipher = remaining[index];
    remaining.splice(index, 1);
    table[characters[i]] = cipher;
  }

  return table;
}
