<script>
  import FilterChip from '../components/_shared/filter-chip/filter-chip.svelte'
  import bg from '../assets/images/news-hero-bg.svg'
  import searchIcon from '../assets/images/icons/search.svg'
  import NewsCardH from '../components/_shared/news-card-H/news-card-H.svelte'
  import NewsCard from '../components/_shared/news-card/news-card.svelte'
  import Subscribe from '../components/_shared/subscribe/subscribe.svelte'
  import SocialMedia from '../components/_shared/social-media-links/social-media-links.svelte'
</script>

<div class="newsletter-container">
  <div class="newsletter-container-overlay">
    <img src={bg} alt="news letter background" />
  </div>

  <div class="newsletter-hero-content">
    <div class="content-hero">
      <h1 class="h1-700">Newsletter</h1>
      <span class="small-400">Articles on everything Kelal Tech, and more.</span>
    </div>

    <div class="newsletter-filter">
      <div class="filter">
        <FilterChip active>ALL</FilterChip>
        <FilterChip>INTERNAL NEWS</FilterChip>
        <FilterChip>TECHNOLOGY</FilterChip>
        <FilterChip>ANNOUNCEMENT</FilterChip>
      </div>

      <div class="search-box">
        <img width={24} height={24} src={searchIcon} alt="search bar" />
        <input placeholder={'Search'} type="search" />
      </div>
    </div>
  </div>
</div>
<div class="news-card-list">
  <div class="featured-news">
    <NewsCardH />
  </div>

  <div class={'home-news-container'}>
    <div class="news-card-box">
      <NewsCard />
      <NewsCard />
    </div>

    <div class="newsletter-contact">
      <div class="news-card-links">
        <div>
          <h3 class="h3-700">Subscribe</h3>
          <Subscribe />
        </div>

        <div class="social-media-box">
          <h6 class="default-400">Follow us</h6>
          <SocialMedia />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .newsletter-container {
    width: 100%;
    position: relative;
    height: 860px;
  }

  .newsletter-container-overlay {
    width: 100%;
    position: absolute;
    top: -102px;
    z-index: -1;
    height: 100vh;

    img {
      width: 100%;
      height: inherit;
      object-fit: cover;
    }
  }

  .newsletter-hero-content {
    padding: 32px 32px 93px 32px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    max-width: 1440px;
    margin: 0 auto;
    .content-hero {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .newsletter-filter {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .filter {
        display: flex;
        flex-wrap: wrap;
      }

      .search-box {
        position: relative;
        margin-bottom: 16px;

        box-shadow: 0 0 1px rgba(14, 14, 14, 0.5);
        border-radius: 14px;

        img {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          height: 36px;
          width: 280px;
          border-radius: 14px;
          padding: 8px;
          padding-left: 33px;
          outline: none;
          border: 0;

          &::placeholder {
            color: #0e1c2a;
            opacity: 0.56;
          }
        }
      }
    }
  }

  .news-card-list {
    max-width: 1440px;
    margin: 0 auto;
    margin-top: -450px;
    padding: 0 32px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    z-index: 1;
    .featured-news {
      width: 100%;
    }

    .home-news-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      margin-bottom: 52px;
    }

    .news-card-box {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
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

        h3 {
          margin-top: 0;
          margin-bottom: 32px;
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
  }

  @media only screen and (min-width: 750px) {
    .newsletter-container {
      height: 860px;
    }

    .newsletter-container-overlay {
      height: inherit !important;
    }
    .news-card-box {
      grid-template-columns: 1fr 1fr !important;
      gap: 64px;
    }
  }

  /* medium */
  @media only screen and (min-width: 890px) {
    .search-box {
      margin: 0;
      box-shadow: none !important;
    }
  }
  /* large */
  @media only screen and (min-width: 1008px) {
    .home-news-container {
      grid-template-columns: 3fr 1fr !important;
      gap: 64px !important;
    }

    .space {
      display: block !important;
    }
  }
  /* extra large */
  @media only screen and (min-width: 1295px) {
    .newsletter-hero-content {
      padding: 96px 128px 93px 128px;
    }
    .news-card-list {
      padding: 0 128px;
    }
  }
</style>
