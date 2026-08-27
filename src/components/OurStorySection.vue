<script setup lang="ts">
</script>

<template>
  <section id="story" class="story-section">
    <div class="container">
      <div class="story-inner">
        <p class="story-eyebrow">A TIMELESS TALE</p>
        <h2 class="story-title">OUR STORY</h2>
        
        <div class="quote-container">
          <p class="story-quote">
            "From Dublin's rainy cobblestones to the cliffs of Kerry, every step led us to each other."
          </p>
        </div>

        <div class="story-timeline">
          <div class="timeline-entry">
            <span class="year">2018</span>
            <h4>FIRST ENCOUNTER</h4>
            <p>A serendipitous meeting at a cozy Dublin cafe on Grafton Street.</p>
          </div>
          <div class="timeline-entry">
            <span class="year">2023</span>
            <h4>THE PROPOSAL</h4>
            <p>At sunset atop the Cliffs of Moher, amidst the Atlantic breeze.</p>
          </div>
          <div class="timeline-entry">
            <span class="year">2026</span>
            <h4>OUR FOREVER</h4>
            <p>Surrounded by our loved ones at Dunhaven Castle, Kerry.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story-section {
  padding: 90px 0;
  background-color: #faf9f6;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
}

.story-inner {
  max-width: 720px;
  margin: 0 auto;
}

.story-eyebrow {
  font-size: 9.5px;
  letter-spacing: 0.28em;
  color: #777777;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.story-title {
  font-family: var(--font-serif);
  font-size: clamp(30px, 4.5vw, 42px);
  letter-spacing: 0.28em;
  font-weight: 400;
  margin-bottom: 32px;
  margin-right: -0.28em;
}

.story-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  line-height: 1.7;
  color: #444444;
  margin-bottom: 48px;
}

.story-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.timeline-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.year {
  font-family: var(--font-serif);
  font-size: 24px;
  color: #141414;
  margin-bottom: 8px;
}

.timeline-entry h4 {
  font-size: 9.5px;
  letter-spacing: 0.18em;
  color: #141414;
  margin-bottom: 6px;
}

.timeline-entry p {
  font-size: 11px;
  color: #666666;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .story-timeline {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
