<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'



const isMobileMenuOpen = ref(false)

const scrollTo = (selector: string) => {
  isMobileMenuOpen.value = false
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <!-- Left Navigation -->
      <nav class="nav-links nav-left">
        <a href="#schedule" @click.prevent="scrollTo('#schedule')">SCHEDULE</a>
        <a href="#registry" @click.prevent="scrollTo('#registry')">REGISTRY</a>
      </nav>

      <!-- Center Logo / Couple Names -->
      <div class="brand-title">
        <a href="#" @click.prevent="scrollTo('#hero')">SETIAWAN & ELMA</a>
      </div>

      <!-- Right Navigation -->
      <nav class="nav-links nav-right">
        <a href="#dresscode" @click.prevent="scrollTo('#dresscode')">DRESS CODE</a>
        <a href="#location" @click.prevent="scrollTo('#location')">LOCATION</a>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle Navigation">
        <Menu v-if="!isMobileMenuOpen" :size="20" />
        <X v-else :size="20" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div v-if="isMobileMenuOpen" class="mobile-drawer animate-fade-in">
      <a href="#schedule" @click.prevent="scrollTo('#schedule')">SCHEDULE</a>
      <a href="#registry" @click.prevent="scrollTo('#registry')">REGISTRY</a>
      <a href="#dresscode" @click.prevent="scrollTo('#dresscode')">DRESS CODE</a>
      <a href="#countdown" @click.prevent="scrollTo('#countdown')">COUNTDOWN</a>
      <a href="#location" @click.prevent="scrollTo('#location')">LOCATION</a>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: transparent;
  padding: 38px 0 20px;
}

.header-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
}

.nav-left {
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
  gap: 28px;
}

.nav-links a {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--text-dark);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav-links a:hover {
  opacity: 0.6;
}

.brand-title {
  text-align: center;
  flex: 1.4;
}

.brand-title a {
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.2vw, 28px);
  letter-spacing: 0.32em;
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 400;
  display: inline-block;
  transition: opacity 0.2s ease;
  margin-right: -0.32em;
}

.brand-title a:hover {
  opacity: 0.7;
}

.rsvp-btn {
  background: transparent;
  border: 1px solid rgba(20, 20, 20, 0.7);
  padding: 7px 22px;
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.22em;
  cursor: pointer;
  color: var(--text-dark);
  transition: all 0.25s ease;
}

.rsvp-btn:hover {
  background: var(--text-dark);
  color: #ffffff;
}

.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-dark);
}

.mobile-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 28px 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}

.mobile-drawer a {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-decoration: none;
  color: var(--text-dark);
}

@media (max-width: 900px) {
  .header-container {
    padding: 0 24px;
  }
  .nav-left, .nav-right {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
  .brand-title {
    text-align: left;
    flex: 1;
  }
}
</style>
