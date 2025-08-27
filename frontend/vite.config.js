import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [remix(), flowbiteReact(), tailwindcss()],
})