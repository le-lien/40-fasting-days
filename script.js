const dayNav = document.querySelector("#dayNav");
const dayTitle = document.querySelector("#dayTitle");
const dayContent = document.querySelector("#dayContent");
const embeddedTexts = window.PRAYER_TEXTS || {};
const isDirectFile = window.location.protocol === "file:";

const days = Array.from({ length: 40 }, (_, index) => {
  const number = index + 1;
  return {
    number,
    label: `Day ${number}`,
    file: `day${String(number).padStart(2, "0")}.txt`,
  };
});

const cache = new Map();

function setActiveDay(number) {
  document.querySelectorAll(".day-button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.day) === number);
  });
}

function renderText(text) {
  dayContent.classList.remove("empty-message");
  dayContent.textContent = text.trim();
}

function renderMessage(message) {
  dayContent.classList.add("empty-message");
  dayContent.textContent = message;
}

async function loadDay(day) {
  setActiveDay(day.number);
  dayTitle.textContent = day.label;
  dayContent.textContent = "";

  if (isDirectFile && embeddedTexts[day.file] !== undefined) {
    const text = embeddedTexts[day.file];
    if (text.trim()) {
      renderText(text);
    } else {
      renderMessage("This day does not have text yet.");
    }
    return;
  }

  if (cache.has(day.file)) {
    const cached = cache.get(day.file);
    if (cached) {
      renderText(cached);
    } else {
      renderMessage("This day does not have text yet.");
    }
    return;
  }

  try {
    const response = await fetch(day.file, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Missing file");
    }

    const text = await response.text();
    cache.set(day.file, text);

    if (text.trim()) {
      renderText(text);
    } else {
      renderMessage("This day does not have text yet.");
    }
  } catch (error) {
    const embeddedText = embeddedTexts[day.file];
    cache.set(day.file, embeddedText || "");

    if (embeddedText && embeddedText.trim()) {
      renderText(embeddedText);
    } else {
      renderMessage("This day is not available yet.");
    }
  }
}

function buildDayList() {
  const fragment = document.createDocumentFragment();

  days.forEach((day) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-button";
    button.dataset.day = day.number;
    button.innerHTML = `
      <span class="day-number">${day.label}</span>
      <span class="day-state">Open</span>
    `;
    button.addEventListener("click", () => loadDay(day));
    fragment.appendChild(button);
  });

  dayNav.appendChild(fragment);
}

buildDayList();
loadDay(days[0]);
