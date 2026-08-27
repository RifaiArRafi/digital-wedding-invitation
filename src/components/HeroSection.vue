<script setup lang="ts">
import type { GuestInfo } from '../types/wedding'
import { ChevronDown } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    guest: GuestInfo
    hasCustomGuest: boolean
    isRevealed?: boolean
  }>(),
  {
    isRevealed: true
  }
)

defineEmits<{
  (e: 'open-envelope'): void
  (e: 'open-rsvp'): void
}>()

const scrollDown = () => {
  const el = document.querySelector('#story')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="hero" class="hero-fullscreen" :class="{ 'hero-revealed': isRevealed }">
    

    <!-- Desktop Stage (horizontal 3-photo) -->
    <div class="hero-stage">
      
      <!-- Left Photo -->
      <div class="side-photo left-photo">
        <div class="side-img-wrapper">
          <img 
            src="/images/YOS07503.jpg" 
            alt="Setiawan & Elma"
            class="bw-image"
          />
        </div>
      </div>

      <!-- Center Feature Image -->
      <div class="center-photo">
        <div class="center-img-wrapper">
          <img 
            src="/images/center.jpeg" 
            alt="Setiawan & Elma Embracing"
            class="bw-image"
          />
        </div>
      </div>

      <!-- Right Photo -->
      <div class="side-photo right-photo">
        <div class="side-img-wrapper">
          <img 
            src="/images/YOS07465.jpg" 
            alt="Setiawan & Elma Horizon"
            class="bw-image"
          />
        </div>
      </div>

      <!-- Grand Overlapping Date Layer -->
      <div class="date-overlay-layer">
        <h1 class="grand-date">05 · 09 · 2026</h1>
      </div>

    </div>

    <!-- Mobile Layout (vertical stacked) -->
    <div class="mobile-hero">

      <!-- Date + Center Photo stacked block -->
      <div class="mobile-photo-block">
        <h1 class="mobile-date">05 · 09 · 2026</h1>

        <div class="mobile-center-photo">
          <img 
            src="/images/center.jpeg" 
            alt="Setiawan & Elma Embracing"
            class="bw-image"
          />
        </div>
      </div>

      <p class="mobile-caption">JOIN US AS WE EMBARK ON A JOURNEY OF LOVE, JOY, AND ETERNAL HAPPINESS.</p>

      <div class="mobile-side-row">
        <div class="mobile-side-photo">
          <img 
            src="/images/YOS07503.jpg" 
            alt="Setiawan & Elma"
            class="bw-image"
          />
        </div>
        <div class="mobile-side-photo">
          <img 
            src="/images/YOS07465.jpg" 
            alt="Setiawan & Elma Horizon"
            class="bw-image"
          />
        </div>
      </div>
    </div>

    <!-- Subtle Scroll Down Indicator -->
    <div class="scroll-indicator" @click="scrollDown">
      <ChevronDown :size="18" class="bounce" />
    </div>
  </section>
</template>

<style scoped>
.hero-fullscreen {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 0;
}

/* Guest Ribbon */
.guest-floating-badge {
  position: absolute;
  top: 96px;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(20, 20, 20, 0.15);
  padding: 6px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
}

.guest-label {
  font-size: 9px;
  letter-spacing: 0.18em;
  color: #141414;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.gold-icon {
  color: #c4a47c;
}

.view-envelope-btn {
  background: #141414;
  color: #ffffff;
  border: none;
  font-family: var(--font-sans);
  font-size: 8.5px;
  letter-spacing: 0.16em;
  padding: 3px 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Hero Stage with 3-photo composition */
.hero-stage {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(36px, 5vw, 76px);
  box-sizing: border-box;
}

/* Center Image */
.center-photo {
  position: relative;
  z-index: 10;
  flex: 0 0 clamp(360px, 35vw, 490px);
  margin: 0 auto;
  align-self: center;
  transform: translateY(110px);
}

.center-img-wrapper {
  width: 100%;
  aspect-ratio: 3 / 3.85;
  overflow: hidden;
  background: #eaeaea;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
}

/* Side Images */
.side-photo {
  position: relative;
  z-index: 10;
  flex: 0 0 clamp(160px, 16vw, 225px);
  align-self: center;
  margin-top: 80px;
  transform: translateY(70px);
}

.left-photo {
  margin-right: auto;
  margin-left: 0;
}

.right-photo {
  margin-left: auto;
  margin-right: 0;
}

.side-img-wrapper {
  width: 100%;
  aspect-ratio: 3 / 4.0;
  overflow: hidden;
  background: #eaeaea;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}

.bw-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(100%) contrast(106%) brightness(98%);
  transition: transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), filter 0.6s ease;
}

.bw-image:hover {
  transform: scale(1.02);
  filter: grayscale(85%) contrast(108%);
}

/* Grand Date Overlay */
.date-overlay-layer {
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  z-index: 15;
  pointer-events: none;
}

.grand-date {
  font-family: var(--font-serif);
  font-size: clamp(68px, 11vw, 165px);
  letter-spacing: 0.02em;
  font-weight: 700;
  -webkit-text-stroke: 0.8px #141414;
  color: #141414;
  margin: 0;
  margin-right: -0.02em; /* Offset for optical balance */
  white-space: nowrap;
  user-select: none;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 25;
  cursor: pointer;
  color: #777777;
  transition: color 0.2s ease;
  padding: 8px;
}

.scroll-indicator:hover {
  color: #141414;
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(6px);
  }
  60% {
    transform: translateY(3px);
  }
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .hero-stage {
    padding: 0 20px 0;
  }
  .center-photo {
    flex: 0 0 55%;
  }
  .side-photo {
    flex: 0 0 20%;
    margin-bottom: 40px;
  }
  .grand-date {
    font-size: clamp(36px, 9vw, 64px);
    letter-spacing: 0.18em;
    margin-right: -0.18em;
  }
}

