import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static'
import { optimizeDeps } from 'vite';
/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		
		// TODO when deploying you might need some of the configs to be active 
		// router: false,
		// hydrate: false,
		// prerender: {
		//   enabled: true,
		//   crawl: true,
		// },
		// amp: false,

		vite:()=>{
			{
				['nodemailer']
			}
		}
	}
};

export default config;
