<script setup lang="ts">
import { ref, computed } from 'vue'
import AnswersComponent from './components/AnswersComponent.vue'
import QuestionComponent from './components/QuestionComponent.vue'
import NavigationComponent from './components/NavigationComponent.vue'
import NextComponent from './components/NextComponent.vue'
import data from './components/data.json'
import flLeft from './components/IMGS/fl-left.png'
import flRight from './components/IMGS/fl-right.png'

const currentIndex = ref(0)
const results = ref<(boolean | null)[]>(Array(data.length).fill(null))
const correctCount = computed(() => {
  return results.value.filter((r) => r === true).length
})
const selectedAnswer = ref<number | null>(null)

function handleAnswer(isCorrect: boolean, selectedIndex: number) {
  results.value[currentIndex.value] = isCorrect
  selectedAnswer.value = selectedIndex
}

function nextQuestion() {
  if (currentIndex.value < data.length - 1) {
    currentIndex.value++
    selectedAnswer.value = null
  } else {
    currentIndex.value++
  }
}
</script>

<template>
  <div class="main">
    <img :src="flLeft" class="bgd left" />
    <img :src="flRight" class="bgd right" />
    <div class="panel">
      <div class="innerPanel">
        <div class="dblinnerPanel">
          <template v-if="currentIndex < data.length">
            <NavigationComponent :results="results" />
            <QuestionComponent :question="data[currentIndex]!.question" />
            <div class="otvety">
              <AnswersComponent
                :answers="data[currentIndex]!.answers"
                :correct="data[currentIndex]!.correct"
                @answered="handleAnswer"
              />
              <NextComponent :selected="selectedAnswer" @next-question="nextQuestion" />
            </div>
          </template>
          <template v-else>
            <div class="result">Количество правильных ответов: {{ correctCount }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #2e015c;
}

.main {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  position: relative;
  width: 1104px;
  height: 822px;
  box-sizing: border-box;
  background: linear-gradient(261.38deg, #0060d9 18.47%, #004193 93.48%);
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.innerPanel {
  position: absolute;
  width: 1095px;
  height: 813px;
  left: 0px;
  top: 0px;
  background: linear-gradient(37.63deg, #2b62d5 5.17%, #15aaff 59.05%);
  border-radius: 51px;
}

.dblinnerPanel {
  position: absolute;
  width: 1095px;
  height: 813px;
  left: 0px;
  top: 0px;
  background: linear-gradient(
    241.84deg,
    #003dce -3.61%,
    rgba(21, 170, 255, 0) 48.73%,
    rgba(20, 164, 252, 0.0598291) 48.74%,
    #003dce 95.39%
  );
  border-radius: 51px;
  display: flex;
  flex-direction: column;
}

.left {
  position: absolute;
  width: 467px;
  height: 569.85px;
  left: 136px;
  top: 362.13px;
}

.right {
  position: absolute;
  width: 455.98px;
  height: 495px;
  left: 1287px;
  top: 11px;
}

.otvety {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  gap: 20px;
}

.result {
  max-width: 589px;
  margin: 0 auto;
  margin-top: 84px;
  font-family: 'PT Sans Caption', sans-serif;
  font-size: 22px;
  line-height: 40px;
  text-align: center;
  color: white;
}
</style>
