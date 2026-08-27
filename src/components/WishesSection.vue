<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { WishMessage } from '../types/wedding'
import { Send } from 'lucide-vue-next'

const props = defineProps<{
  initialName?: string
}>()

const defaultWishes: WishMessage[] = [
  {
    id: '1',
    name: 'Eleanor & Marcus',
    message: 'Wishing you both a lifetime of immense joy, boundless adventures, and endless love!',
    date: 'July 2, 2026'
  },
  {
    id: '2',
    name: 'Charlotte Vance',
    message: 'Cannot wait to witness your vows in Kerry. You two are meant for each other!',
    date: 'June 28, 2026'
  },
  {
    id: '3',
    name: 'Liam & Siobhan',
    message: 'Counting down the days to celebrate Brian and Megan! Sláinte!',
    date: 'June 24, 2026'
  }
]

const wishes = ref<WishMessage[]>([])
const senderName = ref('')
const senderMessage = ref('')

onMounted(() => {
  const saved = localStorage.getItem('wedding_wishes')
  if (saved) {
    wishes.value = JSON.parse(saved)
  } else {
    wishes.value = defaultWishes
  }

  if (props.initialName && props.initialName !== 'Honored Guest') {
    senderName.value = props.initialName
  }
})

const addWish = () => {
  if (!senderName.value.trim() || !senderMessage.value.trim()) return

  const newWish: WishMessage = {
    id: Date.now().toString(),
    name: senderName.value.trim(),
    message: senderMessage.value.trim(),
    date: 'Just now'
  }

  wishes.value.unshift(newWish)
  localStorage.setItem('wedding_wishes', JSON.stringify(wishes.value))

  senderMessage.value = ''
}
</script>

<template>
  <section class="wishes-section">
    <div class="container">
      <div class="wishes-inner">
        <p class="wishes-eyebrow">WORDS OF LOVE</p>
        <h2 class="wishes-title">GUESTBOOK & WISHES</h2>

        <!-- Submit Form -->
        <form @submit.prevent="addWish" class="wish-form">
          <div class="input-row">
            <input 
              v-model="senderName" 
              type="text" 
              placeholder="Your Name" 
              required 
              class="text-input name-input"
            />
            <button type="submit" class="btn-editorial submit-wish-btn">
              <Send :size="12" style="margin-right: 4px; display: inline-block; vertical-align: -1px;" />
              SEND WISH
            </button>
          </div>
          <textarea 
            v-model="senderMessage" 
            placeholder="Share your congratulations, blessings, or sweet memories with the couple..." 
            required 
            rows="2"
            class="text-input msg-input"
          ></textarea>
        </form>

        <!-- Wishes Carousel / Grid -->
        <div class="wishes-grid">
          <div 
            v-for="item in wishes" 
            :key="item.id" 
            class="wish-bubble animate-fade-in"
          >
            <div class="wish-header">
              <span class="wish-name">{{ item.name }}</span>
              <span class="wish-date">{{ item.date }}</span>
            </div>
            <p class="wish-text">"{{ item.message }}"</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wishes-section {
  padding: 90px 0 100px;
  background-color: var(--bg-primary);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.wishes-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.wishes-eyebrow {
  font-size: 9.5px;
  letter-spacing: 0.28em;
  color: #777777;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.wishes-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4.5vw, 40px);
  letter-spacing: 0.24em;
  font-weight: 400;
  margin-bottom: 40px;
  margin-right: -0.24em;
}

.wish-form {
  max-width: 580px;
  margin: 0 auto 50px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-row {
  display: flex;
  gap: 12px;
}

.name-input {
  flex: 1;
}

.submit-wish-btn {
  padding: 10px 20px;
  white-space: nowrap;
}

.text-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d4d4d4;
  background: #fafafa;
  font-family: var(--font-sans);
  font-size: 12px;
  color: #141414;
  outline: none;
  transition: border-color 0.2s ease;
}

.text-input:focus {
  border-color: #141414;
  background: #ffffff;
}

.msg-input {
  resize: vertical;
}

.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  text-align: left;
}

.wish-bubble {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  padding: 22px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.wish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}

.wish-name {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 500;
  color: #141414;
  letter-spacing: 0.05em;
}

.wish-date {
  font-size: 9px;
  color: #999999;
  letter-spacing: 0.08em;
}

.wish-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 13.5px;
  line-height: 1.6;
  color: #555555;
}

@media (max-width: 600px) {
  .input-row {
    flex-direction: column;
  }
}
</style>
