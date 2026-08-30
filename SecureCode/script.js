/* ─────────────────────────────────────────
   DOM REFERENCES
──────────────────────────────────────────── */
const code1El     = document.getElementById('code1');
const code2El     = document.getElementById('code2');
const resultEl    = document.getElementById('result');
const resultCard  = document.getElementById('resultCard');
const outputEl    = document.getElementById('output');
const statusIcon  = document.getElementById('statusIcon');
const statusText  = document.getElementById('statusText');
const copyBtn     = document.getElementById('copyBtn');
const copyLabel   = document.getElementById('copyLabel');
const charCount   = document.getElementById('charCount');
const toastEl     = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

/* ─────────────────────────────────────────
   THEME MANAGEMENT (light only in Phoenix)
──────────────────────────────────────────── */
const THEME_KEY = 'securecode-theme';
let isDark = false; // always light in Phoenix Dashboard

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    applyTheme(isDark);
  });
}

/* ─────────────────────────────────────────
   CHARACTER COUNT
──────────────────────────────────────────── */
code1El.addEventListener('input', () => {
  const n = code1El.value.length;
  charCount.textContent = n + ' / ∞';
});

/* ─────────────────────────────────────────
   TOAST NOTIFICATION
──────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg, duration) {
  duration = duration || 2600;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toastEl.classList.remove('show');
  }, duration);
}

/* ─────────────────────────────────────────
   STATUS HELPERS
──────────────────────────────────────────── */
function setSuccess(message) {
  message = message || 'Code generated!';
  statusIcon.textContent = '✅';
  statusText.textContent = message;
  resultCard.classList.remove('invalid');
}

function setInvalid(type, message) {
  type = type || 'error';
  statusIcon.textContent = type === 'warn' ? '⚠️' : '❌';
  statusText.textContent = message || (type === 'warn' ? 'Check your input' : 'Invalid input');
  resultCard.classList.add('invalid');
}

/* ─────────────────────────────────────────
   SECRET CODE ALGORITHM
   Use case: name initials + mobile last-2-digits
   e.g. "Af" or "af" + 80  →  a=1, f=6, 80×2=160→60  →  "1660"

   Rules:
   • Input is lowercased first (case-insensitive: "Af" === "af")
   • Every letter in the input is treated as an initial
     (spaces / non-letters are ignored)
   • Convert each initial to its alphabet position (a=1…z=26)
     - Single digit (a–i): use as-is  (a→1, b→2 … i→9)
     - Two digits  (j–z): use last digit (j→0, k→1 … z→6)
   • Numeric key: (key × 2) % 100, zero-padded to 2 digits
   • Concatenate → passcode
──────────────────────────────────────────── */
function generateSecretCode(fullName, keyNum) {
  var key    = parseInt(keyNum);
  var name   = fullName.trim().toLowerCase();   // lowercase before processing
  var result = '';

  for (var i = 0; i < name.length; i++) {
    var ch = name[i];
    if (ch < 'a' || ch > 'z') continue;         // skip spaces / non-letters
    var pos = ch.charCodeAt(0) - 96;            // a=1 … z=26
    result += (pos < 10 ? String(pos) : String(pos % 10));
  }

  if (!result) return '';                          // no valid letters found

  // Always produce a 2-digit numeric suffix (wraps at 100)
  var suffix = (key * 2) % 100;
  result += (suffix < 10 ? '0' + suffix : String(suffix));

  return result;
}

/* ─────────────────────────────────────────
   TYPEWRITER ANIMATION
──────────────────────────────────────────── */
function typeWrite(el, text, charDelay) {
  charDelay = charDelay || 70;
  el.textContent = '';
  var i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, charDelay);
    }
  }
  tick();
}

/* ─────────────────────────────────────────
   SHAKE ANIMATION HELPER
──────────────────────────────────────────── */
function shake(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('shake');
  void el.offsetWidth; // reflow to restart animation
  el.classList.add('shake');
  el.addEventListener('animationend', function() {
    el.classList.remove('shake');
  }, { once: true });
}

/* ─────────────────────────────────────────
   PROCESS / GENERATE
──────────────────────────────────────────── */
function process() {
  var code1 = code1El.value.trim();
  var code2 = code2El.value.trim();

  if (!code1 && !code2) {
    showToast('⚠️ Please fill in both fields');
    shake('field1');
    shake('field2');
    return;
  }
  if (!code1) {
    showToast('⚠️ Name cannot be empty');
    shake('field1');
    return;
  }
  if (!code2) {
    showToast('⚠️ Numeric key cannot be empty');
    shake('field2');
    return;
  }
  if (isNaN(code2)) {
    setInvalid('error', 'Numeric key must be a number');
    resultEl.hidden = false;
    shake('field2');
    return;
  }

  var numCode2 = parseInt(code2);
  if (numCode2 < 0 || numCode2 > 100) {
    setInvalid('warn', 'Number must be between 0 and 100');
    resultEl.hidden = false;
    shake('field2');
    return;
  }

  try {
    var secretCode = generateSecretCode(code1, code2);
    if (!secretCode) {
      setInvalid('error', 'No valid letters found in the name');
      resultEl.hidden = false;
      shake('field1');
      return;
    }
    setSuccess('Code generated!');
    outputEl.textContent = '';
    resultEl.hidden = false;
    copyBtn.disabled = true;

    setTimeout(function() {
      typeWrite(outputEl, secretCode, 75);
      setTimeout(function() {
        copyBtn.disabled = false;
      }, secretCode.length * 75 + 120);
    }, 80);
  } catch (err) {
    setInvalid('error', 'Something went wrong');
    resultEl.hidden = false;
  }
}

/* ─────────────────────────────────────────
   COPY TO CLIPBOARD
──────────────────────────────────────────── */
function copy() {
  var text = outputEl.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(function() {
    copyLabel.textContent     = 'Copied!';
    copyBtn.style.borderColor = 'rgba(16,185,129,0.5)';
    copyBtn.style.color       = '#10b981';
    showToast('✅ Copied to clipboard!');

    setTimeout(function() {
      copyLabel.textContent     = 'Copy to clipboard';
      copyBtn.style.borderColor = '';
      copyBtn.style.color       = '';
    }, 2200);
  }).catch(function() {
    showToast('❌ Copy failed – select the code manually');
  });
}

/* ─────────────────────────────────────────
   RESET
──────────────────────────────────────────── */
function resetAll() {
  code1El.value             = '';
  code2El.value             = '';
  charCount.textContent     = '0 / ∞';
  outputEl.textContent      = '';
  resultEl.hidden           = true;
  copyBtn.disabled          = true;
  copyLabel.textContent     = 'Copy to clipboard';
  copyBtn.style.borderColor = '';
  copyBtn.style.color       = '';
  code1El.focus();
}

/* ─────────────────────────────────────────
   KEYBOARD SHORTCUTS
──────────────────────────────────────────── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && (e.target === code1El || e.target === code2El)) {
    process();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    process();
  }
});

/* ─────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', function() {
  applyTheme(isDark);
  copyBtn.disabled = true;
  code1El.focus();
});