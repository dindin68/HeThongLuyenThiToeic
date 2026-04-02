<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const vocabs = ref([])

onMounted(async () => {
  try {
    // Gọi API từ Backend của con (nhớ bật backend cổng 5000 nha)
    const res = await axios.get('http://localhost:5000/api/learning/vocab/Contracts')
    vocabs.value = res.data
  } catch (err) {
    console.error("Lỗi kết nối Backend rồi con ơi!", err)
  }
})

const playAudio = (url) => {
  new Audio(url).play()
}
const isQuizMode = ref(false) // Để chuyển đổi giữa xem danh sách và làm bài tập
const currentQuestion = ref(0)
const score = ref(0)
const showResult = ref(false)

// Hàm trộn ngẫu nhiên đáp án cho vui
const getOptions = (correctMeaning) => {
  const wrongOptions = vocabs.value
    .filter(v => v.meaning !== correctMeaning)
    .map(v => v.meaning)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
  return [...wrongOptions, correctMeaning].sort(() => 0.5 - Math.random())
}

const checkAnswer = (selected, correct) => {
  if (selected === correct) score.value++
  if (currentQuestion.value < vocabs.value.length - 1) {
    currentQuestion.value++
  } else {
    showResult.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-10 font-sans text-slate-900">
    <div class="max-w-6xl mx-auto">

      <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-5xl font-black text-slate-800 tracking-tighter uppercase">
            TOEIC <span class="text-emerald-500">600</span>
          </h1>
          <p class="text-slate-500 font-bold mt-1 flex items-center gap-2">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            Unit 1: Contracts • {{ vocabs.length }} từ vựng
          </p>
        </div>

        <button @click="isQuizMode = !isQuizMode"
          class="group relative px-8 py-4 bg-white rounded-2xl font-black shadow-[0_10px_0_0_#e2e8f0] active:shadow-none active:translate-y-[10px] transition-all border-2 border-slate-200 overflow-hidden">
          <span class="relative z-10 flex items-center gap-2"
            :class="isQuizMode ? 'text-orange-500' : 'text-emerald-600'">
            {{ isQuizMode ? '← XEM DANH SÁCH' : '🔥 LUYỆN TẬP NGAY' }}
          </span>
        </button>
      </header>

      <hr class="border-slate-200 mb-10" />

      <div v-if="!isQuizMode" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in vocabs" :key="item._id"
          class="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-200 p-6 transition-all duration-500 transform hover:-translate-y-2 group">

          <div class="relative overflow-hidden rounded-[1.5rem] mb-6 shadow-inner bg-slate-100">
            <img :src="item.imgVocabUrl"
              class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm">
              <span class="text-[10px] font-black text-emerald-600 uppercase">{{ item.wordType }}</span>
            </div>
          </div>

          <div class="space-y-2 px-2">
            <h2 class="text-3xl font-black text-slate-800 tracking-tight">{{ item.word }}</h2>
            <div class="flex items-center gap-3">
              <p class="text-orange-500 font-bold italic">{{ item.pronunciation }}</p>
              <button @click="playAudio(item.audioVocabUrl)"
                class="text-emerald-500 hover:scale-125 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>
            <p class="text-2xl font-black text-slate-700 leading-tight">{{ item.meaning }}</p>
          </div>

          <div class="mt-6 p-5 bg-emerald-50/50 rounded-3xl border-2 border-dashed border-emerald-200">
            <p class="text-sm font-bold text-emerald-800 italic">"{{ item.example }}"</p>
            <p class="text-xs text-emerald-600 mt-2 font-medium opacity-80">👉 {{ item.exampleMeaning }}</p>
          </div>
        </div>
      </div>

      <div v-else class="max-w-3xl mx-auto py-10">
        <div v-if="!showResult && vocabs.length > 0"
          class="bg-white p-10 rounded-[3.5rem] shadow-2xl border-b-[12px] border-orange-200 relative overflow-hidden">

          <div class="absolute top-0 left-0 h-2 bg-orange-400 transition-all duration-500"
            :style="{ width: ((currentQuestion + 1) / vocabs.length) * 100 + '%' }"></div>

          <div class="flex justify-between items-center mb-8">
            <span class="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black uppercase">Level 1:
              Vocabulary</span>
            <span class="text-slate-400 font-black">{{ currentQuestion + 1 }} / {{ vocabs.length }}</span>
          </div>

          <h2 class="text-sm font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Từ này nghĩa là gì?
          </h2>
          <p class="text-5xl font-black text-slate-800 mb-10 text-center tracking-tighter italic">"{{
            vocabs[currentQuestion].word }}"</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="opt in getOptions(vocabs[currentQuestion].meaning)" :key="opt"
              @click="checkAnswer(opt, vocabs[currentQuestion].meaning)"
              class="group py-5 px-8 bg-slate-50 hover:bg-orange-500 hover:text-white rounded-[2rem] font-black text-lg transition-all border-2 border-slate-100 hover:border-orange-400 shadow-sm flex items-center justify-between">
              <span>{{ opt }}</span>
              <span class="opacity-0 group-hover:opacity-100 transition-opacity">➜</span>
            </button>
          </div>
        </div>

        <div v-else-if="showResult"
          class="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[12px] border-emerald-200">
          <div
            class="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🎉</div>
          <h2 class="text-5xl font-black text-slate-800 mb-2">XUẤT SẮC!</h2>
          <p class="text-xl font-bold text-slate-500 mb-8">Con đã hoàn thành bài luyện tập Unit 1</p>

          <div class="bg-slate-50 rounded-3xl p-8 mb-10 inline-block min-w-[250px]">
            <p class="text-slate-400 font-black uppercase text-xs tracking-widest mb-1">Điểm số của con</p>
            <p class="text-7xl font-black text-emerald-500">{{ score }}<span class="text-2xl text-slate-300">/{{
              vocabs.length }}</span></p>
          </div>

          <br />
          <button @click="isQuizMode = false; showResult = false; currentQuestion = 0; score = 0"
            class="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase hover:scale-105 transition-transform shadow-xl">
            Tiếp tục học từ mới
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
/* Đảm bảo Tailwind được import vào đây nếu style.css chưa ăn */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  background-color: #f1f5f9;
}
</style>
