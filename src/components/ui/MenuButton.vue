<script setup lang="ts">
import { IconMenu2, IconX } from '@tabler/icons-vue'

defineProps<{
  isOpen: boolean
  onClick: () => void
}>()
</script>

<template>
  <button :class="['menu-button', { open: isOpen }]" @click="onClick">
    <Transition name="fade" mode="out-in">
      <IconMenu2 class="icon" v-if="!isOpen" />
      <IconX class="icon" v-else />
    </Transition>
  </button>
</template>

<style scoped>
.menu-button {
  position: fixed;
  z-index: 10;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--menu-primary);
  background-color: var(--background-menu);
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: var(--default-shadow);
  transition: transform 0.5s ease-in;

  .icon {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 768px) {
  .menu-button {
    position: fixed;
  }

  .open {
    transform: translateY(-389px);
    transition: transform 0.5s ease-out;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
