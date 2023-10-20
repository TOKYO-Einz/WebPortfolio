import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    reporters: ["junit"],
    outputFile: "./rspec.xml"
  },
  // ...(process.env.NODE_ENV === 'development'
  //   ? {
  //     define: {
  //       global: {},
  //     },
  //   }
  //   : {}),
  // resolve: {
  //   alias: {
  //     ...(process.env.NODE_ENV !== 'development'
  //       ? {
  //         './runtimeConfig': './runtimeConfig.browser'
  //       }
  //       : {}),
  //   },
  // },
})

