import { defineConfig } from 'vite'
import {adorableCSS} from "adorable-css/vite-plugin-adorable-css"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [adorableCSS(), react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  })],
  base: "/wedding_invitation/",
  resolve: {
    alias : { 
      './runtimeConfig' : './runtimeConfig.browser'
    }
  },
})
