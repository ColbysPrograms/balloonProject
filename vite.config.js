import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/balloonProject/' : ''
  //server: {
  //  port: '5173',
  //  allowedHosts: ['balloon.colbysserver.com'],
  //},
})
