/* ─────────────────────────────────────────
   PHOTO LIST
   All images live in the sibling "Reel" folder.
   Referenced with a relative path from this app.
──────────────────────────────────────────── */
const PHOTO_FILES = [
  'FB_IMG_1627003909160.jpg','FB_IMG_1627003898278.jpg','FB_IMG_1627003879217.jpg',
  'FB_IMG_1627003829717.jpg','FB_IMG_1627003819917.jpg','FB_IMG_1627003812783.jpg',
  'FB_IMG_1627003792346.jpg','20210627_115557.jpg','20210620_103021.jpg',
  '20210611_121613.jpg','20210611_121442.jpg','20210419_100521.jpg',
  '20210318_085148.jpg','FB_IMG_1627004021338.jpg','FB_IMG_1627003999014.jpg',
  'FB_IMG_1627003983165.jpg','FB_IMG_1627003971814.jpg','FB_IMG_1627003963132.jpg',
  'FB_IMG_1627003954566.jpg','FB_IMG_1627003920286.jpg','FB_IMG_1627004149955.jpg',
  'FB_IMG_1627004081443.jpg','FB_IMG_1627004059827.jpg','FB_IMG_1627004053065.jpg',
  'FB_IMG_1627004044989.jpg','FB_IMG_1627004027738.jpg','FB_IMG_1627004188306.jpg',
  'FB_IMG_1627004181940.jpg','FB_IMG_1627004170496.jpg','FB_IMG_1627004233792.jpg',
  'FB_IMG_1627004214000.jpg','FB_IMG_1627004251718.jpg','FB_IMG_1627004265304.jpg',
  'FB_IMG_1627004278094.jpg','FB_IMG_1627004996116.jpg','FB_IMG_1627004982832.jpg',
  'FB_IMG_1627004976462.jpg','FB_IMG_1627004969441.jpg','FB_IMG_1627007557434.jpg',
  'FB_IMG_1627007551077.jpg','FB_IMG_1627004963313.jpg','FB_IMG_1627007440765.jpg',
  'FB_IMG_1627004942623.jpg','FB_IMG_1627007389528.jpg','FB_IMG_1627004918682.jpg',
  'FB_IMG_1627007346712.jpg','FB_IMG_1627004857483.jpg','FB_IMG_1627007340014.jpg',
  'FB_IMG_1627004849956.jpg','FB_IMG_1627007319372.jpg','FB_IMG_1627004814592.jpg',
  'FB_IMG_1627007311293.jpg','FB_IMG_1627004793057.jpg','FB_IMG_1627007293724.jpg',
  'FB_IMG_1627004785193.jpg','FB_IMG_1627007239025.jpg','FB_IMG_1627004690085.jpg',
  'FB_IMG_1627007168326.jpg','FB_IMG_1627004653710.jpg','FB_IMG_1627007149909.jpg',
  'FB_IMG_1627004598616.jpg','FB_IMG_1627007138655.jpg','FB_IMG_1627004559217.jpg',
  'FB_IMG_1627007133546.jpg','FB_IMG_1627004542036.jpg','FB_IMG_1627007121255.jpg',
  'FB_IMG_1627005004374.jpg','FB_IMG_1627007628736.jpg','FB_IMG_1627007617871.jpg',
  'FB_IMG_1627008959857.jpg','FB_IMG_1627007612866.jpg','FB_IMG_1627008915762.jpg',
  'FB_IMG_1627007606371.jpg','FB_IMG_1627008833234.jpg','FB_IMG_1627007592547.jpg',
  'FB_IMG_1627008740350.jpg','FB_IMG_1627007584922.jpg','FB_IMG_1627008734738.jpg',
  'FB_IMG_1627007575933.jpg','FB_IMG_1627008724985.jpg','FB_IMG_1627007570273.jpg',
  'FB_IMG_1627008716063.jpg','FB_IMG_1627008666626.jpg','FB_IMG_1627008624631.jpg',
  'FB_IMG_1627008618095.jpg','FB_IMG_1627008608264.jpg','FB_IMG_1627008572628.jpg',
  'FB_IMG_1627008548720.jpg','FB_IMG_1627008220173.jpg','FB_IMG_1627008530042.jpg',
  'FB_IMG_1627008206453.jpg','FB_IMG_1627008520827.jpg','FB_IMG_1627008199961.jpg',
  'FB_IMG_1627008252920.jpg','FB_IMG_1627008186409.jpg','FB_IMG_1627008238017.jpg',
  'FB_IMG_1627008129845.jpg','FB_IMG_1627008232670.jpg','FB_IMG_1627008103611.jpg',
  'FB_IMG_1627008031778.jpg','FB_IMG_1627008026171.jpg','FB_IMG_1627008013299.jpg',
  'FB_IMG_1627007956012.jpg','FB_IMG_1627007781129.jpg','FB_IMG_1627007653328.jpg',
  'FB_IMG_1627007642794.jpg','FB_IMG_1627007667814.jpg','FB_IMG_1627007708254.jpg',
  'FB_IMG_1627007697529.jpg','FB_IMG_1627007729830.jpg','FB_IMG_1627009669649.jpg',
  'FB_IMG_1627009622726.jpg','FB_IMG_1627009591207.jpg','FB_IMG_1627009583623.jpg',
  'FB_IMG_1627009568239.jpg','FB_IMG_1627009561308.jpg','FB_IMG_1627009523448.jpg',
  'FB_IMG_1627009513662.jpg','FB_IMG_1627007736154.jpg','FB_IMG_1627009468809.jpg',
  'FB_IMG_1627009458941.jpg','FB_IMG_1627009433048.jpg','FB_IMG_1627009401699.jpg',
  'FB_IMG_1627009394108.jpg','FB_IMG_1627009380572.jpg','FB_IMG_1627009331271.jpg',
  'FB_IMG_1627009273792.jpg','FB_IMG_1627009129688.jpg','FB_IMG_1627010046025.jpg',
  'FB_IMG_1627009099087.jpg','FB_IMG_1627004521384.jpg','FB_IMG_1627004512838.jpg',
  'FB_IMG_1627004492914.jpg','FB_IMG_1627004465057.jpg','FB_IMG_1627004458491.jpg',
  'FB_IMG_1627004430034.jpg','FB_IMG_1627004413836.jpg','FB_IMG_1627004390155.jpg',
  'FB_IMG_1627004382861.jpg','FB_IMG_1627009979335.jpg','FB_IMG_1627004351305.jpg',
  'FB_IMG_1627009952291.jpg','FB_IMG_1627004330883.jpg','FB_IMG_1627009935924.jpg',
  'FB_IMG_1627004319784.jpg','FB_IMG_1627009884920.jpg','FB_IMG_1627009877700.jpg',
  'FB_IMG_1627004310807.jpg','FB_IMG_1627009868467.jpg','FB_IMG_1627004292445.jpg',
  'FB_IMG_1627009850750.jpg','FB_IMG_1627004287407.jpg','FB_IMG_1627009829911.jpg',
  'FB_IMG_1627009719107.jpg','FB_IMG_1627009705128.jpg','FB_IMG_1627009009588.jpg',
  'FB_IMG_1627010254825.jpg','FB_IMG_1627007692033.jpg','FB_IMG_1627010175044.jpg',
  'FB_IMG_1627010138446.jpg','FB_IMG_1627010094008.jpg','FB_IMG_1627826452980.jpg',
  'FB_IMG_1627010322117.jpg','FB_IMG_1627010272001.jpg','FB_IMG_1630405459536.jpg',
  'FB_IMG_1629365123893.jpg','FB_IMG_1628384837955.jpg','FB_IMG_1650183009429.jpg',
  'FB_IMG_1650182995905.jpg','FB_IMG_1650183029701.jpg','FB_IMG_1627010057562.jpg',
  'FB_IMG_1650183042632.jpg','FB_IMG_1627010087152.jpg','FB_IMG_1650183057378.jpg',
  'FB_IMG_1650183050990.jpg','FB_IMG_1650183063900.jpg','FB_IMG_1650183084277.jpg',
  'FB_IMG_1705939846183.jpg','FB_IMG_1705939807856.jpg','FB_IMG_1650183139186.jpg',
  'FB_IMG_1650183128017.jpg','FB_IMG_1735723720436.jpg','FB_IMG_1650183105059.jpg',
  'FB_IMG_1705939894764.jpg','FB_IMG_1705939866575.jpg','FB_IMG_1650183090927.jpg',
  'FB_IMG_1775438703285.jpg','FB_IMG_1776480016441.jpg','FB_IMG_1774762234929.jpg',
  'FB_IMG_1627009019241.jpg','Screenshot_20220218_200835.jpg','Screenshot_20220204_100355.jpg',
  'Screenshot_20220124_105323.jpg','Screenshot_20220116_191314.jpg','Screenshot_20211128_105420.jpg',
  'Screenshot_20211127_174859.jpg','Screenshot_20210930_133007.jpg','Screenshot_20210826_151439.jpg',
  'Screenshot_20210826_114958.jpg','Screenshot_20210826_114956.jpg','Screenshot_20210826_114954.jpg',
  'Screenshot_20210826_114952.jpg','Screenshot_20210826_114950.jpg','Screenshot_20210826_114948.jpg',
  'Screenshot_20210803_114947.jpg','Screenshot_20210721_080454.jpg','Screenshot_20200214-223307.png',
  'IMG_20260409_173739_120.jpg','IMG_20250105_222633_847.jpg','IMG_20220329_184404.png',
  'IMG_20220219_165010.jpg','IMG_20220204_100017.jpg','IMG_20220204_095740.jpg',
  'IMG_20220204_095543.jpg','IMG_20220204_095103.jpg','IMG_20220131_174309.jpg',
  'IMG_20220131_173604.jpg','IMG_20220131_173549.jpg','IMG_20220131_173529.jpg',
  'IMG_20220131_173512.jpg','IMG_20211108_103607.jpg','IMG_20211108_103542.jpg',
  'IMG_20211108_103459.jpg','IMG-20240311-WA0188.jpg','IMG-20240311-WA0112.jpg',
  'IMG-20240218-WA0019.jpg','IMG-20240214-WA0008.jpg','IMG-20240116-WA0051.jpg',
  'IMG-20240109-WA0010.jpg','IMG-20240107-WA0001.jpg','IMG-20240101-WA0061.jpg',
  'IMG-20231225-WA0056.jpg','IMG-20231222-WA0130.jpg','IMG-20231222-WA0127.jpg',
  'IMG-20231222-WA0124.jpg','IMG-20231102-WA0011.jpg','IMG-20231026-WA0023.jpg',
  'IMG-20231026-WA0015.jpg','IMG-20231022-WA0034.jpg','IMG-20231015-WA0014.jpg',
  'IMG-20231014-WA0034.jpg','IMG-20231006-WA0001.jpg','IMG-20231005-WA0050.jpg'
];

