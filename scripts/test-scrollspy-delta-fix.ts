/**
 * Test IntersectionObserver Delta State Tracking Fix
 */

interface Section {
  id: string;
  top: number;
  height: number;
}

const sections: Section[] = [
  { id: 'sec-1', top: 100, height: 600 },
  { id: 'sec-2', top: 740, height: 800 },
  { id: 'sec-3', top: 1580, height: 1000 },
];

const activeZone = { top: 80, bottom: 315 };

function isElementIntersecting(sec: Section, scrollY: number): boolean {
  const elTop = sec.top - scrollY;
  const elBottom = elTop + sec.height;
  return elTop <= activeZone.bottom && elBottom >= activeZone.top;
}

// Simulate scrolling up: scroll from 1400 down to 700
console.log('--- Simulating scroll up without state map (Naive entries filter) vs with state map ---');

let naiveActiveId = 'sec-3';
let robustActiveId = 'sec-3';
const stateMap = new Map<string, boolean>();

// Previous scroll position: scrollY = 1400 (sec-2 and sec-3 are intersecting)
stateMap.set('sec-1', false);
stateMap.set('sec-2', true);
stateMap.set('sec-3', true);

// User scrolls to scrollY = 1200: sec-3 exits active zone (elTop = 1580 - 1200 = 380 > 315).
// sec-2 is still in active zone (elTop = 740 - 1200 = -460, elBottom = 340 >= 80).
// IntersectionObserver callback receives ONLY sec-3 because only sec-3 changed!
const deltaEntries = [
  { id: 'sec-3', isIntersecting: false, top: 380 }
];

// 1. Naive implementation:
const visibleNaive = deltaEntries.filter(e => e.isIntersecting);
if (visibleNaive.length > 0) {
  naiveActiveId = visibleNaive[0].id;
}
console.log(`Naive Active ID after sec-3 leaves: "${naiveActiveId}" (BUG: Stuck on sec-3!)`);

// 2. Robust implementation with State Map:
deltaEntries.forEach(e => stateMap.set(e.id, e.isIntersecting));
const firstIntersecting = sections.find(s => stateMap.get(s.id));
if (firstIntersecting) {
  robustActiveId = firstIntersecting.id;
}
console.log(`Robust Active ID after sec-3 leaves: "${robustActiveId}" (CORRECT: Transitioned to sec-2!)`);
