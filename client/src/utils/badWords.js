export const BAD_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "nigger",
  "asshole",
  "bastard",
  "slut",
  "cunt",
  "dick",
  "ugly",
  "ass"
];

export function containsBadWords(text) {
  const words = text.toLowerCase();

  return BAD_WORDS.some((badWord) =>
    words.includes(badWord.toLowerCase())
  );
}