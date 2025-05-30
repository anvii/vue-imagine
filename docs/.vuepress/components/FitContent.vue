<template>
  <ImageZoomer ref="zoomer" class="red-border"
    :zoom="0.5"
    :minZoom="0.2"
    :maxZoom="1"
    transition="all 0.3s ease">
    <img src="/images/cat.jpg?url" alt="" />
  </ImageZoomer>
  
  <div class="controls">
    <button @click="$refs.zoomer.zoomIn()">Zoom In</button>
    <button @click="$refs.zoomer.zoomOut()">Zoom Out</button>
    <button @click="$refs.zoomer.fit('contain')">Contain</button>
    <button @click="$refs.zoomer.fit('cover')">Cover</button>
  </div>
</template>

<script lang="js">
  import ImageZoomer from '@/ImageZoomer.vue';
  import './style.css';

  export default {
    components: { ImageZoomer },
  }
</script>
