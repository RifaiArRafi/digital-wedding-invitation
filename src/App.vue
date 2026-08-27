<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGuest } from './composables/useGuest'
import type { RsvpSubmission } from './types/wedding'

import HeaderNav from './components/HeaderNav.vue'
import GuestEnvelopeModal from './components/GuestEnvelopeModal.vue'
import HeroSection from './components/HeroSection.vue'
import CoupleSection from './components/CoupleSection.vue'
import ScheduleSection from './components/ScheduleSection.vue'
import LocationSection from './components/LocationSection.vue'
import CountdownSection from './components/CountdownSection.vue'
import DigitalEnvelopeSection from './components/DigitalEnvelopeSection.vue'
import DetailsSection from './components/DetailsSection.vue'
import FooterSection from './components/FooterSection.vue'
import RsvpModal from './components/RsvpModal.vue'
import FaqsModal from './components/FaqsModal.vue'
import AudioPlayer from './components/AudioPlayer.vue'

const { guest, hasCustomGuest, isEnvelopeOpen, openEnvelope, closeEnvelope } = useGuest()

const isRsvpModalOpen = ref(false)
const isFaqsModalOpen = ref(false)

const isHeroRevealed = ref(false)

const handleCloseEnvelope = () => {
  closeEnvelope()
  isHeroRevealed.value = true
}

const openRsvp = () => {
  isRsvpModalOpen.value = true
}

const closeRsvp = () => {
  isRsvpModalOpen.value = false
}

const openFaqs = () => {
  isFaqsModalOpen.value = true
}

const closeFaqs = () => {
  isFaqsModalOpen.value = false
}

const handleRsvpSubmitted = (data: RsvpSubmission) => {
  console.log('RSVP received:', data)
}

onMounted(() => {
  const setupScrollReveal = () => {
    const targets = document.querySelectorAll(
      'section > .container, .timeline-item, .couple-card, .detail-card, .location-card, .countdown-unit, .bank-card, .story-content, .footer-content'
    )
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    targets.forEach((el) => {
      el.classList.add('reveal-on-scroll')
      observer.observe(el)
    })
  }

  setTimeout(setupScrollReveal, 100)
})
</script>

<template>
  <div class="wedding-app">
    <!-- Top Nav Header -->
    <HeaderNav 
      @open-rsvp="openRsvp" 
      @open-faqs="openFaqs" 
    />

    <main>
      <!-- Hero Section (Triple Photo & Date) -->
      <HeroSection 
        :guest="guest" 
        :has-custom-guest="hasCustomGuest" 
        :is-revealed="isHeroRevealed || !hasCustomGuest"
        @open-envelope="openEnvelope"
        @open-rsvp="openRsvp"
      />

      <!-- Couple / Mempelai Section (Dark Editorial) -->
      <CoupleSection />

      <!-- Registry & Dress Code Section -->
      <DetailsSection :guest="guest" :has-custom-guest="hasCustomGuest" />

      <!-- Schedule Section (Dark Editorial) -->
      <ScheduleSection />

      <!-- Location Section -->
      <LocationSection />

      <!-- Countdown Section (Floral Dark) -->
      <CountdownSection />

      <!-- Digital Envelope Section (Gift / No Rekening) -->
      <DigitalEnvelopeSection />
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Modals -->
    <GuestEnvelopeModal 
      :is-open="isEnvelopeOpen" 
      :guest="guest" 
      @close="handleCloseEnvelope"
      @open-rsvp="handleCloseEnvelope(); openRsvp()"
    />

    <RsvpModal 
      :is-open="isRsvpModalOpen" 
      :guest="guest" 
      @close="closeRsvp" 
      @submitted="handleRsvpSubmitted"
    />

    <FaqsModal 
      :is-open="isFaqsModalOpen" 
      @close="closeFaqs" 
    />

    <!-- Ambient Audio Player -->
    <AudioPlayer />
  </div>
</template>

<style scoped>
.wedding-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
