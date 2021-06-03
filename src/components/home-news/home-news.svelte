<script>
  import NewsCard from '../_shared/news-card/news-card.svelte'
  import SocialMedia from '../_shared/social-media-links/social-media-links.svelte'
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
      <a href="/articles" class="default-500 primary">View all articles →</a>

      <div class="subscribe-form">
        <h6 class="default-400">Get articles in your inbox when they get published here.</h6>
        <form action="">
          <label for="subscribe-form">YOUR EMAIL:</label>
          <input type="email" required name="subscribe-form" id="news-subscribe" />

          <button class="default-500">SUBSCRIBE NOW →</button>
        </form>
      </div>

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

      .subscribe-form {
        h6 {
          margin: 0;
          margin-bottom: 32px;
          opacity: 0.56;
        }

        form {
          label {
            display: block;
            margin-bottom: 8px;
            opacity: 0.56;
          }

          input {
            height: 40px;
            width: 100%;
            border: 0;
            outline: none;
            background: #f8f8f8;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
            border-radius: 7px;
            padding: 0 4px;
          }

          button {
            margin-top: 24px;
            padding: 8px 4px;
            border: 0;
            outline: none;
            background-color: transparent;
            box-sizing: content-box;
            border-image-slice: 1;
            transition: 0.25s;
            border-radius: 7px;
            &:hover {
              background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }

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
