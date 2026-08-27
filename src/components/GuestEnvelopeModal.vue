<script setup lang="ts">
import { ref } from 'vue'
import type { GuestInfo } from '../types/wedding'
import { Mail } from 'lucide-vue-next'

defineProps<{
  guest: GuestInfo
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'open-rsvp'): void
}>()

const isUnfolding = ref(false)

const handleOpenInvitation = () => {
  isUnfolding.value = true
  setTimeout(() => {
    emit('close')
    isUnfolding.value = false
  }, 900)
}
</script>

<template>
  <div v-if="isOpen" class="envelope-overlay" @click.self="emit('close')">
    <div class="envelope-card" :class="{ 'is-opening': isUnfolding }">
      <!-- Luxury Monogram Wax Seal Top -->
      <div class="seal-container">
        <div class="wax-seal">
          <span>S & E</span>
        </div>
      </div>

      <div class="invitation-letter">
        <div class="letter-border">
          <p class="letter-eyebrow">EXCLUSIVE INVITATION</p>
          <h2 class="guest-title">{{ guest.name }}</h2>

          <div class="divider-line"></div>

          <p class="letter-body">
            You are cordially invited to celebrate the marriage of
          </p>
          
          <h3 class="couple-names">SETIAWAN & ELMA</h3>
          
          <p class="wedding-date">SATURDAY · 5 SEPTEMBER 2026</p>
          <p class="wedding-venue">RUTE 354 · SENTUL, BOGOR</p>

          <p class="personal-note">
            "{{ guest.personalizedMessage || 'We would be deeply honored by your presence on our special day.' }}"
          </p>

          <div class="actions">
            <button class="btn-editorial" @click="handleOpenInvitation">
              <Mail :size="14" style="margin-right: 6px; display: inline-block; vertical-align: -2px;" />
              ENTER CELEBRATION
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.envelope-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(18, 18, 18, 0.88);
  backdrop-filter: blur(14px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: overlayFadeIn 0.8s ease-out both;
}

.envelope-card {
  position: relative;
  max-width: 540px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
  animation: cardEntrance 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

.envelope-card.is-opening {
  transform: scale(1.05) translateY(-20px);
  opacity: 0;
}

.seal-container {
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: sealPop 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}

.wax-seal {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #141414;
  color: #d4af37;
  border: 2px solid #c4a47c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  box-shadow: 0 8px 22px rgba(0,0,0,0.38);
}

.invitation-letter {
  padding: 44px 28px 36px;
  text-align: center;
}

.letter-border {
  border: 1px solid #e8e8e8;
  padding: 32px 20px;
  background: #fafafa;
  animation: letterFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

.letter-eyebrow {
  font-size: 9px;
  letter-spacing: 0.26em;
  color: #7a7a7a;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.guest-title {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #141414;
  margin-bottom: 16px;
  text-transform: capitalize;
}

.divider-line {
  width: 40px;
  height: 1px;
  background-color: #141414;
  margin: 0 auto 16px;
}

.letter-body {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 15px;
  color: #555555;
  margin-bottom: 10px;
}

.couple-names {
  font-family: var(--font-serif);
  font-size: 24px;
  letter-spacing: 0.22em;
  margin-bottom: 12px;
  font-weight: 400;
}

.wedding-date {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: #222222;
  margin-bottom: 4px;
}

.wedding-venue {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: #666666;
  margin-bottom: 22px;
}

.guest-details-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.detail-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  padding: 6px 14px;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: #333333;
}

.vip-badge {
  background: #141414;
  color: #ffffff;
  border-color: #141414;
}

.personal-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 28px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.actions {
  display: flex;
  justify-content: center;
}

@keyframes overlayFadeIn {
  0% { opacity: 0; backdrop-filter: blur(0px); }
  100% { opacity: 1; backdrop-filter: blur(14px); }
}

@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: translateY(35px) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes sealPop {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.3) rotate(-15deg);
  }
  70% {
    transform: translateX(-50%) scale(1.08) rotate(3deg);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1) rotate(0deg);
  }
}

@keyframes letterFadeIn {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