const PHOTO_DIR = 'Reel/';

/* ─────────────────────────────────────────
   DOM REFERENCES
──────────────────────────────────────────── */
const photoEl        = document.getElementById('photo');
const progressFillEl = document.getElementById('progressFill');
const counterEl      = document.getElementById('counter');
const stageEl        = document.getElementById('stage');
const prevZone       = document.getElementById('prevZone');
const nextZone       = document.getElementById('nextZone');
const playPauseBtn   = document.getElementById('playPauseBtn');
const playPauseIcon  = document.getElementById('playPauseIcon');
const speedBtn       = document.getElementById('speedBtn');

/* ─────────────────────────────────────────
   STATE
──────────────────────────────────────────── */
const SPEEDS = [3000, 5000, 1500];        // Normal, Slow, Fast (ms per photo)
const SPEED_LABELS = ['1x', '0.6x', '2x'];
let speedIndex = 0;
let DURATION = SPEEDS[speedIndex];

let currentIndex = 0;
let animStart = 0;
let elapsedAtPause = 0;
let rafId = null;
let isPaused = false;
let pressStart = 0;

/* ─────────────────────────────────────────
   RENDER
──────────────────────────────────────────── */
function photoUrl(i) {
  return PHOTO_DIR + encodeURIComponent(PHOTO_FILES[i]);
}

