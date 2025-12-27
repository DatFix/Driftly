// utils/generateNickname.ts
export function generateNickname(): string {
  const characters = "01234567899876543210";
  let randomPart = "";

  for (let i = 0; i < 15; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `user${randomPart}`;
}
