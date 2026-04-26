<template>
  <div class="nav-container">
    <div class="nav-bar">
      <div class="segments-wrapper">
        <div
          v-for="(res, i) in results"
          :key="i"
          class="segment"
          :style="{
            background: res === null ? 'transparent' : '#6bff2f',
          }"
        ></div>
      </div>
    </div>
    <div class="nav-markers">
      <div class="marker" v-for="n in results.length + 1" :key="n"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  results: (boolean | null)[]
}>()

const answeredCount = computed(() => {
  return props.results.filter((r) => r !== null).length
})

const total = computed(() => props.results.length)

const fillWidth = computed(() => {
  return answeredCount.value === 0 ? '0%' : `${(answeredCount.value / total.value) * 100}%`
})
</script>

<style scoped>
.nav-container {
  width: 940px;
  margin: 0 auto 40px;
}

.nav-bar {
  margin-top: 15px;
  height: 6px;
  background: #0096ec;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.segments-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}

.segment {
  flex: 1;
  height: 100%;
  transition: background 0.3s ease;
}

.nav-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(fillWidth);
  height: 100%;
  background: #6bff2f;
  border-radius: 10px 0 0 10px;
  transition: width 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

.nav-markers {
  display: flex;
  justify-content: space-between;
}

.marker {
  width: 2px;
  height: 12px;
  background: #0096ec;
}
</style>
