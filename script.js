window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000);
});

const logDiv = document.getElementById("log");
const keyCount = document.getElementById("keyCount");
const wordCount = document.getElementById("wordCount");
const wpmDisplay = document.getElementById("wpm");
const downloadBtn = document.getElementById("downloadBtn");
const privacyBtn = document.getElementById("togglePrivacy");
const threatLog = document.getElementById("threatLog");
const simulateThreatBtn = document.getElementById("simulateThreat");

let keystrokes = [];
let startTime = Date.now();

document.addEventListener("keypress", (e) => {
  const key = e.key;
  keystrokes.push(key);
  logDiv.textContent += key + " ";

  keyCount.textContent = keystrokes.length;
  wordCount.textContent = countWords(keystrokes.join(""));
  wpmDisplay.textContent = estimateWPM();

  detectThreats(key);
});

function detectThreats(currentKey) {
  const typed = keystrokes.join("");

  const riskyPasswords = [
    "123456",
    "12345678",
    "123456789",
    "12345",
    "123123",
    "111111",
    "password",
    "password1",
    "passw0rd",
    "admin",
    "letmein",
    "qwerty",
    "iloveyou",
    "welcome",
    "monkey",
    "dragon",
    "abc123",
    "123qwe",
    "sunshine",
    "football",
    "princess",
    "login",
    "user",
    "trustno1",
  ];
  if (riskyPasswords.some((pass) => typed.includes(pass))) {
    appendThreat("[🚨] Common password detected — security risk!");
  }

  const lastKey = keystrokes[keystrokes.length - 2];
  if (lastKey && currentKey === lastKey) {
    appendThreat("[⚠] Repeated key pattern detected.");
  }
}

simulateThreatBtn.addEventListener("click", () => {
  const threats = [
    "[⚠] Suspicious key pattern detected.",
    "[🛡] Firewall probe initiated.",
    "[🔍] Typing behavior resembles phishing tactics.",
    "[📡] Key frequency spike — potential brute force detected.",
    "[✅] Threat neutralized. Logging event...",
  ];
  const randomMsg = threats[Math.floor(Math.random() * threats.length)];
  appendThreat(randomMsg);
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([keystrokes.join(" ")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "keystrokes.txt";
  a.click();
  URL.revokeObjectURL(url);
});

function appendThreat(message) {
  const entry = document.createElement("p");
  entry.textContent = message;
  threatLog.appendChild(entry);
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function estimateWPM() {
  const elapsedMinutes = (Date.now() - startTime) / 60000;
  const words = countWords(keystrokes.join(""));
  return Math.round(words / (elapsedMinutes || 1));
}

privacyBtn.addEventListener("click", () => {
  document.body.classList.toggle("private");
});
