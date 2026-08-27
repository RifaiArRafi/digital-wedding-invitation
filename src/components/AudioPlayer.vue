<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Volume2, VolumeX } from 'lucide-vue-next'

const isPlaying = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)

let audioCtx: AudioContext | null = null
let melodyTimer: number | null = null

// Gentle romantic piano / harp synthesizer as fallback
const notes: Record<string, number> = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99, 'A5': 880.00
}

const melody = [
  { note: 'E4', dur: 1.4 }, { note: 'G4', dur: 1.4 }, { note: 'C5', dur: 2.0 },
  { note: 'B4', dur: 1.4 }, { note: 'G4', dur: 1.4 }, { note: 'E4', dur: 2.0 },
  { note: 'A4', dur: 1.4 }, { note: 'C5', dur: 1.4 }, { note: 'E5', dur: 2.4 },
  { note: 'G4', dur: 1.4 }, { note: 'B4', dur: 1.4 }, { note: 'D5', dur: 2.4 },
]

let step = 0

const playChime = (freq: number, duration: number) => {
  if (!audioCtx) return
  try {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (e) {
    console.error(e)
  }
}

const scheduleNextNote = () => {
  if (!isPlaying.value) return
  const current = melody[step % melody.length]
  const freq = notes[current.note] || 440
  playChime(freq, current.dur)
  step++
  melodyTimer = window.setTimeout(scheduleNextNote, 1200)
}

const playSynthFallback = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  scheduleNextNote()
}

const AUDIO_SRC = '/audio/Nadhif%20Basalamah%20-%20bergema%20sampai%20selamanya%20Official%20Lyric%20Video.mp3'

const playAudio = () => {
  if (!audioElement.value) {
    audioElement.value = new Audio(AUDIO_SRC)
    audioElement.value.loop = true
  }

  isPlaying.value = true
  audioElement.value.play().catch(() => {
    // If browser blocks or file error, fallback
    playSynthFallback()
  })
}

const pauseAudio = () => {
  isPlaying.value = false
  if (audioElement.value) {
    audioElement.value.pause()
  }
  if (melodyTimer) clearTimeout(melodyTimer)
}

const toggleAudio = () => {
  if (isPlaying.value) {
    pauseAudio()
  } else {
    playAudio()
  }
}

const handleFirstUserInteraction = () => {
  if (!isPlaying.value) {
    playAudio()
  }
  window.removeEventListener('click', handleFirstUserInteraction)
  window.removeEventListener('touchstart', handleFirstUserInteraction)
}

onMounted(() => {
  audioElement.value = new Audio(AUDIO_SRC)
  audioElement.value.loop = true

  // Try auto play immediately
  playAudio()

  // Fallback on first interaction (click / touch anywhere on envelope or page)
  window.addEventListener('click', handleFirstUserInteraction, { once: true })
  window.addEventListener('touchstart', handleFirstUserInteraction, { once: true })
})

onUnmounted(() => {
  window.removeEventListener('click', handleFirstUserInteraction)
  window.removeEventListener('touchstart', handleFirstUserInteraction)
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
  if (melodyTimer) clearTimeout(melodyTimer)
  if (audioCtx) audioCtx.close()
})
</script>

<template>
  <div class="audio-control-wrapper">
    <button 
      class="audio-btn" 
      :class="{ 'is-active': isPlaying }" 
      @click="toggleAudio"
      :title="isPlaying ? 'Pause Music' : 'Play Romantic Music'"
      aria-label="Toggle Romantic Background Audio"
    >
      <div class="icon-box">
        <component :is="isPlaying ? Volume2 : VolumeX" :size="15" />
      </div>
      <span class="audio-label">{{ isPlaying ? 'MUSIC ON' : 'PLAY MUSIC' }}</span>
      <div v-if="isPlaying" class="sound-waves">
        <span></span><span></span><span></span>
      </div>
    </button>
  </div>
</template>

<style scoped>
.audio-control-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 90;
}

.audio-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(20, 20, 20, 0.92);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 14px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.audio-btn:hover {
  background: #000000;
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.icon-box {
  display: flex;
  align-items: center;
}

.audio-label {
  font-family: var(--font-sans);
  font-size: 8.5px;
  font-weight: 500;
  letter-spacing: 0.16em;
}

.sound-waves {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 12px;
}

.sound-waves span {
  width: 2px;
  background: #c4a47c;
  animation: wave 1s infinite ease-in-out;
}

.sound-waves span:nth-child(1) { height: 6px; animation-delay: 0.1s; }
.sound-waves span:nth-child(2) { height: 12px; animation-delay: 0.3s; }
.sound-waves span:nth-child(3) { height: 8px; animation-delay: 0.2s; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}
</style>
