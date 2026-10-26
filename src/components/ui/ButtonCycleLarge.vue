<template>
  <button class="button"></button>
</template>

<style scoped>
.button {
  width: 96px;
  height: 96px;
  background-color: var(--background-button);
  box-shadow: var(--emboss-button);
  border-radius: 100px;
  border: none;
  transition: all 150ms ease-out;
  cursor: pointer;
}

.button:active {
  background-color: var(--background-button-pressed);
  box-shadow: var(--emboss-button-pressed);
}
</style>
