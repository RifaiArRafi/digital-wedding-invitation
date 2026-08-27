<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2026-09-05T16:00:00')

const days = ref('000')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

let intervalId: number | null = null

const updateCountdown = () => {
  const now = new Date().getTime()
  const diff = targetDate.getTime() - now

  if (diff <= 0) {
    days.value = '00'
    hours.value = '00'
    minutes.value = '00'
    seconds.value = '00'
    return
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((diff % (1000 * 60)) / 1000)

  days.value = d.toString().padStart(2, '0')
  hours.value = h.toString().padStart(2, '0')
  minutes.value = m.toString().padStart(2, '0')
  seconds.value = s.toString().padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  intervalId = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section id="countdown" class="countdown-section">
    <!-- Floral Moody Background Image -->
    <div class="countdown-bg"></div>

    <div class="container countdown-content">
      <p class="countdown-eyebrow">LET THE COUNTDOWN BEGIN</p>

      <div class="countdown-grid">
        <div class="countdown-unit">
          <span class="unit-number">{{ days }}</span>
          <span class="unit-label">DAYS</span>
        </div>

        <div class="countdown-unit">
          <span class="unit-number">{{ hours }}</span>
          <span class="unit-label">HOURS</span>
        </div>

        <div class="countdown-unit">
          <span class="unit-number">{{ minutes }}</span>
          <span class="unit-label">MINUTES</span>
        </div>

        <div class="countdown-unit">
          <span class="unit-number">{{ seconds }}</span>
          <span class="unit-label">SECONDS</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.countdown-section {
  position: relative;
  background-color: #121212;
  color: #ffffff;
  padding: 120px 0 130px;
  overflow: hidden;
  text-align: center;
}

.countdown-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center bottom;
  filter: grayscale(100%) brightness(0.38) contrast(130%);
  opacity: 1;
  pointer-events: none;
}

.countdown-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-eyebrow {
  font-family: var(--font-sans);
  font-size: 9.5px;
  letter-spacing: 0.28em;
  color: #9e9e9e;
  text-transform: uppercase;
  margin-bottom: 42px;
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 6vw, 68px);
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.unit-number {
  font-family: var(--font-serif);
  font-size: clamp(42px, 7vw, 76px);
  font-weight: 400;
  line-height: 1;
  color: #ffffff;
  margin-bottom: 12px;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.unit-label {
  font-family: var(--font-sans);
  font-size: 8.5px;
  letter-spacing: 0.24em;
  color: #8c8c8c;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .countdown-section {
    padding: 80px 0 90px;
  }
  .countdown-grid {
    gap: 20px;
  }
}
</style>
