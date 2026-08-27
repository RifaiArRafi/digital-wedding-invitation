<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, CreditCard } from 'lucide-vue-next'

const copiedIndex = ref<number | null>(null)

const bankAccounts = [
  {
    bank: 'BANK MANDIRI',
    accountNumber: '1330024410425',
    holderName: 'Elma Prisiela',
    badge: 'Mandiri'
  },
  {
    bank: 'BANK BCA',
    accountNumber: '6830486567',
    holderName: 'Elma Prisiela',
    badge: 'BCA'
  }
]

const copyAccountNumber = (accNumber: string, index: number) => {
  navigator.clipboard.writeText(accNumber)
  copiedIndex.value = index
  setTimeout(() => {
    if (copiedIndex.value === index) {
      copiedIndex.value = null
    }
  }, 2500)
}
</script>

<template>
  <section id="digital-envelope" class="envelope-section">
    <div class="container envelope-container">
      
      <!-- Eyebrow & Section Header -->
      <div class="envelope-header">
        <p class="envelope-eyebrow">A TOKEN OF LOVE</p>
        <h2 class="envelope-title">DIGITAL ENVELOPE</h2>
        <p class="envelope-desc">
          Your warm wishes and presence are the greatest gift to us. However, if you wish to honor us with a digital wedding gift, bank transfer details are provided below:
        </p>
      </div>

      <!-- Bank Cards Grid -->
      <div class="bank-cards-grid">
        <div 
          v-for="(item, index) in bankAccounts" 
          :key="index"
          class="bank-card"
        >
          <div class="card-top">
            <div class="bank-badge">{{ item.badge }}</div>
            <CreditCard :size="20" class="card-icon" />
          </div>

          <div class="bank-info">
            <div class="bank-name">{{ item.bank }}</div>
            <div class="account-number-wrapper">
              <span class="account-number">{{ item.accountNumber }}</span>
            </div>
            <div class="account-holder">
              <span class="holder-label">a/n</span>
              <span class="holder-name">{{ item.holderName }}</span>
            </div>
          </div>

          <div class="card-action">
            <button 
              class="copy-btn" 
              :class="{ 'is-copied': copiedIndex === index }"
              @click="copyAccountNumber(item.accountNumber, index)"
            >
              <component :is="copiedIndex === index ? Check : Copy" :size="13" />
              <span>{{ copiedIndex === index ? 'COPIED TO CLIPBOARD' : 'COPY ACCOUNT NUMBER' }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.envelope-section {
  padding: 100px 0 110px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  text-align: center;
}

.envelope-container {
  max-width: 860px;
  margin: 0 auto;
}

.envelope-header {
  margin-bottom: 50px;
}

.envelope-eyebrow {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #777777;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.envelope-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4.2vw, 42px);
  letter-spacing: 0.25em;
  font-weight: 400;
  color: var(--text-dark);
  margin-bottom: 20px;
  margin-right: -0.25em;
  text-transform: uppercase;
}

.envelope-desc {
  font-size: 12px;
  line-height: 1.8;
  color: #666666;
  max-width: 580px;
  margin: 0 auto;
  letter-spacing: 0.04em;
}

/* Bank Grid */
.bank-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

/* Bank Card */
.bank-card {
  background: #ffffff;
  border: 1px solid rgba(20, 20, 20, 0.12);
  padding: 34px 28px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.bank-card:hover {
  transform: translateY(-4px);
  border-color: rgba(20, 20, 20, 0.4);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.bank-badge {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--text-dark);
  text-transform: uppercase;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 4px;
}

.card-icon {
  color: #888888;
}

.bank-info {
  margin-bottom: 26px;
}

.bank-name {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #777777;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.account-number-wrapper {
  margin-bottom: 12px;
}

.account-number {
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.8vw, 28px);
  letter-spacing: 0.1em;
  color: var(--text-dark);
  font-weight: 600;
}

.account-holder {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #555555;
}

.holder-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: #999999;
  text-transform: uppercase;
}

.holder-name {
  font-weight: 500;
  color: #222222;
  letter-spacing: 0.04em;
}

/* Copy Button */
.copy-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: var(--text-dark);
  border: 1px solid var(--text-dark);
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.copy-btn:hover {
  background: var(--text-dark);
  color: #ffffff;
}

.copy-btn.is-copied {
  background: #141414;
  color: #ffffff;
  border-color: #141414;
}

/* Thank You Box */
.thank-you-box {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 999px;
  font-size: 11px;
  color: #666666;
  letter-spacing: 0.04em;
}

.heart-icon {
  color: #444444;
}

@media (max-width: 700px) {
  .bank-cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .envelope-section {
    padding: 70px 0 80px;
  }
}
</style>
