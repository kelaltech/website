<div class="step-container">
  <!-- item-1 -->
  <div class="step-item">
    <h1 class="step-title">01</h1>
    <p class={'desc-1'}>
      <span>You describe</span> the project. Together we set the PRD, timeline & pricing.
    </p>

    <p class="desc-2">
      Tell us the idea of the project you have in mind. We will discuss it together to come up with
      the requirements, timeline and pricing.
    </p>

    <a href="#get_started_now">Get started now →</a>
  </div>
  <!-- item-2 -->
  <div class="step-item">
    <h1 class="step-title">02</h1>
    <p class={'desc-1'}>
      <span>We prototype </span> the design. You help us improve it with feeback rounds.
    </p>

    <p class="desc-2">
      We will prepare an initial design based on the project description. With your help we will
      improve the design with a few feeback rounds.
    </p>

    <a href="/request-quote">Find your contact person →</a>
  </div>

  <!-- item-3 -->
  <div class="step-item">
    <h1 class="step-title">03</h1>
    <p class={'desc-1'}>
      <span>We develop</span> the final design. with excellent quality. We deliver on time..
    </p>

    <p class="desc-2">
      Once we have the final design, we get to implmentation and deliver your project as promised.
      Then you’ll tweet great things about us.
    </p>

    <a href="/request-quote">Request a quote →</a>
  </div>
</div>

<style>
  .step-container {
    max-width: 1440px;
    padding: 0 32px;
    margin-top: 64px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .step-item > a {
    color: #00b478;
    font-weight: 500;
  }

  .step-item > h1 {
    width: 50%;
  }

  .step-title {
    font-size: 70px;
    line-height: 84px;
    background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 300 !important;
    margin-bottom: 48px;
  }

  .desc-1 > span {
    color: #00b478;
  }
  .desc-1 {
    font-weight: 700;
    opacity: 0.92;
    font-size: 21px;
    margin-bottom: 32px;
    color: rgba(14, 28, 42, 0.92);
  }

  .desc-2 {
    font-size: 16px;
    color: rgba(14, 28, 42, 0.56);
    margin-bottom: 24px;
  }

  /* small */
  @media only screen and (min-width: 640px) {
    .step-container {
      grid-template-columns: 1fr 1fr;
      margin-top: 106px;
    }
  }

  /* medium */
  @media only screen and (min-width: 700px) {
    .step-container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  /* extra large */
  @media only screen and (min-width: 1295px) {
    .step-container {
      padding: 0 128px;
      gap: 128px;
    }
  }
</style>
