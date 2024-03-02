export function displayError(message) {
  const errorContainer = document.getElementById("error-container");
  const error = document.getElementById("error");
  error.textContent = message;
  errorContainer.style.visibility = "visible";
  setTimeout(() => {
    errorContainer.style.visibility = "hidden";
  }, 6000);
}
