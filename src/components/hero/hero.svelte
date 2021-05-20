<script>
  import Button from '../_shared/button/button.svelte'
</script>

<div class={'hero-container'}>
  <div class="hero-overlay-container">
    <div class={'hero-content-container'}>
      <div class="hero-content">
        <h1 class={'gradient-text hero-lead'}>We empower makers using digital platforms.</h1>
        <div>
          <p>
            <span>Kelal Tech PLC</span> is an international, remote <strong>IT agency</strong> based
            in Ethiopia working on a wide range of software products—from <strong>websites</strong>
            and mobile <strong>apps</strong> to fully integrated <strong>custom systems </strong>
            and <strong>open source</strong> libraries.
          </p>
          <br />
          <span>We’ve got you covered!</span>
        </div>
      </div>

      <div class="hero-content-action">
        <Button>Request a Quote</Button>
        <span>or, <a href="" class={'find-out'}>find out more</a>&nbsp; ↓</span>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-content-action {
    display: flex;
    align-items: flex-start;
    padding-top: 64px;
    flex-direction: column;
  }

  .hero-content-action > span {
    padding: 16px;
    padding-left: 0;
    margin-left: 0;
    color: #0e1c2a;
  }
  .hero-content-action > span > a {
    text-decoration: underline;
    color: #0e1c2a;
  }

  .hero-content .hero-lead {
    font-size: 36px;
    line-height: 36px;
  }

  .find-out:hover {
    color: #00b478;
  }
  .hero-content-container {
    width: 100%;
    padding: 0 32px;
  }

  .hero-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .hero-content > div {
    align-self: flex-end;
    font-size: 16px;
    opacity: 0.84;
    margin-top: 8px;
  }
  .hero-content > div > p > span {
    font-weight: 700;
    color: #00b478;
  }
  .hero-container {
    height: 100vh;
  }
  .hero-overlay-container {
    top: 31px;
    padding-top: 64px;
    width: 100%;
    height: 100vh;
    position: absolute;
    background-image: url('../../assets/images/home-hero-bg.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 483px) {
    .hero-content-action {
      flex-direction: row;
      align-items: center;
    }
    .hero-content-action > span {
      margin-left: 16px;
      padding-left: 16px;
    }
  }
  /* small screen */
  @media only screen and (min-width: 640px) {
    .hero-container {
      height: calc(980px - 112px);
    }

    .hero-overlay-container {
      height: 980px;
      padding-top: 0;
    }

    .hero-content .hero-lead {
      font-size: 70px;
      line-height: 84px;
    }

    .hero-content > div {
      font-size: 18px;
      margin-top: 0;
    }
  }

  /* medium */
  @media only screen and (min-width: 700px) {
  }
  /* large */
  @media only screen and (min-width: 1008px) {
    .hero-content {
      flex-direction: row;
    }
  }
  /* extra large */
  @media only screen and (min-width: 1295px) {
    .hero-content-container {
      padding: 0 128px;
    }
  }
</style>
