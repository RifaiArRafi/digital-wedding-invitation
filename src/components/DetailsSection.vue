<script setup lang="ts">
import { ref } from 'vue'
import type { GuestInfo } from '../types/wedding'
import { Gift, Sparkles, Check, Copy } from 'lucide-vue-next'

defineProps<{
  guest: GuestInfo
  hasCustomGuest: boolean
}>()

const copied = ref(false)
const showRegistryModal = ref(false)
const showDressCodeModal = ref(false)

const copyBankDetails = () => {
  navigator.clipboard.writeText('IE29BOFI90000112345678')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2500)
}
</script>

<template>
  <section id="details" class="details-section">
    <div class="container details-container">
      <div class="details-grid">
        
        <!-- Left: Registry Card -->
        <div id="registry" class="detail-card" @click="showRegistryModal = true">
          <h2 class="card-heading">REGISTRY</h2>
          <p v-if="hasCustomGuest" class="card-guest-greeting">Dear {{ guest.name }},</p>
          <p class="card-desc">Your presence is our greatest gift. Should you wish to honor us, explore our curated wish list.</p>
        </div>

        <!-- Right: Dress Code Card -->
        <div id="dresscode" class="detail-card dresscode-card-direct">
          <h2 class="card-heading">DRESS CODE</h2>
          <div class="dress-title">BLACK TIE / MONOCHROME EDITORIAL</div>
          <p class="card-desc" style="margin-bottom: 20px;">
            To create a timeless photographic memory, we invite our guests to wear elegant attire in shades of black, charcoal, or deep slate.
          </p>

          <div class="palette-swatches">
            <div class="swatch"><div class="color-circle" style="background: #111111;"></div><span>Black</span></div>
            <div class="swatch"><div class="color-circle" style="background: #2d2d2d;"></div><span>Charcoal</span></div>
            <div class="swatch"><div class="color-circle" style="background: #6c757d;"></div><span>Slate</span></div>
          </div>

          <div class="dress-tips">
            <p><strong>Gentlemen:</strong> Classic black tuxedos or dark informal suits with bowtie or necktie.</p>
            <p><strong>Ladies:</strong> Floor-length gowns, refined cocktail dresses, or sleek tailored evening wear.</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Registry Modal -->
    <div v-if="showRegistryModal" class="modal-backdrop" @click.self="showRegistryModal = false">
      <div class="modal-card animate-fade-in">
        <div class="modal-header">
          <h3 class="modal-title">GIFT REGISTRY</h3>
          <button class="close-btn" @click="showRegistryModal = false">×</button>
        </div>
        <div class="modal-body">
          <p class="modal-intro">
            Having you celebrate with us is what means the most. If you would like to contribute toward our honeymoon or home, details are below:
          </p>

          <div class="registry-option">
            <div class="option-header">
              <Gift :size="18" />
              <h4>HONEYMOON ADVENTURE FUND</h4>
            </div>
            <p>Bank of Ireland · Setiawan & Elma</p>
            <div class="bank-box">
              <code>IBAN: IE29 BOFI 9000 0112 3456 78</code>
              <button class="copy-btn" @click="copyBankDetails">
                <component :is="copied ? Check : Copy" :size="12" />
                {{ copied ? 'COPIED' : 'COPY' }}
              </button>
            </div>
          </div>

          <div class="registry-option">
            <div class="option-header">
              <Sparkles :size="18" />
              <h4>CURATED GIFT WISH LIST</h4>
            </div>
            <p>Home & Kitchen essentials at The Wedding Shop & Crate & Barrel.</p>
            <a href="https://www.weddingshop.com" target="_blank" class="registry-link">BROWSE GIFT LIST →</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Dress Code Modal -->
    <div v-if="showDressCodeModal" class="modal-backdrop" @click.self="showDressCodeModal = false">
      <div class="modal-card animate-fade-in">
        <div class="modal-header">
          <h3 class="modal-title">DRESS CODE GUIDELINES</h3>
          <button class="close-btn" @click="showDressCodeModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="dress-title">BLACK TIE / MONOCHROME EDITORIAL</div>
          <p class="dress-desc">
            To create a timeless photographic memory, we invite our guests to wear elegant attire in shades of black, charcoal, or deep slate.
          </p>

          <div class="palette-swatches">
            <div class="swatch"><div class="color-circle" style="background: #111111;"></div><span>Black</span></div>
            <div class="swatch"><div class="color-circle" style="background: #2d2d2d;"></div><span>Charcoal</span></div>
            <div class="swatch"><div class="color-circle" style="background: #6c757d;"></div><span>Slate</span></div>
          </div>

          <div class="dress-tips">
            <p><strong>Gentlemen:</strong> Classic black tuxedos or dark informal suits with bowtie or necktie.</p>
            <p><strong>Ladies:</strong> Floor-length gowns, refined cocktail dresses, or sleek tailored evening wear.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details-section {
  padding: 100px 0;
  background-color: var(--bg-primary);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  max-width: 900px;
  margin: 0 auto;
}

.detail-card {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-heading {
  font-family: var(--font-serif);
  font-size: clamp(26px, 4vw, 36px);
  letter-spacing: 0.25em;
  font-weight: 400;
  color: var(--text-dark);
  margin-bottom: 24px;
  margin-right: -0.25em;
  text-transform: uppercase;
}

.card-image-box {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 3 / 3.8;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.card-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay-prompt {
  position: absolute;
  inset: 0;
  background: rgba(18, 18, 18, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-overlay-prompt span {
  color: #ffffff;
  font-size: 10px;
  letter-spacing: 0.2em;
  border: 1px solid #ffffff;
  padding: 8px 18px;
}

.card-image-box:hover .image-overlay-prompt {
  opacity: 1;
}

.card-guest-greeting {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(24px, 4vw, 36px);
  color: #141414;
  margin-bottom: 12px;
  line-height: 1.3;
}

.dresscode-card-direct {
  cursor: default;
  max-width: 380px;
}

.dresscode-card-direct .card-desc {
  max-width: 360px;
}

.card-desc {
  font-size: 11px;
  line-height: 1.7;
  color: #666666;
  max-width: 300px;
  letter-spacing: 0.04em;
}

/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #ffffff;
  max-width: 520px;
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
}

.modal-intro {
  font-size: 12px;
  line-height: 1.6;
  color: #555555;
  margin-bottom: 24px;
}

.registry-option {
  border: 1px solid #e0e0e0;
  padding: 18px;
  margin-bottom: 16px;
}

.option-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.option-header h4 {
  font-size: 11px;
  letter-spacing: 0.15em;
}

.registry-option p {
  font-size: 11px;
  color: #777777;
  margin-bottom: 10px;
}

.bank-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f7f7;
  padding: 8px 12px;
  font-family: monospace;
  font-size: 11px;
}

.copy-btn {
  background: #141414;
  color: #ffffff;
  border: none;
  padding: 4px 10px;
  font-size: 9px;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.registry-link {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: #141414;
  text-decoration: none;
  font-weight: 600;
}

.dress-title {
  font-family: var(--font-serif);
  font-size: 16px;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
}

.dress-desc {
  font-size: 12px;
  line-height: 1.6;
  color: #555555;
  margin-bottom: 20px;
}

.palette-swatches {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.color-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.swatch span {
  font-size: 9px;
  letter-spacing: 0.1em;
  color: #666666;
}

.dress-tips p {
  font-size: 11.5px;
  line-height: 1.6;
  color: #444444;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
</style>
