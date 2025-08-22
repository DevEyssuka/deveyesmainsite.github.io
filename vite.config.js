import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default конфиг
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
