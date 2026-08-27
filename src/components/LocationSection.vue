<script setup lang="ts">
import { ref } from 'vue'
import { MapPin, Navigation, ExternalLink, Car, BedDouble } from 'lucide-vue-next'

const showTravelModal = ref(false)

const openGoogleMaps = () => {
  window.open('https://maps.app.goo.gl/2VNNPut3e8RxkSh19?g_st=iw', '_blank')
}
</script>

<template>
  <section id="location" class="location-section">
    <div class="container location-container">
      
      <!-- Section Title -->
      <h2 class="section-title">LOCATION</h2>

      <!-- 3-Column Architectural Layout -->
      <div class="location-grid">
        <!-- Left Column: Venue Name -->
        <div class="location-col col-left">
          <p class="venue-title">
            RUTE 354<br />
            SENTUL, BOGOR
          </p>
          <span class="venue-sub">WEDDING & CELEBRATION VENUE</span>
        </div>

        <!-- Center Column: Castle Photo -->
        <div class="location-col col-center">
          <div class="castle-photo-frame">
            <img 
              src="/images/rute354.jpeg" 
              alt="Rute 354 Sentul"
              class="bw-filter"
            />
          </div>
        </div>

        <!-- Right Column: Address Details -->
        <div class="location-col col-right">
          <p class="address-title">
            JL. ALTERNATIF SENTUL NO.354<br />
            BABAKAN MADANG, BOGOR
          </p>
          <span class="address-sub">JAWA BARAT 16912</span>
        </div>
      </div>

      <!-- Action Button -->
      <div class="location-action">
        <button class="btn-editorial" @click="openGoogleMaps">
          <MapPin :size="13" style="margin-right: 6px; display: inline-block; vertical-align: -2px;" />
          CHECK ON MAPS
        </button>
      </div>
    </div>

    <!-- Travel & Accommodations Modal -->
    <div v-if="showTravelModal" class="modal-backdrop" @click.self="showTravelModal = false">
      <div class="modal-card animate-fade-in">
        <div class="modal-header">
          <h3 class="modal-title">TRAVEL & ACCOMMODATION GUIDE</h3>
          <button class="close-btn" @click="showTravelModal = false">×</button>
        </div>

        <div class="modal-body">
          <div class="guide-item">
            <div class="guide-icon"><BedDouble :size="20" /></div>
            <div>
              <h4>ESTATE ROOM BLOCKS</h4>
              <p>Reserved guest rooms at Dunhaven Castle Hotel with code <strong>SE2026</strong> for special rates.</p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon"><Car :size="20" /></div>
            <div>
              <h4>SHUTTLE SERVICE</h4>
              <p>Complimentary shuttles from Kerry Airport (KIR) and Killarney Station to Dunhaven Castle.</p>
            </div>
          </div>

          <div class="guide-item">
            <div class="guide-icon"><Navigation :size="20" /></div>
            <div>
              <h4>PARKING</h4>
              <p>Valet and self-parking available on the North Courtyard grounds.</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-editorial" @click="openGoogleMaps">
            <MapPin :size="13" style="margin-right: 6px; display: inline-block; vertical-align: -2px;" />
            OPEN IN GOOGLE MAPS
            <ExternalLink :size="12" style="margin-left: 4px; display: inline-block; vertical-align: -2px;" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.location-section {
  padding: 100px 0 110px;
  background-color: var(--bg-primary);
  text-align: center;
}

.location-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 48px);
  letter-spacing: 0.3em;
  font-weight: 400;
  color: var(--text-dark);
  margin-bottom: 60px;
  margin-right: -0.3em;
}

.location-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  width: 100%;
  max-width: 980px;
  margin-bottom: 48px;
}

.location-col {
  flex: 1;
}

.col-left {
  text-align: right;
}

.col-right {
  text-align: left;
}

.venue-title, .address-title {
  font-family: var(--font-sans);
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.2em;
  line-height: 1.9;
  color: #1f1f1f;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.venue-sub, .address-sub {
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: #888888;
  display: block;
}

.col-center {
  flex: 0 0 240px;
}

.castle-photo-frame {
  width: 100%;
  aspect-ratio: 3 / 3.8;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.castle-photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(100%) contrast(106%) brightness(98%);
  transition: filter 0.6s ease;
}

.castle-photo-frame:hover img {
  filter: grayscale(60%) contrast(106%);
}

.location-action {
  margin-top: 10px;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #ffffff;
  max-width: 500px;
  width: 100%;
  padding: 36px;
  border: 1px solid #141414;
  text-align: left;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.modal-title {
  font-family: var(--font-serif);
  font-size: 20px;
  letter-spacing: 0.16em;
  font-weight: 500;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.guide-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.guide-icon {
  color: #141414;
  margin-top: 2px;
}

.guide-item h4 {
  font-size: 11px;
  letter-spacing: 0.15em;
  margin-bottom: 4px;
}

.guide-item p {
  font-size: 12px;
  color: #666666;
  line-height: 1.5;
}

.modal-footer {
  text-align: center;
}

@media (max-width: 768px) {
  .location-grid {
    flex-direction: column;
    gap: 24px;
  }
  .col-left, .col-right {
    text-align: center;
  }
  .col-center {
    order: -1;
    width: 220px;
  }
  .location-section {
    padding: 70px 0 80px;
  }
}
</style>