function renderPhoto() {
  photoEl.classList.remove('fade-in');
  photoEl.src = photoUrl(currentIndex);
  // Force reflow so the fade-in animation restarts every time.
  void photoEl.offsetWidth;
  photoEl.classList.add('fade-in');

  counterEl.textContent = `${currentIndex + 1} / ${PHOTO_FILES.length}`;
  progressFillEl.style.width = '0%';

  preloadNext();
}

function preloadNext() {
  const nextIndex = (currentIndex + 1) % PHOTO_FILES.length;
  const img = new Image();
  img.src = photoUrl(nextIndex);
}

/* ─────────────────────────────────────────
   PROGRESS / AUTO-ADVANCE LOOP
──────────────────────────────────────────── */
function startSlide() {
  animStart = performance.now() - elapsedAtPause;
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tickProgress);
}

function tickProgress(now) {
  const elapsed = now - animStart;
  const pct = Math.min(elapsed / DURATION, 1);
  progressFillEl.style.width = (pct * 100) + '%';

  if (pct >= 1) {
    goToPhoto(currentIndex + 1);
  } else {
    rafId = requestAnimationFrame(tickProgress);
  }
}

function goToPhoto(index) {
  currentIndex = (index + PHOTO_FILES.length) % PHOTO_FILES.length; // always loops
  elapsedAtPause = 0;
  renderPhoto();
  if (!isPaused) startSlide();
}

