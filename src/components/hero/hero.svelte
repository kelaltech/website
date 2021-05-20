<script>
  import Button from '../_shared/button/button.svelte'
</script>

<div class={'hero-container'}>
  <div class="hero-overlay-container">
    <div class={'hero-content-container'}>
      <div class="hero-content">
        <h1 class={'gradient-text'}>We empower makers using digital platforms.</h1>
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
        <Button>
          Request a Quote
        </Button>
        <span>or, <a href="" class={'find-out'}>find out more</a>&nbsp; ↓</span>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-content-action {
    display: flex;
    align-items: center;
    padding-top: 64px;
  }

  .hero-content-action > span {
    padding: 16px;
    margin-left: 16px;
    color: #0e1c2a;
  }
  .hero-content-action > span > a {
    text-decoration: underline;
    color: #0e1c2a;
  }

  .find-out:hover {
    color: #00b478;
  }
  .hero-content-container {
    width: 100%;
    padding: 0 128px;
  }

  .hero-content {
    display: flex;
    justify-content: space-between;
  }
  .hero-content > h1 {
    font-weight: 700;
  }

  .hero-content > div {
    align-self: flex-end;
    font-size: 18px;
    opacity: 0.84;
  }
  .hero-content > div > p > span {
    font-weight: 700;
    color: #00b478;
  }
  .hero-container {
    overflow: hidden;
    height: calc(980px - 112px);
  }
  .hero-overlay-container {
    top: 31px;
    width: 100%;
    height: 980px;
    position: absolute;
    background-image: url('../../assets/images/home-hero-bg.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
