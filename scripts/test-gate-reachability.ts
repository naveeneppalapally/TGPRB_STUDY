/**
 * Test #gate and #current-affairs reachability under short content
 */

const viewportHeight = 900;
const activeZone = { top: 80, bottom: 315 }; // [80, 0.35 * 900]

function testShortTail(gateHeight: number, caHeight: number, footerHeight: number) {
  const contentBelowGateTop = gateHeight + caHeight + footerHeight;
  // At maximum scroll (bottom of page reached):
  // documentHeight - scrollY = viewportHeight
  // gate.top - scrollY = viewportHeight - contentBelowGateTop
  const gateViewportTopAtMaxScroll = viewportHeight - contentBelowGateTop;
  const caViewportTopAtMaxScroll = viewportHeight - (caHeight + footerHeight);

  const gateCanReachActiveZone = gateViewportTopAtMaxScroll <= activeZone.bottom;
  const caCanReachActiveZone = caViewportTopAtMaxScroll <= activeZone.bottom;

  // Sentinel check on ca (threshold 0.2):
  const caVisible = Math.max(0, Math.min(caViewportTopAtMaxScroll + caHeight, viewportHeight) - Math.max(caViewportTopAtMaxScroll, 0));
  const caSentinelFires = (caVisible / caHeight) >= 0.2;

  console.log(`Config: Gate=${gateHeight}px, CA=${caHeight}px, Footer=${footerHeight}px (Tail=${contentBelowGateTop}px):`);
  console.log(`  Gate Viewport Top at max scroll: ${gateViewportTopAtMaxScroll}px (Active band ceiling: ${activeZone.bottom}px) -> Can reach active zone: ${gateCanReachActiveZone ? 'YES' : 'NO (BLOCKED)'}`);
  console.log(`  CA Viewport Top at max scroll:   ${caViewportTopAtMaxScroll}px -> Sentinel fires: ${caSentinelFires ? 'YES' : 'NO'}`);
}

console.log('--- Test Gate Reachability Cases ---');
testShortTail(450, 350, 200); // Standard note
testShortTail(300, 150, 80);  // Compact note (Tier 2 note with short CA and compact footer)
testShortTail(250, 100, 50);  // Very compact note
