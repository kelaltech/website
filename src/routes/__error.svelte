<script>
  import Button from '../components/_shared/button/button.svelte'
  import pageNotFound from '../assets/images/page-not-found.svg'
</script>

<div class="page-not-found">
  <div class="four">
    <img src={pageNotFound} alt="page not found" />
  </div>

  <div class="btn-container">
    <Button>Go Home</Button>
  </div>
</div>

<style lang="scss">
  .page-not-found {
    padding: 32px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 40vh;

    .four {
      width: 100%;
    }

    .btn-container {
      width: 300px;
      text-align: center;
      display: flex;
      justify-content: center;
    }
    @media only screen and (min-width: 640px) {
      height: 80vh;
      .four {
        width: 80%;
      }
    }

    /* large */
    @media only screen and (min-width: 1008px) {
      height: 100vh;
    }
  }
</style>