function nextPhoto() { goToPhoto(currentIndex + 1); }
function prevPhoto() { goToPhoto(currentIndex - 1); }

/* ─────────────────────────────────────────
   PAUSE / RESUME
──────────────────────────────────────────── */
function pauseSlide() {
  if (isPaused) return;
  isPaused = true;
  cancelAnimationFrame(rafId);
  elapsedAtPause = performance.now() - animStart;
  stageEl.classList.add('paused');
}

function resumeSlide() {
  if (!isPaused) return;
  isPaused = false;
  stageEl.classList.remove('paused');
  startSlide();
}

function togglePlay() {
  if (isPaused) {
    resumeSlide();
  } else {
    pauseSlide();
  }
  playPauseIcon.textContent = isPaused ? '▶' : '⏸';
}

/* ─────────────────────────────────────────
   SPEED CONTROL
──────────────────────────────────────────── */
function cycleSpeed() {
  speedIndex = (speedIndex + 1) % SPEEDS.length;
  DURATION = SPEEDS[speedIndex];
  speedBtn.textContent = SPEED_LABELS[speedIndex];
  elapsedAtPause = 0;
  if (!isPaused) startSlide();
}

/* ─────────────────────────────────────────
   TAP ZONES — hold to pause, quick tap to navigate
──────────────────────────────────────────── */
function bindZone(zone, onTap) {
  zone.addEventListener('mousedown', startPress);
  zone.addEventListener('touchstart', startPress, { passive: true });
  zone.addEventListener('mouseup', endPress);
  zone.addEventListener('touchend', endPress);
  zone.addEventListener('mouseleave', endPress);

  zone.addEventListener('click', function() {
    if (Date.now() - pressStart > 350) return; // was a hold, not a tap
    onTap();
  });

  function startPress() {
    pressStart = Date.now();
    pauseSlide();
    playPauseIcon.textContent = '▶';
  }
  function endPress() {
    resumeSlide();
    playPauseIcon.textContent = '⏸';
  }
}

/* ─────────────────────────────────────────
   KEYBOARD SHORTCUTS
──────────────────────────────────────────── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') nextPhoto();
  else if (e.key === 'ArrowLeft') prevPhoto();
  else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
});

/* ─────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', function() {
  bindZone(prevZone, prevPhoto);
  bindZone(nextZone, nextPhoto);
  speedBtn.textContent = SPEED_LABELS[speedIndex];
  renderPhoto();
  startSlide();
});
