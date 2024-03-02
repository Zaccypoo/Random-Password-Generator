import dotenv from "dotenv";

dotenv.config();

// don't expose api keys or other private variables to the client, keep it in a .env file
const apiKey = process.env.RANDOM_ORG_API_KEY;

export function getRequestBody(passwordLength, characters) {
  return {
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
      apiKey,
      n: passwordLength,
      min: 0,
      max: characters.length - 1,
      replacement: true,
    },
    id: 1,
  };
}
