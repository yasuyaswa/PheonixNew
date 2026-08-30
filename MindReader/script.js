/* ─────────────────────────────────────────
   DOM REFERENCES
──────────────────────────────────────────── */
const progressEl   = document.getElementById('progress');
const wizardEl      = document.getElementById('wizard');
const stepBadgeEl   = document.getElementById('stepBadge');
const stepTextEl    = document.getElementById('stepText');
const backBtn       = document.getElementById('backBtn');
const nextBtn       = document.getElementById('nextBtn');
const nextLabelEl   = document.getElementById('nextLabel');
const revealEl      = document.getElementById('reveal');
const revealNumberEl = document.getElementById('revealNumber');
const secretBox     = document.getElementById('secretBox');
const passwordGate  = document.getElementById('passwordGate');
const secretPasswordEl = document.getElementById('secretPassword');
const toastEl       = document.getElementById('toast');

const SECRET_PASSWORD = 'tricky';
let secretUnlocked = false;

/* ─────────────────────────────────────────
   TRICK STATE
   The app never asks for (or knows) the
   user's secret number — the algebra makes
   the final result constant regardless of
   what they picked.
──────────────────────────────────────────── */
const TOTAL_STEPS = 5;

let multiplier = 0; // m: random 2–9
let addValue   = 0; // a: m × k  (always a clean multiple of m)
let answer     = 0; // k: the number that will be "read"
let currentStep = 1;
let steps = [];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildTrick() {
  multiplier = randomInt(2, 9);
  answer     = randomInt(1, 20);
  addValue   = multiplier * answer;

  steps = [
    'Think of any whole number between <strong>1</strong> and <strong>10</strong>. Keep it a secret — don\u2019t tell me, don\u2019t write it down!',
    `Multiply your number by <strong>${multiplier}</strong>.`,
    `Add <strong>${addValue}</strong> to that result.`,
    `Now divide the total by <strong>${multiplier}</strong>.`,
    'Finally, subtract your <strong>original number</strong> — the one you first thought of — from that result.'
  ];

  currentStep = 1;
}

/* ─────────────────────────────────────────
   TOAST
──────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg, duration) {
  duration = duration || 2400;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, duration);
}

/* ─────────────────────────────────────────
   RENDER
──────────────────────────────────────────── */
function renderProgress() {
  progressEl.innerHTML = '';
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === currentStep ? ' active' : i < currentStep ? ' done' : '');
    progressEl.appendChild(dot);
  }
}

function renderStep() {
  stepBadgeEl.textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
  stepTextEl.innerHTML = steps[currentStep - 1];
  backBtn.disabled = currentStep === 1;
  nextLabelEl.textContent = currentStep === TOTAL_STEPS ? 'Reveal My Answer' : 'Next';
  renderProgress();
}

/* ─────────────────────────────────────────
   NAVIGATION
──────────────────────────────────────────── */
function nextStep() {
  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    renderStep();
  } else {
    revealAnswer();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    renderStep();
  }
}

/* ─────────────────────────────────────────
   REVEAL
──────────────────────────────────────────── */
function revealAnswer() {
  wizardEl.hidden = true;
  revealEl.hidden = false;
  secretBox.hidden = true;
  secretBox.innerHTML = '';

  revealNumberEl.textContent = '0';
  animateCount(revealNumberEl, answer, 700);
  showToast('🔮 Reading your mind…');
}

function animateCount(el, target, duration) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(tick);
}

/* ─────────────────────────────────────────
   SECRET / HOW IT WORKS (password protected)
──────────────────────────────────────────── */
function toggleSecret() {
  if (secretUnlocked) {
    // Already unlocked — just toggle visibility of the explanation.
    secretBox.hidden = !secretBox.hidden;
    return;
  }

  // Not unlocked yet — show/hide the password gate.
  const showing = !passwordGate.hidden;
  passwordGate.hidden = showing;
  secretBox.hidden = true;
  if (!showing) {
    secretPasswordEl.value = '';
    secretPasswordEl.focus();
  }
}

function checkSecretPassword() {
  const entered = secretPasswordEl.value.trim();

  if (entered === SECRET_PASSWORD) {
    secretUnlocked = true;
    passwordGate.hidden = true;
    revealSecretExplanation();
    showToast('🔓 Unlocked!');
    return;
  }

  showToast('❌ Wrong password — contact Yaswanth for the password');
  shakeElement(passwordGate);
  secretPasswordEl.value = '';
  secretPasswordEl.focus();
}

function shakeElement(el) {
  el.classList.remove('shake');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('shake');
  el.addEventListener('animationend', function() {
    el.classList.remove('shake');
  }, { once: true });
}

function revealSecretExplanation() {
  secretBox.innerHTML =
    `Call your secret number <strong>x</strong>. Here's what happened:<br><br>` +
    `(x × ${multiplier} + ${addValue}) ÷ ${multiplier} − x&nbsp;=&nbsp;${answer}<br><br>` +
    `The <strong>x</strong> always cancels out — so no matter what number you picked, ` +
    `the answer is always <strong>${addValue} ÷ ${multiplier} = ${answer}</strong>. ` +
    `The multiplier and add-value are randomized every round, so the pattern stays hidden!`;
  secretBox.hidden = false;
}

/* ─────────────────────────────────────────
   RESET / NEW TRICK
──────────────────────────────────────────── */
function resetTrick() {
  buildTrick();
  revealEl.hidden = true;
  secretBox.hidden = true;
  passwordGate.hidden = true;
  wizardEl.hidden = false;
  renderStep();
}

/* ─────────────────────────────────────────
   KEYBOARD SHORTCUTS
──────────────────────────────────────────── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    if (e.target === secretPasswordEl) {
      checkSecretPassword();
    } else if (!wizardEl.hidden) {
      nextStep();
    } else if (!revealEl.hidden && passwordGate.hidden) {
      resetTrick();
    }
  }
});

/* ─────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', function() {
  buildTrick();
  renderStep();
});
