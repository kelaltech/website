<script>
  import { seo } from '../../../lib/seo-store'
  import { get } from 'svelte/store'
</script>

<svelte:head>
  <title>{get(seo).title}</title>
  <meta name="description" content={get(seo).description} />
  <title>Kelal Tech</title>
  <meta name="robots" content="noindex nofollow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <html lang="en" />
</svelte:head>