@media (max-width: 600px) {
  .hero-fullscreen {
    height: auto;
    min-height: 100vh;
    background-color: #fbfbfb;
    padding-top: 0;
    padding-bottom: 0;
    justify-content: flex-start;
  }
  .hero-stage {
    display: none;
  }
  .scroll-indicator {
    display: none;
  }
  .guest-floating-badge {
    top: 72px;
    padding: 5px 12px;
    gap: 8px;
    max-width: calc(100vw - 32px);
  }
}

/* Desktop Entrance Trigger */
.hero-fullscreen.hero-revealed .grand-date {
  animation: heroFadeDown 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

.hero-fullscreen.hero-revealed .center-photo {
  animation: heroImageReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
}

.hero-fullscreen.hero-revealed .side-photo {
  animation: heroFadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
}

/* Mobile Hero Layout */
.mobile-hero {
  display: none;
}

@media (max-width: 600px) {
  .mobile-hero {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 70px 0 40px;
    box-sizing: border-box;
    gap: 0;
  }

  /* Wrapper: date floats over top of photo */
  .mobile-photo-block {
    position: relative;
    width: 100%;
    padding-top: 120px; /* space above for header */
    box-sizing: border-box;
    margin-bottom: 28px;
  }

  .mobile-date {
    font-family: var(--font-serif);
    font-size: clamp(44px, 13.5vw, 62px);
    letter-spacing: 0.02em;
    font-weight: 700;
    -webkit-text-stroke: 0.7px #141414;
    color: #141414;
    text-align: center;
    line-height: 1;
    padding: 0;
    position: relative;
    z-index: 15;
    margin: 0 0 4px 0;
    opacity: 0;
  }

  .hero-fullscreen.hero-revealed .mobile-date {
    animation: heroFadeDown 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }

  .mobile-center-photo {
    width: 72%;
    aspect-ratio: 3 / 4.2;
    overflow: hidden;
    margin: 0 auto 0 auto;
    background: #eaeaea;
    position: relative;
    z-index: 5;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
    opacity: 0;
  }

  .hero-fullscreen.hero-revealed .mobile-center-photo {
    animation: heroImageReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
  }

  .mobile-center-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(100%) contrast(106%) brightness(98%);
  }

  .hero-fullscreen.hero-revealed .mobile-center-photo img {
    animation: heroImageZoom 2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
  }

  .mobile-caption {
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.15em;
    line-height: 1.9;
    color: #222222;
    text-align: center;
    text-transform: uppercase;
    padding: 0 32px;
    margin: 0 0 28px 0;
    opacity: 0;
  }

  .hero-fullscreen.hero-revealed .mobile-caption {
    animation: heroFadeUp 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
  }

  .mobile-side-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    opacity: 0;
  }

  .hero-fullscreen.hero-revealed .mobile-side-row {
    animation: heroFadeUp 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both;
  }

  .mobile-side-photo {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: #eaeaea;
  }

  .mobile-side-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(100%) contrast(106%) brightness(98%);
  }
}

/* Elegant Keyframes */
@keyframes heroFadeDown {
  0% {
    opacity: 0;
    transform: translateY(-24px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes heroImageReveal {
  0% {
    opacity: 0;
    transform: translateY(35px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroImageZoom {
  0% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes heroFadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
