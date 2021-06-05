<script>
  import NewsCard from '../_shared/news-card/news-card.svelte'
  import SocialMedia from '../_shared/social-media-links/social-media-links.svelte'
  import Subscribe from '../_shared/subscribe/subscribe.svelte'
</script>

<div class={'home-news-container'}>
  <div class="home-news-box">
    <h1 class="h1-700">Newsletter</h1>
    <div class="news-card-box">
      <NewsCard />
      <NewsCard />
    </div>
  </div>

  <div class="newsletter-contact">
    <span class="space" />
    <div class="news-card-links">
      <a href="/newsletter" class="default-500 primary">View all articles →</a>

      <Subscribe />

      <div class="social-media-box">
        <h6 class="default-400">Follow us</h6>
        <SocialMedia />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .home-news-container {
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    max-width: 1440px;
    margin: 0 auto;
    margin-bottom: 52px;
  }

  .home-news-box {
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;

    h1 {
      opacity: 0.84;
      width: 177px;
    }
    .news-card-box {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  .newsletter-contact {
    display: flex;
    flex-direction: column;

    .space {
      height: 48px;
      margin-bottom: 64px;
      display: none;
    }
    .news-card-links {
      display: grid;
      grid-template-columns: 1fr;
      gap: 64px;

      .social-media-box {
        h6 {
          opacity: 0.56;
          margin: 0;
          margin-bottom: 24px;
        }
      }
    }
  }

  @media only screen and (min-width: 483px) {
  }
  /* small screen */
  @media only screen and (min-width: 640px) {
  }

  @media only screen and (min-width: 750px) {
    .news-card-box {
      grid-template-columns: 1fr 1fr !important;
      gap: 64px;
    }
  }

  /* medium */
  @media only screen and (min-width: 925px) {
  }
  /* large */
  @media only screen and (min-width: 1008px) {
    .home-news-container {
      grid-template-columns: 3fr 1fr;
      gap: 64px;
    }

    .space {
      display: block !important;
    }
  }
  /* extra large */
  @media only screen and (min-width: 1295px) {
    .home-news-container {
      padding: 128px;
    }
  }
</style>
