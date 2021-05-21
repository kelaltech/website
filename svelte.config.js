import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({}),
    target: '#svelte',
    router: false,
    hydrate: false,
    prerender: {
      enabled: true,
      crawl: true,
    },
    amp: false,
    vite: {
      optimizeDeps: {
        include: ['nodemailer'],
      },
    },
  },
}

export default config
