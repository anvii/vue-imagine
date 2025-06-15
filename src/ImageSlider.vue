<template>
  <div ref="root" class="__image-slider" :style="`--slide-index: ${slideIndex}; --slide-scroll: ${slideScroll}px;`"
    @mousedown.left="onMouseButton(true)" @mouseup.left="onMouseButton(false)" @mouseleave="onMouseButton(false)"
    @mousemove="onMouseMove" @click="onClick" @touchstart.prevent="dragStart" @touchmove.prevent="dragMove" @touchend.prevent="dragEnd"
    @touchcancel.prevent="dragEnd" @dragstart.prevent="false">
    <div ref="container" class="__container" :style="`transition: ${mouseDown ? 'none' : transition};`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.__image-slider {
  overflow: hidden;
  position: relative;
}

.__container {
  display: flex;
  flex-wrap: nowrap;
  gap: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  translate: calc(var(--slide-index) * -100% + var(--slide-scroll));
}

:deep(.__container > *) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  flex: 1 0 auto;
}
</style>


<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  disabled?: boolean,
  transition?: string,
  threshold?: number,
};

const root = ref<HTMLElement>();
const container = ref<HTMLElement>();
const slideIndex = defineModel<number>({ default: 0 });
const { disabled = false, transition = 'none', threshold = 0.15 } = defineProps<Props>();

const slideScroll = ref(0);
let mouseDown = false;
let clickDisabled = false;
let dragX = 0;

watch(slideIndex, (newValue) => {
  slideIndex.value = clamp(newValue, 0, container.value!.childElementCount - 1);
  slideScroll.value = 0;
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

function next() {
  if (!disabled) {
    slideIndex.value++;
  }
}

function prev() {
  if (!disabled) {
    slideIndex.value--;
  }
}

function finishSlide() {
  const w = root.value!.clientWidth;
  if (slideScroll.value >= w * threshold) {
    prev();
  }
  else if (slideScroll.value <= -w * threshold) {
    next();
  }
  slideScroll.value = 0;
}

/**
 * Set flag when left mouse button is pressed
 *
 * @param down
 */
function onMouseButton(down: boolean) {
  mouseDown = down;
  if (!down) {
    finishSlide();
  }
}

function onMouseMove(e: MouseEvent) {
  if (mouseDown && !disabled) {
    slideScroll.value += e.movementX;
    clickDisabled = true;
  }
}

/**
 * Disable click propargation when mouse is moved with pressed button
 *
 * @param e MouseEvent
 */
function onClick(e: MouseEvent) {
  if (clickDisabled) {
    e.stopPropagation();
    clickDisabled = false;
  }
}

function dragStart(e: TouchEvent) {
  dragX = e.touches[0].clientX;
  mouseDown = true;
}

function dragEnd() {
  finishSlide();
  dragX = 0;
  mouseDown = false;
}

function dragMove(e: TouchEvent) {
  if (!disabled) {
    slideScroll.value = e.touches[0].clientX - dragX;
  }
}

defineExpose({
  next,
  prev,
});
</script>
