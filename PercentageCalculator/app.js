const indianFormat = new Intl.NumberFormat("en-IN");

const lastValues = {
  percent: 0,
  discount: 0,
  tax: 0
};

let currentCalcMode = 'standard';

document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");

  amountInput.addEventListener("input", () => {
    const cursor = amountInput.selectionStart;
    const raw = amountInput.value.replace(/,/g, "").replace(/\D/g, "");
    amountInput.value = indianFormat.format(raw || 0);
    amountInput.setSelectionRange(cursor, cursor);
  });

  ["partX", "totalY", "billAmount"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const raw = el.value.replace(/,/g, "").replace(/\D/g, "");
      el.value = raw ? indianFormat.format(Number(raw)) : "";
    });
  });

  document.getElementById("calcBtn").addEventListener("click", calculate);
  document.getElementById("historyBtn").addEventListener("click", toggleHistory);
  document.getElementById("clearHistory").addEventListener("click", clearHistory);

  document.querySelectorAll(".copy").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.copy;
      navigator.clipboard.writeText(indianFormat.format(lastValues[key]));
      card.classList.add("show");
      setTimeout(() => card.classList.remove("show"), 800);
    });
  });
});

function getRawAmount() {
  return Number(document.getElementById("amount").value.replace(/,/g, ""));
}

function round(n) {
  return Number.isInteger(n) ? n : Number(n.toFixed(2));
}

function calculate() {
  if (currentCalcMode === 'standard') calculateStandard();
  else if (currentCalcMode === 'reverse') calculateReverse();
  else calculateTip();
}

function calculateStandard() {
  const amount = getRawAmount();
  const percentage = Number(document.getElementById("percentage").value);
  if (!amount || !percentage) return;

  const percent = (amount * percentage) / 100;
  const discount = amount - percent;
  const tax = amount + percent;

  lastValues.percent = round(percent);
  lastValues.discount = round(discount);
  lastValues.tax = round(tax);

  document.getElementById("percentValue").innerText =
    `₹${indianFormat.format(lastValues.percent)}`;
  document.getElementById("discountValue").innerText =
    `₹${indianFormat.format(lastValues.discount)}`;
  document.getElementById("taxValue").innerText =
    `₹${indianFormat.format(lastValues.tax)}`;

  document.getElementById("resultsStandard").classList.remove("hidden");
  saveHistory(amount, percentage, lastValues.percent);
}

/* HISTORY */
function saveHistory(amount, percentage, percent) {
  saveHistoryEntry(`₹${indianFormat.format(amount)} @ ${percentage}% → ₹${indianFormat.format(percent)}`);
}

function saveHistoryEntry(str) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(str);
  history = history.slice(0, 10);
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

/* REVERSE % */
function calculateReverse() {
  const partX  = Number(document.getElementById("partX").value.replace(/,/g, ""));
  const totalY = Number(document.getElementById("totalY").value.replace(/,/g, ""));
  if (!partX || !totalY) return;
  const pct = round((partX / totalY) * 100);
  document.getElementById("reverseValue").innerText = pct + "%";
  document.getElementById("resultsReverse").classList.remove("hidden");
  saveHistoryEntry(`${indianFormat.format(partX)} is ${pct}% of ${indianFormat.format(totalY)}`);
}

/* TIP */
function calculateTip() {
  const bill   = Number(document.getElementById("billAmount").value.replace(/,/g, ""));
  const tipPct = Number(document.getElementById("tipPercent").value);
  if (!bill || !tipPct) return;
  const tipAmt   = round((bill * tipPct) / 100);
  const tipTotal = round(bill + tipAmt);
  document.getElementById("tipAmount").innerText = "₹" + indianFormat.format(tipAmt);
  document.getElementById("tipTotal").innerText  = "₹" + indianFormat.format(tipTotal);
  document.getElementById("resultsTip").classList.remove("hidden");
  saveHistoryEntry(`Tip ${tipPct}% on ₹${indianFormat.format(bill)} → ₹${indianFormat.format(tipAmt)} (Total: ₹${indianFormat.format(tipTotal)})`);
}

/* MODE SWITCH */
function setCalcMode(mode) {
  currentCalcMode = mode;
  ["Standard", "Reverse", "Tip"].forEach(m => {
    document.getElementById("tab" + m).classList.toggle("active", m.toLowerCase() === mode);
  });
  document.getElementById("inputStandard").classList.toggle("hidden", mode !== "standard");
  document.getElementById("inputReverse").classList.toggle("hidden",  mode !== "reverse");
  document.getElementById("inputTip").classList.toggle("hidden",      mode !== "tip");
  document.getElementById("resultsStandard").classList.add("hidden");
  document.getElementById("resultsReverse").classList.add("hidden");
  document.getElementById("resultsTip").classList.add("hidden");
}

function toggleHistory() {
  document.getElementById("historyBox").classList.toggle("hidden");
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  (JSON.parse(localStorage.getItem("calcHistory")) || []).forEach(h => {
    const li = document.createElement("li");
    li.textContent = h;
    list.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("calcHistory");
  renderHistory();
}