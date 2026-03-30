import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const projectName = path.basename(path.dirname(fileURLToPath(import.meta.url)))
const repoName = path.basename(path.dirname(path.dirname(fileURLToPath(import.meta.url))))

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? `/${repoName}/${projectName}/`,
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
