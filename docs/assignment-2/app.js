const timelineItems = [
  { label: 'Etruscan', region: 'Northern Italy', start: -700, end: -100 },
  { label: 'Venetic', region: 'Northeastern Italy', start: -600, end: -100 },
  { label: 'Messapic', region: 'Southeastern Italy', start: -600, end: -100 },
  { label: 'Oscan', region: 'Southern Italy', start: -500, end: 100 },
  { label: 'Celtiberian', region: 'Iberian Peninsula', start: -200, end: 50 },
];

const slider = document.getElementById('yearSlider');
const yearLabel = document.getElementById('yearLabel');
const currentSelection = document.getElementById('currentSelection');
const activeCount = document.getElementById('activeCount');
const statusText = document.getElementById('statusText');
const cards = document.getElementById('cards');
const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');

let timerId = null;

function formatYear(year) {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

function renderCards(activeYear) {
  cards.innerHTML = '';
  let visibleItems = 0;

  timelineItems.forEach((item) => {
    const isActive = activeYear >= item.start && activeYear <= item.end;
    if (isActive) visibleItems += 1;

    const card = document.createElement('div');
    card.className = `card ${isActive ? 'is-active' : ''}`;
    card.innerHTML = `<strong>${item.label}</strong><span>${item.region} · ${formatYear(item.start)} to ${formatYear(item.end)}</span>`;
    cards.appendChild(card);
  });

  activeCount.textContent = `${visibleItems} / ${timelineItems.length}`;
  statusText.textContent = visibleItems
    ? 'Highlighted entries overlap the chosen year.'
    : 'No entry matches this year exactly.';
}

function updateTimeline(value) {
  const year = Number(value);
  yearLabel.textContent = formatYear(year);
  currentSelection.textContent = formatYear(year);
  renderCards(year);
}

function stopPlayback() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    playBtn.textContent = 'Play';
  }
}

slider.addEventListener('input', (event) => {
  stopPlayback();
  updateTimeline(event.target.value);
});

playBtn.addEventListener('click', () => {
  if (timerId) {
    stopPlayback();
    return;
  }

  playBtn.textContent = 'Pause';
  timerId = window.setInterval(() => {
    const nextValue = Number(slider.value) + 50;
    slider.value = nextValue > 400 ? -1000 : nextValue;
    updateTimeline(slider.value);
  }, 350);
});

resetBtn.addEventListener('click', () => {
  stopPlayback();
  slider.value = -1000;
  updateTimeline(slider.value);
});

updateTimeline(slider.value);
