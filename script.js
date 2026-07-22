const dayNav = document.querySelector("#dayNav");
const dayTitle = document.querySelector("#dayTitle");
const dayContent = document.querySelector("#dayContent");
const programLabel = document.querySelector("#programLabel");
const siteTitle = document.querySelector("#siteTitle");
const languageButtons = document.querySelectorAll(".language-button");
const embeddedTexts = window.PRAYER_TEXTS || {};
const isDirectFile = window.location.protocol === "file:";
let currentLanguage = "en";
let currentDay = null;

const languages = {
  en: {
    label: "English",
    suffix: "",
    pageTitle: "40 Days Fasting & Prayers",
    programLabel: "40 Days",
    siteTitle: "Fasting & Prayers",
    dayLabel: "Day",
    empty: "This day does not have text yet.",
    missing: "This day is not available yet.",
  },
  de: {
    label: "Deutsch",
    suffix: "_de",
    pageTitle: "40 Tage Beten & Fasten",
    programLabel: "40 Tage",
    siteTitle: "Beten & Fasten",
    dayLabel: "Tag",
    empty: "The German translation for this day does not have text yet.",
    missing: "The German translation for this day is not available yet.",
  },
  vn: {
    label: "Vietnamese",
    suffix: "_vn",
    pageTitle: "40 Ngày Cầu Nguyện & Kiêng Ăn",
    programLabel: "40 Ngày",
    siteTitle: "Cầu Nguyện & Kiêng Ăn",
    dayLabel: "Ngày",
    empty: "The Vietnamese translation for this day does not have text yet.",
    missing: "The Vietnamese translation for this day is not available yet.",
  },
};

const days = Array.from({ length: 40 }, (_, index) => {
  const number = index + 1;
  return {
    number,
    baseName: `day${String(number).padStart(2, "0")}`,
  };
});

const cache = new Map();

function getDayFile(day, language = currentLanguage) {
  const suffix = languages[language]?.suffix || "";
  return `${day.baseName}${suffix}.txt`;
}

function getDayLabel(day, language = currentLanguage) {
  const label = languages[language]?.dayLabel || languages.en.dayLabel;
  return `${label} ${day.number}`;
}

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
  currentDay = day;
  setActiveDay(day.number);
  dayTitle.textContent = getDayLabel(day);
  dayContent.textContent = "";
  const language = languages[currentLanguage] || languages.en;
  const file = getDayFile(day);

  if (isDirectFile && embeddedTexts[file] !== undefined) {
    const text = embeddedTexts[file];
    if (text.trim()) {
      renderText(text);
    } else {
      renderMessage(language.empty);
    }
    return;
  }

  if (cache.has(file)) {
    const cached = cache.get(file);
    if (cached) {
      renderText(cached);
    } else {
      renderMessage(language.empty);
    }
    return;
  }

  try {
    const response = await fetch(file, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Missing file");
    }

    const text = await response.text();
    cache.set(file, text);

    if (text.trim()) {
      renderText(text);
    } else {
      renderMessage(language.empty);
    }
  } catch (error) {
    const embeddedText = embeddedTexts[file];
    cache.set(file, embeddedText || "");

    if (embeddedText && embeddedText.trim()) {
      renderText(embeddedText);
    } else {
      renderMessage(language.missing);
    }
  }
}

function setLanguage(language) {
  currentLanguage = language;
  const languageSettings = languages[currentLanguage] || languages.en;
  document.documentElement.lang = currentLanguage === "vn" ? "vi" : currentLanguage;
  document.title = languageSettings.pageTitle;
  programLabel.textContent = languageSettings.programLabel;
  siteTitle.textContent = languageSettings.siteTitle;
  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === currentLanguage);
  });
  updateDayLabels();
  loadDay(currentDay || days[0]);
}

function updateDayLabels() {
  document.querySelectorAll(".day-button").forEach((button) => {
    const day = days.find((item) => item.number === Number(button.dataset.day));
    if (day) {
      button.querySelector(".day-number").textContent = getDayLabel(day);
    }
  });
}

function buildDayList() {
  const fragment = document.createDocumentFragment();

  days.forEach((day) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-button";
    button.dataset.day = day.number;
    button.innerHTML = `<span class="day-number">${getDayLabel(day)}</span>`;
    button.addEventListener("click", () => loadDay(day));
    fragment.appendChild(button);
  });

  dayNav.appendChild(fragment);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

buildDayList();
loadDay(days[0]);
