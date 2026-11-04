import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true
    },
    test: {
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
        include: ['src/**/*.test.{js,jsx}'],
    },
})
