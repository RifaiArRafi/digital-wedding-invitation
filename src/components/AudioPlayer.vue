<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Volume2, VolumeX } from 'lucide-vue-next'

const isPlaying = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)

const AUDIO_SRC = '/audio/San Francisco Street.mp3'

const playAudio = async () => {
  if (!audioElement.value) {
    audioElement.value = new Audio(AUDIO_SRC)
    audioElement.value.loop = true
  }

  try {
    await audioElement.value.play()
    isPlaying.value = true
  } catch (err) {
    // Autoplay blocked by browser policy until user interacts
    isPlaying.value = false
  }
}

const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause()
  }
  isPlaying.value = false
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

  // Try auto play on load
  playAudio()

  // Start on first user tap / click anywhere (envelope modal button, etc.)
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
})
</script>

<template>
  <div class="audio-control-wrapper">
    <button 
      class="audio-btn" 
      :class="{ 'is-active': isPlaying }" 
      @click="toggleAudio"
      :title="isPlaying ? 'Pause Music' : 'Play Music'"
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
