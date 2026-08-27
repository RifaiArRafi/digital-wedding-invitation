<script setup lang="ts">
import { CalendarPlus, Check } from 'lucide-vue-next'
import { ref } from 'vue'

const addedToCal = ref(false)

const events = [
  {
    time: '4:30 PM',
    title: 'ROLLING THUNDER',
    desc: 'Motor Besar Indonesia (MBI)'
  },
  {
    time: '6:30 PM – 8:30 PM',
    title: 'RESEPSI / GALA DINNER',
    desc: ''
  }
]

const addToCalendar = () => {
  // Generate Google Calendar Link
  const title = encodeURIComponent('Setiawan & Elma Wedding Celebration')
  const details = encodeURIComponent('Join Setiawan & Elma for their wedding celebration at Rute 354, Sentul, Babakan Madang, Bogor.')
  const location = encodeURIComponent('Rute 354, Jl. Alternatif Sentul No.354, Sentul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16912')
  const startTime = '20260905T093000Z'
  const endTime = '20260905T140000Z'
  
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`
  
  window.open(googleCalUrl, '_blank')
  addedToCal.value = true
  setTimeout(() => {
    addedToCal.value = false
  }, 3000)
}
</script>

<template>
  <section id="schedule" class="schedule-section">
    <!-- Dark Translucent Background with subtle imagery overlay -->
    <div class="schedule-bg-overlay"></div>

    <div class="container schedule-content">
      <!-- Eyebrow & Title -->
      <p class="schedule-eyebrow">HERE'S A SNEAK PEEK OF</p>
      <h2 class="schedule-title">
        OUR SPECIAL DAY'S<br />SCHEDULE
      </h2>

      <!-- Schedule Timeline Grid -->
      <div class="timeline-grid">
        <div 
          v-for="(item, index) in events" 
          :key="index"
          class="timeline-item"
        >
          <div class="time-label">{{ item.time }}</div>
          <div class="event-name">{{ item.title }}</div>
          <div class="event-desc">{{ item.desc }}</div>
        </div>
      </div>

      <!-- Add to Calendar Action -->
      <div class="calendar-action">
        <button class="btn-editorial btn-editorial-light" @click="addToCalendar">
          <component :is="addedToCal ? Check : CalendarPlus" :size="13" style="margin-right: 6px; display: inline-block; vertical-align: -2px;" />
          {{ addedToCal ? 'EVENT OPENED IN CALENDAR' : 'SAVE DATE TO CALENDAR' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.schedule-section {
  position: relative;
  background-color: #161616;
  color: #ffffff;
  padding: 100px 0 110px;
  min-height: 80vh;
  overflow: hidden;
  text-align: center;
}

.schedule-bg-overlay {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(0.28) contrast(120%);
  opacity: 1;
  pointer-events: none;
}

.schedule-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.schedule-eyebrow {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #b0b0b0;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.schedule-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4.5vw, 44px);
  letter-spacing: 0.22em;
  line-height: 1.35;
  font-weight: 400;
  margin-bottom: 60px;
  text-transform: uppercase;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  width: 100%;
  max-width: 960px;
  margin-bottom: 54px;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.timeline-item:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.6);
}

.time-label {
  font-family: var(--font-serif);
  font-size: 42px;
  letter-spacing: 0.1em;
  color: #ffffff;
  margin-bottom: 16px;
  font-weight: 400;
}

.event-name {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #d1d1d1;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.event-desc {
  font-size: 9px;
  letter-spacing: 0.1em;
  color: #7d7d7d;
}

.calendar-action {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .timeline-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .schedule-section {
    padding: 70px 0 80px;
  }
  .time-label {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .timeline-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
