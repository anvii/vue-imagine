<template>
  <ImageZoomer ref="zoomer" transition="all 0.05s ease" class="red-border">
    <div style="max-width: 600px;">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
        magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
        assumenda consectetur culpa fuga nulla ullam. In, libero.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
        magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
        assumenda consectetur culpa fuga nulla ullam. In, libero.
      </p>
    </div>
  </ImageZoomer>
</template>

<script>
import ImageZoomer from '@/ImageZoomer.vue';

export default {
  components: { ImageZoomer },
}
</script>
