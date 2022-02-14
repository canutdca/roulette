import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'_core': path.resolve(__dirname, './src/_core'),
			'_shared': path.resolve(__dirname, './src/_shared'),
			'pages': path.resolve(__dirname, './src/pages'),
			'contexts': path.resolve(__dirname, './src/contexts')
		},
	},
})
