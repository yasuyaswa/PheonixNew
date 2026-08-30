let rotation   = 0;
let heads      = 0;
let tails      = 0;
let streak     = 0;
let streakSide = null;
let flipHistory = [];
let isFlipping  = false;

const coin    = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');

/* ── Flip ────────────────────────────────────────────────────── */
function flipCoin() {
  if (isFlipping) return;
  isFlipping = true;
  flipBtn.disabled = true;

  const isHeads = Math.random() < 0.5;

  // Accumulate rotation so every flip moves forward:
  // 3-5 full spins + land on 0° (heads) or 180° (tails)
  const spins  = (3 + Math.floor(Math.random() * 3)) * 360;
  const base   = Math.ceil(rotation / 360) * 360;
  rotation     = base + spins + (isHeads ? 0 : 180);

  coin.style.transform  = `rotateY(${rotation}deg)`;

  setTimeout(() => {
    showResult(isHeads);
    isFlipping = false;
    flipBtn.disabled = false;
  }, 1150);
}

/* ── Show result ─────────────────────────────────────────────── */
function showResult(isHeads) {
  const resultEl = document.getElementById('resultValue');
  resultEl.className = 'result-value ' + (isHeads ? 'heads' : 'tails');
  resultEl.textContent = isHeads ? 'HEADS' : 'TAILS';

  // Stats
  if (isHeads) heads++; else tails++;
  const total = heads + tails;
  document.getElementById('headsCount').textContent = heads;
  document.getElementById('tailsCount').textContent = tails;
  document.getElementById('totalCount').textContent = total;

  // Streak
  const side = isHeads ? 'heads' : 'tails';
  if (streakSide === side) {
    streak++;
  } else {
    streak     = 1;
    streakSide = side;
  }

  // Streak / ratio label
  const streakBar = document.getElementById('streakBar');
  if (streak >= 3) {
    streakBar.textContent = `🔥 ${streak}× ${isHeads ? 'Heads' : 'Tails'} in a row!`;
  } else {
    const headsP = Math.round((heads / total) * 100);
    streakBar.textContent = `👑 Heads ${headsP}%  ·  ⭐ Tails ${100 - headsP}%`;
  }

  // History dots (newest first, max 20)
  flipHistory.unshift(isHeads ? 'h' : 't');
  if (flipHistory.length > 20) flipHistory.pop();
  renderHistory();
}

/* ── History dots ────────────────────────────────────────────── */
function renderHistory() {
  const container = document.getElementById('historyDots');
  container.innerHTML = '';
  flipHistory.forEach(side => {
    const dot = document.createElement('div');
    dot.className = 'history-dot ' + side;
    dot.textContent = side === 'h' ? 'H' : 'T';
    container.appendChild(dot);
  });
}

/* ── Also flip on coin click ─────────────────────────────────── */
coin.addEventListener('click', flipCoin);

/* ── Keyboard: Space or Enter ────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault();
    flipCoin();
  }
});
