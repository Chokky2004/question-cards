// สลับโหมด: ตั้งเป็น false เพื่อปิด interactive (ลาก/เอียง/พลิก)
const INTERACTIVE = false;

// รายการคำถามทั้งหมด 30 ข้อ (ภาษาไทย)
const QUESTIONS = [
  'แนะนำตัวเองสั้น ๆ และสิ่งที่กำลังสนใจอยู่ตอนนี้',
  'งานอดิเรกที่ทำแล้วมีความสุขที่สุดคืออะไร เพราะอะไร',
  'หนังสือ/พอดแคสต์ที่แนะนำ และสิ่งที่ได้เรียนรู้คืออะไร',
  'ทักษะใหม่ที่อยากพัฒนาในปีนี้คืออะไร และแผนคืออะไร',
  'เครื่องมือดิจิทัลที่ขาดไม่ได้ 3 อย่าง และเหตุผล',
  'นิสัยการทำงานข้อเดียวที่อยากปรับปรุงมากที่สุดคืออะไร',
  'โปรเจกต์ที่ภูมิใจที่สุดที่ผ่านมา มีบทเรียนอะไรบ้าง',
  'ถ้ามีเวลาเพิ่มอีก 2 ชั่วโมงต่อวันจะเอาไปทำอะไร',
  'สถานที่ที่สร้างโฟกัสในการทำงานให้คุณได้ดีที่สุดคือที่ไหน',
  'วิธีจัดการความเครียดหรือความกดดันในช่วงเดดไลน์',
  'คำแนะนำที่ดีที่สุดที่เคยได้รับเกี่ยวกับการทำงานคืออะไร',
  'ความล้มเหลวที่สอนบางอย่างสำคัญให้คุณคือเรื่องอะไร',
  'นิยามคำว่า “ความสำเร็จ” ของคุณในตอนนี้คืออะไร',
  'ถ้าให้เริ่มอาชีพใหม่วันนี้ จะเลือกทำอะไร เพราะอะไร',
  'สุดยอดแอป/เว็บที่ช่วยเพิ่มประสิทธิภาพการทำงานของคุณคืออะไร',
  'นโยบายการทำงาน (ทีม/องค์กร) ที่คุณคิดว่าสร้างผลลัพธ์ได้จริงคืออะไร',
  'วิธีสื่อสารที่ได้ผลที่สุดเวลามีความเห็นไม่ตรงกัน',
  'สิ่งเล็ก ๆ ที่ทำทุกวันแล้วส่งผลระยะยาวคืออะไร',
  'ถ้าให้สอนเวิร์กช็อป 1 ชั่วโมง คุณจะสอนเรื่องอะไร',
  'หนัง/ซีรีส์ที่ดูแล้วได้แรงบันดาลใจในการทำงานคือเรื่องอะไร',
  'คุณวัด “คุณค่าที่สร้างให้ผู้อื่น” อย่างไร',
  'ความเชื่อเกี่ยวกับการเรียนรู้ที่เปลี่ยนไปเพราะประสบการณ์จริง',
  'เครื่องมือ/เทคนิคจัดการงานค้าง (backlog) ที่ใช้ได้ผล',
  'ถ้าทีมมีเวลารีโทร 15 นาที ควรถามคำถามอะไรบ้าง',
  'สิ่งที่อยากบอกตัวเองเมื่อ 5 ปีก่อนคืออะไร',
  'การตัดสินใจยากล่าสุดคืออะไร และตัดสินใจอย่างไร',
  'สิ่งที่คนมักเข้าใจผิดเกี่ยวกับงานของคุณคืออะไร',
  'อะไรคือสัญญาณว่า “ถึงเวลาพัก” สำหรับคุณ',
  'ถ้าให้หยุดทำบางอย่างเพื่อได้ผลลัพธ์ดีขึ้น จะหยุดอะไร',
  'คำถามที่อยากถามคนในทีมเสมอเพื่อให้ทำงานร่วมกันดีขึ้นคืออะไร'
];

let deck = [];
let zIndexTop = 10;

const deckEl = document.getElementById('deck');
const tableEl = document.getElementById('table');
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const counterEl = document.getElementById('counter');
const deckCountEl = document.getElementById('deckCount');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateCounter() {
  counterEl.textContent = `เหลือ ${deck.length}/30`;
  deckCountEl.textContent = `${deck.length}`;
  drawBtn.disabled = deck.length === 0;
}

function buildDeckVisual(count) {
  deckEl.innerHTML = '';
  const layers = Math.min(count, 12); // จำกัดจำนวนเลเยอร์ที่มองเห็นเพื่อความเบา
  for (let i = 0; i < layers; i++) {
    const card = document.createElement('div');
    card.className = 'stack-card';
    const spread = 0.6; // px ต่อชั้น (เล็ก ๆ เพื่อดูเป็นกอง)
    card.style.transform = `translate(${(layers - i) * 0.8}px, ${(layers - i) * spread}px) rotate(${(i - layers / 2) * 0.2}deg)`;
    card.style.zIndex = String(i + 1);
    deckEl.appendChild(card);
  }
}

function createCardElement(text) {
  const card = document.createElement('div');
  card.className = 'playing-card interactive tilt is-flipped';
  card.style.zIndex = String(++zIndexTop);

  const inner = document.createElement('div');
  inner.className = 'card-inner';
  const back = document.createElement('div');
  back.className = 'card-face back';
  const backMark = document.createElement('div');
  backMark.className = 'card-back-mark';
  backMark.textContent = 'Q';
  back.appendChild(backMark);

  const front = document.createElement('div');
  front.className = 'card-face front';
  const q = document.createElement('div');
  q.className = 'question';
  q.textContent = text;
  front.appendChild(q);

  inner.appendChild(back);
  inner.appendChild(front);
  card.appendChild(inner);

  return card;
}

