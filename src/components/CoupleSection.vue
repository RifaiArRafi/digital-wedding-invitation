<script setup lang="ts">
import { ref } from 'vue'

// ==========================================
// TARUH URL / PATH FOTO DI SINI
// Contoh: import groomImg from '../assets/groom.jpg' atau URL langsung
// ==========================================
const groomPhoto = ref('/images/groom.jpeg')
const bridePhoto = ref('/images/brides.jpeg')

// Background photo (se-tipe dengan event schedule banner)
const bgPhoto = ref('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80')
</script>

<template>
  <section id="couple" class="couple-section">
    <!-- Dark Translucent Background with image overlay -->
    <div 
      class="couple-bg-overlay"
      :style="{ backgroundImage: `url(${bgPhoto})` }"
    ></div>

    <div class="container couple-content">
      <!-- Eyebrow & Section Title -->
      <p class="couple-eyebrow">THE BRIDE & THE GROOM</p>
      <h2 class="couple-title">
        MEET THE COUPLE
      </h2>

      <!-- Couple Cards Grid -->
      <div class="couple-grid">
        <!-- Mempelai Pria (Setiawan) -->
        <div class="couple-card">
          <!-- Frame Foto Mempelai Pria -->
          <div class="photo-wrapper">
            <img 
              v-if="groomPhoto" 
              :src="groomPhoto" 
              alt="Setiawan" 
              class="couple-photo"
            />
            <div v-else class="photo-placeholder">
              <div class="placeholder-box">
                <span class="placeholder-text">GROOM PHOTO</span>
                <span class="placeholder-hint">Place Setiawan photo here</span>
              </div>
            </div>
            <div class="photo-overlay-tint"></div>
          </div>

          <!-- Detail Informasi -->
          <div class="couple-info">
            <h3 class="person-name">SETIAWAN</h3>
            <p class="family-status">The Groom &bull; First Son</p>
            <div class="parents-divider"></div>
            <p class="parents-label">Son of</p>
            <p class="parents-names">
              Mr. Sumarto <br class="mobile-break" />&amp; Mrs. Solihat
            </p>
          </div>
        </div>

        <!-- Divider Tengah (Ampersand & Heart) -->
        <div class="couple-center-divider">
          <div class="divider-line"></div>
          <div class="ampersand-badge">
            <span class="ampersand">&amp;</span>
          </div>
          <div class="divider-line"></div>
        </div>

        <!-- Mempelai Wanita (Elma Prisiela) -->
        <div class="couple-card">
          <!-- Frame Foto Mempelai Wanita -->
          <div class="photo-wrapper">
            <img 
              v-if="bridePhoto" 
              :src="bridePhoto" 
              alt="Elma Prisiela" 
              class="couple-photo"
            />
            <div v-else class="photo-placeholder">
              <div class="placeholder-box">
                <span class="placeholder-text">BRIDE PHOTO</span>
                <span class="placeholder-hint">Place Elma photo here</span>
              </div>
            </div>
            <div class="photo-overlay-tint"></div>
          </div>

          <!-- Detail Informasi -->
          <div class="couple-info">
            <h3 class="person-name">ELMA PRISIELA</h3>
            <p class="family-status">The Bride &bull; Fourth Daughter</p>
            <div class="parents-divider"></div>
            <p class="parents-label">Daughter of</p>
            <p class="parents-names">
              Mr. Isan <br class="mobile-break" />&amp; Mrs. Rukmawati
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.couple-section {
  position: relative;
  background-color: #141414;
  color: #ffffff;
  padding: 110px 0 120px;
  overflow: hidden;
  text-align: center;
}

/* Background image overlay with dark filter */
.couple-bg-overlay {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(0.24) contrast(120%);
  opacity: 1;
  pointer-events: none;
}

.couple-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.couple-eyebrow {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #b0b0b0;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.couple-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4.5vw, 44px);
  letter-spacing: 0.22em;
  line-height: 1.35;
  font-weight: 400;
  margin-bottom: 54px;
  text-transform: uppercase;
}

/* Grid Layout */
.couple-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 980px;
}

/* Card */
.couple-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(22, 22, 22, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 44px 28px 40px;
  transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.couple-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

/* Photo Wrapper & Slot */
.photo-wrapper {
  position: relative;
  width: 200px;
  height: 260px;
  margin-bottom: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #1e1e1e;
}

.couple-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transform: scale(1.35);
  transition: transform 0.6s ease;
}

.couple-card:hover .couple-photo {
  transform: scale(1.42);
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #1c1c1c, #262626);
  padding: 20px;
  box-sizing: border-box;
}

.placeholder-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.25);
  width: 100%;
  height: 100%;
  padding: 12px;
}

.placeholder-text {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: #e0e0e0;
  font-weight: 600;
  text-transform: uppercase;
}

.placeholder-hint {
  font-family: var(--font-sans);
  font-size: 8.5px;
  letter-spacing: 0.08em;
  color: #888888;
}

.photo-overlay-tint {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 50%);
  pointer-events: none;
}

/* Info */
.couple-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.person-name {
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.6vw, 30px);
  letter-spacing: 0.18em;
  color: #ffffff;
  font-weight: 400;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.family-status {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  color: #d1d1d1;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.parents-divider {
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
}

.parents-label {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: #888888;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.parents-names {
  font-family: var(--font-serif);
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.08em;
  color: #e0e0e0;
  margin-bottom: 0;
}

/* Center Divider */
.couple-center-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.divider-line {
  width: 1px;
  height: 90px;
  background: rgba(255, 255, 255, 0.2);
}

.ampersand-badge {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 0;
  background: rgba(20, 20, 20, 0.8);
}

.ampersand {
  font-family: var(--font-serif);
  font-size: 26px;
  font-style: italic;
  color: #ffffff;
}

@media (max-width: 860px) {
  .couple-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .couple-center-divider {
    flex-direction: row;
    height: auto;
    width: 100%;
    margin: 10px 0;
  }

  .divider-line {
    width: 80px;
    height: 1px;
  }

  .ampersand-badge {
    margin: 0 16px;
  }

  .couple-section {
    padding: 80px 0 90px;
  }

  .photo-wrapper {
    width: 180px;
    height: 235px;
  }
}
</style>
