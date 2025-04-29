const typingSpeed = 300;
const erasingSpeed = 100;
const delayBetweenWords = 2000;

function initializeTyping(container) {
  const textArray = JSON.parse(container.getAttribute("data-text"));
  const typedTextSpan = container.querySelector(".typed_text");
  const cursorSpan = container.querySelector(".cursor");

  if (!textArray || !typedTextSpan || !cursorSpan) {
    console.error("Error: Element or data-text not found!");
    return;
  }

  let textIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function type() {
    const currentText = textArray[textIndex];

    if (!isErasing) {
      typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => { isErasing = true; type(); }, delayBetweenWords);
        return;
      }
    } else {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isErasing = false;
        textIndex = (textIndex + 1) % textArray.length;
      }
    }

    setTimeout(type, isErasing ? erasingSpeed : typingSpeed);
  }

  setTimeout(type, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  const typingContainers = document.querySelectorAll(".typing_container");
  typingContainers.forEach(container => initializeTyping(container));
});