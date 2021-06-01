<script lang="ts">
  import globe from '../../assets/images/icons/globe.svg'
  import pointer from '../../assets/images/icons/mouse-pointer.svg'
  import lightBulb from '../../assets/images/icons/mdi-light_lightbulb.svg'
  import smartphone from '../../assets/images/icons/smartphone.svg'
  import arrow from '../../assets/images/icons/arrow-right.svg'
  // import share from '../../assets/images/icons/share.svg'
  import Share from '../_shared/share/share.svelte'
</script>

<div class="get-start-box" id="get_started_now">
  <div class="getting-started-container">
    <div class="getting-started-content">
      <div class={'getting-started-header-box'}>
        <h1>How Can we Help You?</h1>
        <div class="share-btn">
          <Share />
        </div>
      </div>

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

  <div class="clip-path-match-footer" />
</div>

<style lang="scss">
  .getting-started-header-box {
    display: flex;
    width: 100%;
  }
  .getting-started-header-box > h1 {
    flex: 80%;
    text-align: center;
  }
  .getting-started-header-box > .share-btn {
    align-self: center;
  }
  .get-start-box {
    position: relative;
    width: 100%;
    height: auto;
  }

  .clip-path-match-footer {
    position: absolute;
    bottom: 0;
    z-index: -1;
    background: #fbfbfb;

    width: 100%;
    height: 200px;
  }
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
    transition: 0.25s;
    &:hover {
      text-decoration: none;

      box-shadow: 0 0.5em 0.5em -0.4em #00b478;
      transform: translateY(-0.25em);
    }
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
