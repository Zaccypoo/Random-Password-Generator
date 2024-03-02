export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.error("Failed to copy: ", e.message);
  }
}

export function displayCopied(elementNumber) {
  const copied = document.getElementById(`copied-password-${elementNumber}`);
  copied.style.visibility = "visible";
  setTimeout(() => {
    copied.style.visibility = "hidden";
  }, 2000);
}
