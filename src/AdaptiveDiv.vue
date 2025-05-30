<template>
  <div ref="root" class="__adaptive-div">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const root = ref<HTMLElement>();
let observer: ResizeObserver;
const emit = defineEmits(['update:width', 'update:height', 'update:square']);

onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    emit('update:width', entry.contentRect.width);
    emit('update:height', entry.contentRect.height);
    emit('update:square', entry.contentRect.width * entry.contentRect.height);
  });
  observer.observe(root.value!, { box: 'device-pixel-content-box' });
});

onUnmounted(() => {
  observer.disconnect();
});
</script>
