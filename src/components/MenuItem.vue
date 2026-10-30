<script setup lang="ts">
import { IconBrandFigma, IconExternalLink, IconRestore, IconWorld } from '@tabler/icons-vue'
import IconBrandGithub from './icons/IconBrandGithub.vue'
import { ref, watchEffect } from 'vue'
import { hexModification } from './helper/colorConverter.ts'

defineProps<{ menuOpen: boolean }>()

const value = ref({
  displayColor: '',
  buttonColor: '',
})

if (localStorage.getItem('value')) {
  value.value = JSON.parse(localStorage.getItem('value') || '{}')
}

watchEffect(() => {
  document.documentElement.style.setProperty('--display-background-on', value.value.displayColor)

  document.documentElement.style.setProperty('--background-surface', value.value.buttonColor)

  localStorage.setItem('value', JSON.stringify(value.value))
})
</script>

<template>
  <Transition name="menu-transition">
    <div v-if="menuOpen" class="menu">
      <div class="content">
        <div class="handle"></div>
        <span class="title">Digital Tally Counter</span>
        <menu class="lists">
          <li class="list-item">
            <label
              class="input"
              v-on:change="
                (e) =>
                  (value.displayColor = hexModification((e.target as HTMLInputElement).value, {
                    s: 30,
                    l: 40,
                  }))
              "
            >
              <span class="label">Display Color</span>
              <span
                class="color-preview"
                style="background-color: var(--display-background-on)"
              ></span>
              <input type="color" />
            </label>
            <button class="reset" @click="value.displayColor = ''">
              <IconRestore class="icon" />
            </button>
          </li>
          <li class="list-item">
            <label
              class="input"
              v-on:change="(e) => (value.buttonColor = (e.target as HTMLInputElement).value)"
            >
              <span class="label">Button Color</span>
              <span
                class="color-preview"
                style="background-color: var(--background-surface)"
              ></span>
              <input type="color" />
            </label>
            <button class="reset" @click="value.buttonColor = ''">
              <IconRestore class="icon" />
            </button>
          </li>
        </menu>
        <menu class="lists">
          <li class="list-item">
            <a
              class="button"
              target="_blank"
              href="https://www.figma.com/community/file/1697307824979341120"
            >
              <span class="label">
                <IconBrandFigma class="icon" />
                See Figma Design
              </span>
              <IconExternalLink class="icon" />
            </a>
          </li>
          <li class="list-item">
            <a class="button" target="_blank" href="https://github.com/ahmadrka/counter">
              <span class="label">
                <IconBrandGithub class="icon" />
                See GitHub Repository
              </span>
              <IconExternalLink class="icon" />
            </a>
          </li>
          <li class="list-item">
            <a class="button" target="_blank" href="https://ahmadrka.com">
              <span class="label">
                <IconWorld class="icon" />
                Visit Ahmadrka Web
              </span>
              <IconExternalLink class="icon" />
            </a>
          </li>
        </menu>
      </div></div
  ></Transition>
</template>

<style scoped>
.menu {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  flex-shrink: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--menu-primary);
  font-family: var(--font-primary);
  transform: translateX(0);

  .content {
    flex-shrink: 0;
    width: 402px;
    padding: 18px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background-color: var(--background-menu);
    border-radius: 32px;
    box-shadow: var(--default-shadow);

    .handle {
      display: none;
      width: 50px;
      height: 5px;
      background-color: var(--handle-color);
      border-radius: 100px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .lists {
      width: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 14px;
      list-style: none;
      overflow: hidden;

      .list-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        background-color: var(--background-menu-button);

        .input {
          width: 100%;
          padding: 12px 6px 12px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          cursor: pointer;

          .color-preview {
            width: 24px;
            height: 24px;
            border: none;
            padding: 0;
            background: none;
            cursor: pointer;
            border-radius: 4px;
            background-color: black;
            box-shadow: var(--deboss-label);
          }

          input {
            display: none;
          }
        }

        .reset {
          padding: 12px 12px 12px 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: inherit;
          background-color: transparent;
          cursor: pointer;
        }

        .button {
          width: 100%;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: inherit;
          background: transparent;
          cursor: pointer;

          span {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

.label {
  font-size: 1.6rem;
  font-weight: 500;
  gap: 12px;
}

.icon {
  width: 2.4rem;
  height: 2.4rem;
}

.menu-transition-enter-active {
  transition: transform 0.5s ease-out;
}

.menu-transition-leave-active {
  transition: transform 0.5s ease-in;
}

.menu-transition-enter-from,
.menu-transition-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .menu {
    position: fixed;
    height: fit-content;
    left: 0;
    right: 0;
    bottom: 0;
    top: unset;
    flex-shrink: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--menu-primary);
    font-family: var(--font-primary);
    transform: translateY(0);

    .content {
      width: 100%;
      border-radius: 32px 32px 0 0;

      .handle {
        display: block;
      }
    }
  }

  .menu-transition-enter-from,
  .menu-transition-leave-to {
    transform: translateY(100%);
  }
}
</style>
