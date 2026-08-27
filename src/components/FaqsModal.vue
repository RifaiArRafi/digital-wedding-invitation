<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const activeFaq = ref<number | null>(0)

const faqs = [
  {
    q: 'WHAT TIME SHOULD I ARRIVE AT DUNHAVEN CASTLE?',
    a: 'We kindly request guests to arrive at the Castle Courtyard between 3:15 PM and 3:45 PM. The ceremony will commence promptly at 4:00 PM.'
  },
  {
    q: 'IS THERE PARKING AVAILABLE ON SITE?',
    a: 'Yes, complimentary valet and self-parking are provided on the north grounds of Dunhaven Castle for all wedding guests.'
  },
  {
    q: 'CAN I BRING A PLUS ONE?',
    a: 'Your personalized invitation card notes the exact number of seats reserved in your honor. If you have any special questions, please reach out to us directly.'
  },
  {
    q: 'ARE CHILDREN WELCOME?',
    a: 'While we love your little ones, our wedding celebration will be an adults-only event, with the exception of immediate family in the bridal party.'
  },
  {
    q: 'CAN I TAKE PHOTOS DURING THE CEREMONY?',
    a: 'We are having an "unplugged" ceremony so everyone can be fully present. Our professional photographers will capture every moment. Feel free to snap as many photos and videos as you like during cocktail hour and the reception!'
  }
]

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card animate-fade-in">
      <div class="modal-header">
        <div>
          <p class="eyebrow">HELPFUL INFORMATION</p>
          <h2 class="modal-title">FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>

      <div class="faq-list">
        <div 
          v-for="(item, index) in faqs" 
          :key="index"
          class="faq-item"
          :class="{ open: activeFaq === index }"
        >
          <button class="faq-question" @click="toggleFaq(index)">
            <span>{{ item.q }}</span>
            <ChevronDown :size="16" class="arrow-icon" />
          </button>
          <div v-if="activeFaq === index" class="faq-answer animate-fade-in">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-editorial" @click="emit('close')">GOT IT</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(8px);
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #ffffff;
  max-width: 580px;
  width: 100%;
  padding: 38px 34px;
  border: 1px solid #141414;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  max-height: 85vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 18px;
  margin-bottom: 24px;
}

.eyebrow {
  font-size: 8.5px;
  letter-spacing: 0.28em;
  color: #777777;
  margin-bottom: 6px;
}

.modal-title {
  font-family: var(--font-serif);
  font-size: 22px;
  letter-spacing: 0.16em;
  font-weight: 400;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 26px;
  cursor: pointer;
  line-height: 1;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.faq-item {
  border: 1px solid #e8e8e8;
  transition: border-color 0.2s ease;
}

.faq-item.open {
  border-color: #141414;
}

.faq-question {
  width: 100%;
  background: transparent;
  border: none;
  padding: 14px 16px;
  text-align: left;
  font-family: var(--font-sans);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #141414;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.faq-item.open .arrow-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 16px 16px;
  font-size: 12px;
  line-height: 1.6;
  color: #555555;
}

.modal-footer {
  text-align: center;
}
</style>
