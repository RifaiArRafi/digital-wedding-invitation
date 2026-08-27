<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-container">
      <div class="monogram" @click="scrollToTop">
        <span>S & E</span>
      </div>

      <h3 class="footer-names">SETIAWAN & ELMA</h3>
      <p class="footer-date">05 · 09 · 2026 — SENTUL, BOGOR</p>

      <div class="footer-links">
        <a href="#hero" @click.prevent="scrollToTop">BACK TO TOP</a>
      </div>

      <p class="copyright">
        WITH ALL OUR LOVE · DESIGNED WITH ELEGANCE
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #101010;
  color: #ffffff;
  padding: 70px 0 50px;
  text-align: center;
  border-top: 1px solid #1f1f1f;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.monogram {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 11px;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.monogram:hover {
  border-color: #ffffff;
  transform: translateY(-2px);
}

.footer-names {
  font-family: var(--font-serif);
  font-size: 20px;
  letter-spacing: 0.24em;
  font-weight: 400;
  margin-bottom: 8px;
}

.footer-date {
  font-size: 9.5px;
  letter-spacing: 0.2em;
  color: #777777;
  margin-bottom: 28px;
}

.footer-links a {
  font-size: 9px;
  letter-spacing: 0.2em;
  color: #999999;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.copyright {
  margin-top: 36px;
  font-size: 8.5px;
  letter-spacing: 0.24em;
  color: #555555;
}
</style>
