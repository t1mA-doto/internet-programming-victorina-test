<template>
  <img
    src="../components/IMGS/btn.png"
    class="next-btn"
    :class="{ visible: selected !== null }"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  selected: number | null
}>()

const emit = defineEmits(['next-question'])

function handleClick() {
  if (props.selected !== null) {
    emit('next-question')
  }
}
</script>

<style scoped>
.next-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 82px;
  height: 82px;
  cursor: pointer;
  visibility: hidden;
}

.next-btn.visible {
  visibility: visible;
  opacity: 1;
}

.next-btn:hover {
  transform: scale(1.1);
}
</style>
