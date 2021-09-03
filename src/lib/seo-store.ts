import { writable } from 'svelte/store'

export const seo = writable<{
  title: string
  description?: string
}>({
  title: 'Kelal Tech PLC',
  description: `Kelal Tech PLC is an international, remote IT agency based in Ethiopia working on a wide range of software products—from websites and mobile apps to fully integrated custom systems and open source libraries.`, // default description
})
