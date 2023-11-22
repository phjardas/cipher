export type Word = {
  indices: Array<number>;
};

export function splitWords(text: string) {
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
