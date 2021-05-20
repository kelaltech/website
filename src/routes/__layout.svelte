<script>
  import Header from '../components/_shared/header/header.svelte'
  import '../assets/styles/_global.css'
  import Footer from '../components/_shared/footer/footer.svelte'
</script>

<Header />

<main>
  <slot />
</main>

<Footer />