function getCenterPosition(targetEl, cardEl) {
  const t = targetEl.getBoundingClientRect();
  const c = cardEl.getBoundingClientRect();
  const x = t.left + t.width / 2 - c.width / 2;
  const y = t.top + t.height / 2 - c.height / 2;
  return { x, y };
}

function flyFromDeckToTable(card) {
  document.body.appendChild(card);
  const deckRect = deckEl.getBoundingClientRect();
  card.style.position = 'fixed';
  card.style.top = deckRect.top + deckRect.height / 2 + 'px';
  card.style.left = deckRect.left + deckRect.width / 2 + 'px';
  card.style.transform = 'translate(-50%, -50%)';

  // force reflow
  card.getBoundingClientRect();

  const tableRect = tableEl.getBoundingClientRect();
  const targetX = tableRect.left + tableRect.width / 2;
  const targetY = tableRect.top + tableRect.height / 2;

  card.style.transition = 'transform .5s ease, top .5s ease, left .5s ease, opacity .4s ease';
  card.style.left = targetX + 'px';
  card.style.top = targetY + 'px';
  card.style.opacity = '1';

  return new Promise(resolve => {
    card.addEventListener('transitionend', function handler() {
      card.removeEventListener('transitionend', handler);
      resolve();
    });
  });
}

function enableTilt(card) {
  const maxTilt = 10; // องศา
  function onMove(e) {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;
    card.style.setProperty('--rx', rx + 'deg');
    card.style.setProperty('--ry', ry + 'deg');
    card.style.setProperty('--scale', 1.02);
  }
  function onLeave() {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--scale', 1);
  }
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
}

function enableDrag(card) {
  let startX = 0, startY = 0, originX = 0, originY = 0;
  let dragging = false;
  card.style.position = 'absolute';
  card.style.transform = 'translate(-50%, -50%)';

  const tableRect = () => tableEl.getBoundingClientRect();

  function onPointerDown(e) {
    dragging = true;
    card.setPointerCapture(e.pointerId);
    const r = card.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    originX = r.left + r.width / 2;
    originY = r.top + r.height / 2;
    card.style.zIndex = String(++zIndexTop);
  }
  function onPointerMove(e) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const nx = originX + dx;
    const ny = originY + dy;
    // constrain within table area
    const tbl = tableRect();
    const minX = tbl.left; const maxX = tbl.right;
    const minY = tbl.top;  const maxY = tbl.bottom;
    const x = Math.min(Math.max(nx, minX), maxX);
    const y = Math.min(Math.max(ny, minY), maxY);
    card.style.left = x + 'px';
    card.style.top = y + 'px';
  }
  function onPointerUp(e) {
    dragging = false;
    card.releasePointerCapture(e.pointerId);
  }
  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerup', onPointerUp);
}

function mountOnTable(card) {
  // แปลงตำแหน่งจาก fixed → absolute ภายใน table
  const rect = card.getBoundingClientRect();
  const tbl = tableEl.getBoundingClientRect();
  const left = rect.left + rect.width / 2 - tbl.left;
  const top = rect.top + rect.height / 2 - tbl.top;
  card.style.position = 'absolute';
  card.style.left = left + 'px';
  card.style.top = top + 'px';
  tableEl.appendChild(card);
}

async function drawCard() {
  if (deck.length === 0) return;

  // สุ่มหยิบ 1 ใบจากข้อมูล
  const idx = Math.floor(Math.random() * deck.length);
  const [picked] = deck.splice(idx, 1);

  // สลับไพ่ที่เหลือ
  shuffle(deck);
  updateCounter();
  buildDeckVisual(deck.length);

  if (!INTERACTIVE) {
    // โหมดเรียบง่าย: แสดงการ์ดแบบนิ่งบนโต๊ะ
    tableEl.innerHTML = '';
    const simple = document.createElement('div');
    simple.className = 'simple-card';
    simple.innerHTML = `<div class="question">${picked}</div>`;
    tableEl.appendChild(simple);
    return;
  }

  // โหมด interactive: สร้างการ์ด, บินจากสำรับ ไปที่โต๊ะ แล้วพลิก
  const card = createCardElement(picked);
  await flyFromDeckToTable(card);
  card.classList.remove('is-flipped');
  mountOnTable(card);
  card.style.removeProperty('transform');
  card.style.removeProperty('transition');
  const tbl = tableEl.getBoundingClientRect();
  const jitter = () => (Math.random() - 0.5) * Math.min(80, tbl.width * 0.2);
  const curLeft = parseFloat(card.style.left || '0');
  const curTop = parseFloat(card.style.top || '0');
  card.style.left = curLeft + jitter() + 'px';
  card.style.top = curTop + jitter() + 'px';
  enableTilt(card);
  enableDrag(card);
  card.addEventListener('dblclick', () => card.classList.toggle('is-flipped'));
}

function resetDeck() {
  deck = shuffle([...QUESTIONS]);
  updateCounter();
  buildDeckVisual(deck.length);
  tableEl.innerHTML = '';
  drawBtn.disabled = false;
}

// events
drawBtn.addEventListener('click', drawCard);
resetBtn.addEventListener('click', resetDeck);

if (INTERACTIVE) {
  deckEl.addEventListener('click', drawCard);
  deckEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      drawCard();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat) {
      e.preventDefault();
      drawCard();
    }
  });
}

// initial
resetDeck();
