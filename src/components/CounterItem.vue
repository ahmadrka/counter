<script lang="ts" setup>
import { ref } from 'vue'
import ButtonCycleLarge from './ui/ButtonCycleLarge.vue'
import ButtonCycleSmall from './ui/ButtonCycleSmall.vue'

const count = ref<number>(
  localStorage.getItem('counter') ? Number(localStorage.getItem('counter')) : 0,
)
const lightOn = ref(false)
const displayOff = ref(false)
let lightTimer: ReturnType<typeof setTimeout> | null = null
let displayTimer: ReturnType<typeof setTimeout> | null = null

const add = () => {
  if (!displayTimer) {
    trigger()
    return
  }
  trigger()
  count.value++
  localStorage.setItem('counter', String(count.value))
}

const resetLongPress = () => {
  count.value = 88888
  localStorage.setItem('counter', String(0))
}

const reset = () => {
  count.value = 0
  localStorage.setItem('counter', String(count.value))
  trigger()
}

const toggleLight = () => {
  if (lightTimer) {
    clearTimeout(lightTimer)
  }

  lightOn.value = true
  trigger()

  lightTimer = setTimeout(() => {
    lightOn.value = false
    lightTimer = null
  }, 5000)
}

const trigger = () => {
  // Trigger vibration (haptic) on supported device/browser
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  } else {
    console.warn('Vibration API not supported on this device/browser.')
  }

  displayOff.value = false

  if (displayTimer) {
    clearTimeout(displayTimer)
  }

  displayTimer = setTimeout(() => {
    displayOff.value = true
    displayTimer = null
  }, 60 * 1000)
}
trigger()
</script>

<template>
  <section class="counter">
    <div :class="['display', { 'light-on': lightOn }, { 'display-off': displayOff }]">
      <span class="placeholder">88888</span>
      <span class="value">{{ String(count).replaceAll('0', 'o') }}</span>
    </div>
    <div class="label">
      <span>RESET</span>
      <span>COUNT</span>
      <span>LIGHT</span>
    </div>
    <div class="buttons">
      <ButtonCycleSmall id="reset" @pointerdown="resetLongPress" @pointerup="reset" />
      <div class="add">
        <ButtonCycleLarge id="add" @pointerdown="add" />
      </div>
      <ButtonCycleSmall id="light" @pointerdown="toggleLight" />
    </div>
  </section>
</template>

<style scoped>
.counter {
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: var(--background-surface);
  box-shadow: var(--emboss-default);
  border-radius: 32px 32px 96px 96px;

  .display {
    position: relative;
    padding: 16px;
    width: max-content;
    color: var(--text-primary);
    background-color: var(--display-background-off);
    font-family: var(--font-display-mini);
    font-weight: normal;
    font-size: 32px;
    line-height: 1;
    letter-spacing: 1;
    border-radius: 16px;
    box-shadow: var(--deboss-display);

    .placeholder {
      color: var(--display-text-shadow);
    }

    .value {
      color: var(--display-text-off);
      right: 1.6rem;
      position: absolute;
      text-shadow: var(--text-shadow-display);
    }
  }

  .display.light-on {
    background-color: var(--display-background-on);
    .value {
      color: var(--display-text-on);
      mix-blend-mode: overlay;
    }
  }

  .display.display-off {
    .placeholder {
      color: transparent;
    }

    .value {
      color: transparent;
      text-shadow: none;
    }
  }

  .label {
    width: 100%;
    padding: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background-label);
    border-radius: 4px;
    box-shadow: var(--deboss-label);

    span {
      color: var(--label);
      font-size: 8px;
      text-shadow: var(--text-shadow-label);
    }
  }

  .buttons {
    width: 100%;
    padding-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: start;

    .add {
      padding-top: 16px;
    }
  }
}
</style>
