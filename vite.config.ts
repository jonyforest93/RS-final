import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/app/components',
      pages: '/src/app/pages',
      router: '/src/app/router',
      services: '/src/app/services',
      types: '/src/app/types',
      utils: '/src/app/utils',
      api: '/src/app/api',
      hooks: '/src/app/hooks',
      'node-fetch': 'isomorphic-fetch',
    },
  },
  define: {
    global: {},
  },
})
