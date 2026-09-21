import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // This will print directly inside Vercel's Build Logs during compilation
  console.log('>>> VERCEL BUILD ENV CHECK:', env.VITE_API_KEY ? 'FOUND' : 'MISSING');

  return {
    plugins: [
      react(), 
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src") 
      }
    }
  }
});
