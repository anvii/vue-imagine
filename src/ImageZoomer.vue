<template>
  <div ref="root" class="__image-zoom" :style="`--sx: ${scrollX}px; --sy: ${scrollY}px; --zoom: ${zoom};`"
    @dragstart.prevent="false" @mousedown.left="onMouseButton(true)" @mouseup.left="onMouseButton(false)"
    @mouseleave="onMouseButton(false)" @mousemove="onMouseMove" @wheel.prevent="onWheel" @click="onClick"
    @touchstart.prevent="onTouchStart" @touchend.prevent="onTouchEnd" @touchcancel.prevent="onTouchEnd" @touchmove.prevent="onTouchMove">
    <div ref="inner" class="__image-zoom-inner" :style="`transition: ${transition};`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.__image-zoom {
  display: flex;
  overflow: hidden;
  position: relative;
}

.__image-zoom-inner {
  min-width: 100%;
  min-height: 100%;
  translate: calc(var(--zoom) * 50% - 50% - var(--sx)) calc(var(--zoom) * 50% - 50% - var(--sy));
  scale: var(--zoom);
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Point {
  x: number,
  y: number,
};

interface Props {
  minZoom?: number,
  maxZoom?: number,
  zoomFactor?: number,
  transition?: string,
};

const zoom = defineModel<number>('zoom', { default: 1 });
const scrollX = defineModel<number>('scrollX', { default: 0 });
const scrollY = defineModel<number>('scrollY', { default: 0 });

const { minZoom = 0.1, maxZoom = 10, zoomFactor = 1.1, transition = 'none' } = defineProps<Props>();

const scrollBounds = computed(() => {
  const child = <HTMLElement>inner.value.children[0];

  const { cw, ch } = { cw: child.offsetWidth * zoom.value, ch: child.offsetHeight * zoom.value };
  const { rw, rh } = { rw: root.value.clientWidth, rh: root.value.clientHeight };
  const bounds = {
    left: Math.min(cw - rw, 0),
    top: Math.min(ch - rh, 0),
    right: Math.max(cw - rw, 0),
    bottom: Math.max(ch - rh, 0),
  };

  // Smaller clients must be aligned to the center
  if (cw < rw) {
    bounds.left = bounds.right = (cw - rw) / 2;
  }
  if (ch < rh) {
    bounds.top = bounds.bottom = (ch - rh) / 2;
  }

  return bounds;
});


const root = ref(<HTMLElement>{});
const inner = ref(<HTMLElement>{});

// Mouse left button
let mouseDown = false;
let clickDisabled = false;

// Touch position
const touches: { [identifier: number]: Point } = {};
const touches0: { [identifier: number]: Point } = {};

// Watch values to keep content inside view box
watch(zoom, value => {
  clampZoom(value);
  clampScrollX(scrollX.value);
  clampScrollY(scrollY.value);
});
watch(scrollX, value => {
  clampScrollX(value);
});
watch(scrollY, value => {
  clampScrollY(value);
});

/**
 * Pin value within min and max values
 *
 * @param value
 * @param minValue
 * @param maxValue
 */
function clamp(value: number, minValue: number, maxValue: number): number {
  return Math.max(Math.min(value, maxValue), minValue);
}

function clampScrollX(value: number) {
  scrollX.value = clamp(value, scrollBounds.value.left, scrollBounds.value.right);
}

function clampScrollY(value: number) {
  scrollY.value = clamp(value, scrollBounds.value.top, scrollBounds.value.bottom);
}

function clampZoom(value: number) {
  zoom.value = clamp(value, minZoom, maxZoom);
}

/**
 * Translate screen coordinate to client coordinate
 *
 * @param x
 * @param y
 */
function toClient(x: number, y: number) {
  const rect = root.value.getBoundingClientRect();
  return {
    x: x - Math.round(rect.left),
    y: y - Math.round(rect.top),
  };
}

/**
 * Translate client coordinates to image coordinates
 *
 * @param x
 * @param y
 * @param azoom
 * @returns Coordinate
 */
function scale(x: number, y: number, azoom?: number): Point {
  azoom ??= zoom.value;
  return {
    x: (x + scrollX.value) / azoom,
    y: (y + scrollY.value) / azoom,
  };
}

/**
 * Translate image coordinates to client coordinates
 *
 * @param x
 * @param y
 * @param azoom
 * @returns Point
 */
function unscale(x: number, y: number, azoom?: number): Point {
  azoom ??= zoom.value;
  return {
    x: x * azoom - scrollX.value,
    y: y * azoom - scrollY.value,
  };
}

function zoomIn(x: number | undefined, y: number | undefined) {
  setZoom(zoom.value * zoomFactor, x, y);
}

function zoomOut(x: number | undefined, y: number | undefined) {
  setZoom(zoom.value / zoomFactor, x, y);
}

/**
 * Set new zoom value and save content position under mouse pointer
 *
 * @param newZoom
 * @param x X coordinate of zooming center
 * @param y Y coordinate of zooming center
 */
function setZoom(newZoom: number, x?: number, y?: number) {

  x ??= root.value.clientWidth / 2;
  y ??= root.value.clientHeight / 2;

  newZoom = clamp(newZoom, minZoom, maxZoom);
  const s2p = scale(x, y);
  const p2s = unscale(s2p.x, s2p.y, newZoom);

  zoom.value = newZoom;
  scrollX.value -= x - p2s.x;
  scrollY.value -= y - p2s.y;
}

/**
 * MouseMove handler
 *
 * @param e MouseEvent
 */
function onMouseMove(e: MouseEvent) {
  if (mouseDown) {
    scrollX.value = clamp(scrollX.value - e.movementX, scrollBounds.value.left, scrollBounds.value.right);
    scrollY.value = clamp(scrollY.value - e.movementY, scrollBounds.value.top, scrollBounds.value.bottom);
    clickDisabled = true;
  }
}

/**
 * Set flag when mleft mouse button is pressed
 *
 * @param down
 */
function onMouseButton(down: boolean) {
  mouseDown = down;
}

/**
 * Disable click propargation when mouse is moved with pressed button
 *
 * @param e MouseEvent
 */
function onClick(e: MouseEvent) {
  if (clickDisabled) {
    clickDisabled = false;
    e.stopPropagation();
  }
}

/**
 * Mouse wheel handler
 *
 * @param e WheelEvent
 */
function onWheel(e: WheelEvent) {
  const { x, y } = toClient(e.clientX, e.clientY);
  if (e.deltaY < 0) {
    zoomIn(x, y);
  }
  else if (e.deltaY > 0) {
    zoomOut(x, y);
  }
}

function onTouchStart(e: TouchEvent) {
  for (const touch of e.changedTouches) {
    const { identifier, clientX, clientY } = touch;
    touches[identifier] = toClient(clientX, clientY);
    touches0[identifier] = { ...touches[identifier] };
  }
}

function onTouchEnd(e: TouchEvent) {
  for (const touch of e.changedTouches) {
    delete touches[touch.identifier];
    delete touches0[touch.identifier];
  }
}

function onTouchMove(e: TouchEvent) {

  for (const touch of e.changedTouches) {
    const { identifier, clientX, clientY } = touch;
    touches[identifier] = toClient(clientX, clientY);
  }

  // Move
  if (true || Object.keys(touches).length == 1) {
    const id = parseInt(Object.keys(touches)[0]);
    const dx = touches[id].x - touches0[id].x;
    const dy = touches[id].y - touches0[id].y;

    scrollX.value -= dx;
    scrollY.value -= dy;
  }

  // Zoom
  if (Object.keys(touches).length == 2) {
    const id0 = parseInt(Object.keys(touches)[0]);
    const id1 = parseInt(Object.keys(touches)[1]);

    // Calculate distance between two touches
    const dx0 = distance(touches0[id0], touches0[id1]);     // previous
    const dx1 = distance(touches[id0], touches[id1]);       // current

    const cx = touches[id0].x;
    const cy = touches[id0].y;

    setZoom(zoom.value * dx1 / dx0, cx, cy);
  }

  for (const identifier in touches) {
    touches0[identifier] = { ...touches[identifier] };
  }
}

/**
 * Calculate a distance between two points
 *
 * @param p1
 * @param p2
 */
function distance(p1: Point, p2: Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

/**
 * Fit content into client rect
 *
 * @param mode 'contain' | 'cover'
 */
function fit(mode: 'contain' | 'cover') {
  const child = <HTMLElement>inner.value.children[0];

  const zx = root.value.clientWidth / child.offsetWidth;
  const zy = root.value.clientHeight / child.offsetHeight;

  let z: number = zoom.value;
  if (mode == 'contain') {
    z = Math.min(zx, zy);
  }
  else if (mode == 'cover') {
    z = Math.max(zx, zy);
  }
  else {
    console.error('Invalid fit mode. Possible modes are: contain, cover');
    return;
  }

  zoom.value = z;

  const sx = (root.value.clientWidth - child.offsetWidth * z) / 2;
  const sy = (root.value.clientHeight - child.offsetHeight * z) / 2;
  scrollX.value = clamp(-sx, scrollBounds.value.left, scrollBounds.value.right);
  scrollY.value = clamp(-sy, scrollBounds.value.top, scrollBounds.value.bottom);
}

defineExpose({
  zoomIn,
  zoomOut,
  toClient,
  scale,
  unscale,
  fit,
});

</script>
