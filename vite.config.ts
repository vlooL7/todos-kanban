import react from '@vitejs/plugin-react'
import path from 'path'
import { AliasOptions, defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

const alias: AliasOptions = {}

const aliasPaths = ['routes', 'widgets', 'features', 'entities', 'shared']

aliasPaths.forEach(aliasPath => {
	alias[aliasPath] = path.resolve(__dirname, 'src', aliasPath)
})

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				babelrc: true
			}
		}),
		TanStackRouterVite()
	],
	resolve: { alias }
})
