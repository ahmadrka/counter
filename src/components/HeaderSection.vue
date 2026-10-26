<script setup lang="ts">
import IconBrandGithub from './icons/IconBrandGithub.vue'
</script>

<template>
  <header>
    <div>
      <h1>Counter</h1>
    </div>
    <div>
      <a href="https://github.com/ahmadrka/" target="_blank">
        <button title="See Repository"><IconBrandGithub /></button>
      </a>
    </div>
  </header>
</template>

<style scoped>
header {
  top: 0.8rem;
  left: 0.8rem;
  position: fixed;
  background-color: var(--background-surface);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
}

h1 {
  color: var(--text-primary);
}

button {
  background-color: var(--background-surface);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
</style>
