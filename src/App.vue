<script setup lang="ts">
import Counter from './components/CounterItem.vue'
import MenuButton from './components/ui/MenuButton.vue'
import MenuItem from './components/MenuItem.vue'
import { ref, watch } from 'vue'

const menuOpen = ref<boolean>(localStorage.getItem('menuOpen') === 'true')

watch(menuOpen, (newVal) => {
  localStorage.setItem('menuOpen', String(newVal))
})
</script>

<template>
  <div class="app-container">
    <div class="main">
      <Counter :menuOpen="menuOpen" />
      <MenuButton :isOpen="menuOpen" @click="menuOpen = !menuOpen" />
    </div>
    <MenuItem :menuOpen="menuOpen" @close="menuOpen = false" />
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;

  .main {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: width 0.3s ease-in-out;
  }
}
</style>
