import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const getRootAliases = (...aliases: string[]) =>
	Object.fromEntries(
		aliases.map((alias) => [
			`@${alias === 'types' ? 'mainTypes' : alias}`,
			resolve(__dirname, `./src/${alias}`),
		]),
	);

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			...getRootAliases('assets'),
		},
	},
	plugins: [react(), svgr()],
	base: '',
});
