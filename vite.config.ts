import react from '@vitejs/plugin-react'
import path from 'path'
import { AliasOptions, defineConfig } from 'vite'

const alias: AliasOptions = {}

const aliasPaths = ['pages', 'widgets', 'features', 'entities', 'shared']

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
		})
	],
	resolve: { alias }
})
