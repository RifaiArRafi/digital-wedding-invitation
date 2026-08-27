<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GuestInfo, RsvpSubmission } from '../types/wedding'
import confetti from 'canvas-confetti'
import { CheckCircle2, HeartHandshake, Utensils } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  guest: GuestInfo
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted', data: RsvpSubmission): void
}>()

const form = ref({
  guestName: props.guest.name,
  attendance: 'attending' as 'attending' | 'declining',
  guestCount: props.guest.seats || 1,
  dietaryRestrictions: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

watch(() => props.guest, (newGuest) => {
  if (newGuest) {
    form.value.guestName = newGuest.name
    form.value.guestCount = newGuest.seats || 1
  }
}, { immediate: true, deep: true })

const fireConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#141414', '#c4a47c', '#d4af37', '#777777']
  })
}

const handleSubmit = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    
    if (form.value.attendance === 'attending') {
      fireConfetti()
    }

    const payload: RsvpSubmission = {
      guestName: form.value.guestName,
      attendance: form.value.attendance,
      guestCount: form.value.attendance === 'attending' ? form.value.guestCount : 0,
      dietaryRestrictions: form.value.dietaryRestrictions,
      message: form.value.message,
      submittedAt: new Date().toISOString()
    }

    // Save to localStorage for demo persistence
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]')
    existing.push(payload)
    localStorage.setItem('wedding_rsvps', JSON.stringify(existing))

    emit('submitted', payload)
  }, 600)
}

const resetAndClose = () => {
  emit('close')
  setTimeout(() => {
    isSubmitted.value = false
  }, 400)
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="resetAndClose">
    <div class="modal-card animate-fade-in">
      <button class="close-btn" @click="resetAndClose" aria-label="Close RSVP Modal">×</button>

      <!-- Submitted Success View -->
      <div v-if="isSubmitted" class="success-view">
        <CheckCircle2 :size="48" class="success-icon" />
        <h3 class="success-title">RSVP RECEIVED</h3>
        <p class="success-msg">
          Thank you, <strong>{{ form.guestName }}</strong>.
          <span v-if="form.attendance === 'attending'">
            We are thrilled to celebrate with you on July 14, 2026!
          </span>
          <span v-else>
            We will miss you, but thank you for letting us know and sending your warm wishes.
          </span>
        </p>
        <button class="btn-editorial" @click="resetAndClose">CLOSE</button>
      </div>

      <!-- RSVP Form -->
      <div v-else class="form-view">
        <div class="modal-header">
          <p class="eyebrow">R.S.V.P.</p>
          <h2 class="title">CELEBRATE WITH US</h2>
          <p class="subtitle">Please respond by June 1, 2026</p>
        </div>

        <form @submit.prevent="handleSubmit" class="rsvp-form">
          <!-- Guest Name (Prepopulated from URL Parameter) -->
          <div class="form-group">
            <label>YOUR NAME</label>
            <input 
              v-model="form.guestName" 
              type="text" 
              required 
              placeholder="e.g. John & Sarah Doe"
              class="text-input"
            />
            <span class="field-hint" v-if="guest.isVip">VIP Guest Pass Active</span>
          </div>

          <!-- Attendance Option -->
          <div class="form-group">
            <label>ATTENDANCE</label>
            <div class="radio-cards">
              <label class="radio-card" :class="{ active: form.attendance === 'attending' }">
                <input 
                  type="radio" 
                  v-model="form.attendance" 
                  value="attending" 
                  class="sr-only"
                />
                <HeartHandshake :size="16" />
                <span>JOYFULLY ACCEPTS</span>
              </label>

              <label class="radio-card" :class="{ active: form.attendance === 'declining' }">
                <input 
                  type="radio" 
                  v-model="form.attendance" 
                  value="declining" 
                  class="sr-only"
                />
                <span>REGRETFULLY DECLINES</span>
              </label>
            </div>
          </div>

          <!-- Number of Attending Guests -->
          <div v-if="form.attendance === 'attending'" class="form-group animate-fade-in">
            <label>NUMBER OF GUESTS (MAX: {{ guest.seats || 2 }})</label>
            <select v-model.number="form.guestCount" class="text-input select-input">
              <option v-for="n in (guest.seats || 2)" :key="n" :value="n">
                {{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}
              </option>
            </select>
          </div>

          <!-- Dietary Restrictions -->
          <div v-if="form.attendance === 'attending'" class="form-group animate-fade-in">
            <label>
              <Utensils :size="12" style="display: inline; vertical-align: -1px; margin-right: 4px;" />
              DIETARY REQUIREMENTS & ALLERGIES
            </label>
            <input 
              v-model="form.dietaryRestrictions" 
              type="text" 
              placeholder="Vegetarian, Gluten-Free, Nut allergy, etc."
              class="text-input"
            />
          </div>

          <!-- Personal Message / Wishes -->
          <div class="form-group">
            <label>MESSAGE TO SETIAWAN & ELMA</label>
            <textarea 
              v-model="form.message" 
              rows="3" 
              placeholder="Leave your blessings and warm wishes..."
              class="text-input textarea"
            ></textarea>
          </div>

          <div class="form-action">
            <button 
              type="submit" 
              class="btn-editorial submit-btn" 
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'TRANSMITTING...' : 'SEND RESPONSE' }}
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(10px);
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  position: relative;
  background: #ffffff;
  max-width: 500px;
  width: 100%;
  padding: 40px 36px;
  border: 1px solid #141414;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 22px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #141414;
  line-height: 1;
}

.modal-header {
  text-align: center;
  margin-bottom: 28px;
}

.eyebrow {
  font-size: 9px;
  letter-spacing: 0.3em;
  color: #777777;
  margin-bottom: 8px;
}

.title {
  font-family: var(--font-serif);
  font-size: 26px;
  letter-spacing: 0.18em;
  font-weight: 400;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 10px;
  letter-spacing: 0.14em;
  color: #888888;
}

.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: #333333;
}

.text-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d4d4d4;
  background: #fafafa;
  font-family: var(--font-sans);
  font-size: 12px;
  color: #141414;
  border-radius: 0;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.text-input:focus {
  border-color: #141414;
  background: #ffffff;
}

.select-input {
  cursor: pointer;
}

.textarea {
  resize: vertical;
}

.field-hint {
  font-size: 9px;
  color: #c4a47c;
  letter-spacing: 0.08em;
}

.radio-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.radio-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 10px;
  border: 1px solid #d4d4d4;
  background: #fafafa;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.12em;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
}

.radio-card.active {
  border-color: #141414;
  background: #141414;
  color: #ffffff;
}

.sr-only {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.form-action {
  margin-top: 10px;
}

.submit-btn {
  width: 100%;
  padding: 14px 20px;
}

.success-view {
  text-align: center;
  padding: 30px 10px;
}

.success-icon {
  color: #141414;
  margin-bottom: 16px;
}

.success-title {
  font-family: var(--font-serif);
  font-size: 26px;
  letter-spacing: 0.2em;
  margin-bottom: 14px;
}

.success-msg {
  font-size: 13px;
  line-height: 1.7;
  color: #555555;
  margin-bottom: 28px;
}
</style>
