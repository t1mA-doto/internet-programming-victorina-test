<template>
  <div class="answers">
    <img
      v-for="(img, index) in props.answers"
      :key="index"
      :src="img"
      :class="{
        correct: selected !== null && index === props.correct,
        incorrect: selected !== null && index === selected && selected !== props.correct,
      }"
      @click="selectAnswer(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  answers: string[]
  correct: number
}>()

const emit = defineEmits(['answered'])

const selected = ref<number | null>(null)

function selectAnswer(index: number) {
  if (selected.value === null) {
    selected.value = index
    emit('answered', index === props.correct, index)
  }
}

watch(
  () => props.answers,
  () => {
    selected.value = null
  },
)
</script>

<style scoped>
.answers {
  display: flex;
  justify-content: center;
  gap: 53px;
}

.answers img {
  width: 200px;
  height: 257px;
  object-fit: cover;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.answers img:hover {
  transform: scale(1.1);
}

.answers img.correct {
  outline: 4px solid #00ff00;
  outline-offset: -4px;
}

.answers img.incorrect {
  outline: 4px solid #ff0000;
  outline-offset: -4px;
}
</style>
