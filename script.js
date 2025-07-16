window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000);
});

document.getElementById("tapToType").addEventListener("click", () => {
  document.getElementById("hiddenInput").focus();
});

const logDiv = document.getElementById("log");
const downloadBtn = document.getElementById("downloadBtn");
const keyCount = document.getElementById("keyCount");
const wordCount = document.getElementById("wordCount");
const wpmDisplay = document.getElementById("wpm");
const privacyBtn = document.getElementById("togglePrivacy");
let keystrokes = [];
let startTime = Date.now();

document.addEventListener("keypress", function (e) {
  const key = e.key;
  keystrokes.push(key);
  logDiv.textContent += key + " ";
  keyCount.textContent = keystrokes.length;
  wordCount.textContent = countWords(keystrokes.join(""));
  wpmDisplay.textContent = estimateWPM();
  if (
    ["password", "123456", "admin"].some((p) => keystrokes.join("").includes(p))
  ) {
    appendThreat("[🚨] Common password detected — security risk!");
  }
  if (keystrokes.length > 1 && key === keystrokes[keystrokes.length - 2]) {
    appendThreat("[⚠] Repeated key pattern detected.");
  }
});

downloadBtn.addEventListener("click", function () {
  const blob = new Blob([keystrokes.join(" ")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "keystrokes.txt";
  a.click();
  URL.revokeObjectURL(url);
});

const threatLog = document.getElementById("threatLog");
const simulateThreat = document.getElementById("simulateThreat");

simulateThreat.addEventListener("click", function () {
  const threats = [
    "[⚠] Suspicious key pattern detected.",
    "[🛡] Firewall probe initiated.",
    "[🔍] Typing behavior resembles phishing tactics.",
    "[📡] Key frequency spike — potential brute force detected.",
    "[✅] Threat neutralized. Logging event...",
  ];
  appendThreat(threats[Math.floor(Math.random() * threats.length)]);
});

function appendThreat(msg) {
  const line = document.createElement("p");
  line.textContent = msg;
  threatLog.appendChild(line);
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function estimateWPM() {
  const elapsedMinutes = (Date.now() - startTime) / 60000;
  return Math.round(countWords(keystrokes.join("")) / elapsedMinutes || 0);
}

privacyBtn.addEventListener("click", () => {
  document.body.classList.toggle("private");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
