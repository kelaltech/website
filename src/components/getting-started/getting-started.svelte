<script lang="ts">
  import globe from '../../assets/images/icons/globe.png'
  import pointer from '../../assets/images/icons/mouse-pointer.png'
  import lightBulb from '../../assets/images/icons/mdi-light_lightbulb.png'
  import smartphone from '../../assets/images/icons/smartphone.png'
  import arrow from '../../assets/images/icons/arrow-right.png'
</script>

<div class="getting-started-container">
  <div class="getting-started-content">
    <h1>How Can we Help You?</h1>

    <div class="getting-started-actions">
      <!-- acction btn-1 -->
      <a
        href={`/request-quote?from=home&value=I want a landing page, website or a blog`}
        class="action-item"
      >
        <img src={globe} alt="" />
        <div>
          <span>I want a landing page, website or a blog</span>
          <img height={24} src={arrow} alt="" />
        </div>
      </a>

      <!-- acction btn-2 -->
      <a href={`/request-quote?from=home&value=I want a custom web app`} class="action-item">
        <img src={pointer} alt="" />
        <div>
          <span>I want a custom web app</span>
          <img height={24} src={arrow} alt="" />
        </div>
      </a>

      <!-- acction btn-3 -->
      <a href={`/request-quote?from=home&value=I want a custom mobile app`} class="action-item">
        <img src={smartphone} alt="" />
        <div>
          <span>I want a custom mobile app</span>
          <img height={24} src={arrow} alt="" />
        </div>
      </a>

      <!-- acction btn-4 -->
      <a
        href={`/request-quote?from=home&value=I want something else. Let me explain…`}
        class="action-item"
      >
        <img src={lightBulb} alt="" />
        <div>
          <span>I want something else. Let me explain…</span>
          <img height={24} src={arrow} alt="" />
        </div>
      </a>
    </div>
  </div>
</div>

<style>
  .getting-started-container {
    width: 100%;
    height: 1024px;
    clip-path: polygon(0 9%, 100% 0%, 100% 91%, 0% 100%);
    background: #0e1c2a;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    /* padding: 32px; */
  }
  .getting-started-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 88px;
    justify-items: center;

    padding: 32px;
  }

  .getting-started-content > h1 {
    text-align: center;
  }

  .getting-started-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    z-index: 999;
  }
  .action-item {
    border: 2px solid #00b478;
    box-sizing: border-box;
    border-radius: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18px;
    color: #fff;
  }

  .action-item:hover {
    text-decoration: none;
  }

  .action-item > img {
    margin-right: 16px;
    height: 24px;
    width: 24px;
  }

  .action-item > div > img {
    margin-left: 16px;
    height: 18px;
  }

  .action-item > div {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  /* small screen */
  @media only screen and (min-width: 640px) {
    .action-item {
      padding: 24px;
    }
    .action-item > img {
      margin-right: 32px;
      height: 48px;
      width: 48px;
    }

    .action-item > div > img {
      margin-left: 48px;
      height: 24px;
      width: 24px;
    }
  }

  /* medium */
  @media only screen and (min-width: 700px) {
    .getting-started-actions {
      grid-template-columns: 1fr 1fr;
    }
  }
  /* large */
  @media only screen and (min-width: 1008px) {
    .action-item {
      padding: 48px;
    }
  }
  /* extra large */
  @media only screen and (min-width: 1295px) {
  }
</style>
