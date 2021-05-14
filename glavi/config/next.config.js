
const production = process.env.NODE_ENV === "production";

export const url = production
  ? "https://www.inmobiliariaglavicom"
  : "http://localhost:1337";


