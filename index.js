import { characters } from "./utils/constants";
import { getRequestBody } from "./utils/getRequestBody";

/**
 * Changes:
 * - Moved characters array to utils/constants.js
 * - Created a function that returns the request body and moved it to utils/getRequestBody.js
 * - Removed the apiKey variable from index.js used dotenv to load it from .env
 * - Moved fallback logic into else block
 * - Logged error.message instead of error
 */

async function generatePassword(passwordLength) {
  let password = "";
  const requestBody = getRequestBody(passwordLength, characters);

  try {
    const response = await fetch("https://api.random.org/json-rpc/4/invoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.result && data.result.random && data.result.random.data) {
      const randomIndices = data.result.random.data;
      for (const index of randomIndices) {
        password += characters[index];
      }
    } else {
      // Fallback to pseudo-random in case of an error
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
    }
  } catch (error) {
    console.error("Error fetching random data:", error.message);
  }

  return password;
}

async function generatePasswords() {
  const password1 = await generatePassword(12);
  const password2 = await generatePassword(12);

  document.getElementById("password-1").value = password1;
  document.getElementById("password-2").value = password2;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".generate-passwords")
    .addEventListener("click", generatePasswords);
});
