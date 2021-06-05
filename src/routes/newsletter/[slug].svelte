<script>
  import FilterChip from '../../components/_shared/filter-chip/filter-chip.svelte'
  import Subscribe from '../../components/_shared/subscribe/subscribe.svelte'
  import SocialMedia from '../../components/_shared/social-media-links/social-media-links.svelte'
  import bg from '../../assets/images/article-card-img.png'
  import {
    Email,
    Reddit,
    LinkedIn,
    Telegram,
    Facebook,
    Twitter,
  } from 'svelte-share-buttons-component'

  // TODO change these values
  const url = 'https://kelaltech.com/request-quote'
  const title = 'Kelal Tech PLC Official Website'
  const desc = `Want to make a deal with us?Looking for some information? Or, just want to chat? We'd be very happy to hear from you.`
</script>

<div>
  <div class={'img-container'}>
    <img src={bg} alt="news bg" />
  </div>

  <div class="article-header-box">
    <div class={'category-box'}>
      <FilterChip active>ANNOUNCEMENT</FilterChip>
    </div>
    <div class="article-header">
      <h1 class="h0-700">
        Kelal Tech Gets a New Brand & Website Refresh Kelal Tech Gets a New Brand & Website
      </h1>
      <div class="header-action">
        <span class="large-300 primary-dark">September 9, 2013</span>
        <div class="share-icons-box">
          <div class="wrap-icon">
            <Email subject={title} body="{desc} {url}" />
          </div>
          <div class="wrap-icon">
            <LinkedIn class="share-button" {url} />
          </div>
          <div class="wrap-icon">
            <Facebook class="share-button" {url} />
          </div>
          <div class="wrap-icon">
            <Twitter
              class="share-button"
              text={title}
              {url}
              hashtags="github,svelte"
              via="username"
              related="other,users"
            />
          </div>

          <div class="wrap-icon">
            <Telegram class="share-button" text={title} {url} />
          </div>

          <div class="wrap-icon">
            <Reddit class="share-button" {title} {url} />
          </div>
        </div>
      </div>
    </div>

    <div class={'article-desc'}>
      <p class="deafult-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat amet, tempor
        fringilla ut risus. Massa nisl pellentesque dui, lorem ullamcorper eleifend in risus
        imperdiet. Elementum semper odio velit tempus vitae faucibus neque. Velit velit vitae,
        gravida pharetra consectetur. Nulla in etiam nunc convallis cursus parturient. Urna velit,
        porta amet, ridiculus convallis maecenas. Sagittis, vitae adipiscing et nunc tempus at
        commodo. Vel donec sem lectus pulvinar vel felis, nunc. Congue mattis diam amet, diam quam.
        Habitasse diam sed morbi duis tempus, faucibus porttitor. Augue lectus etiam quis orci velit
        lacinia sapien. Maecenas blandit nibh pellentesque massa eget et dictum pellentesque nisl.
        Cursus lacus, suscipit quam laoreet laoreet eget feugiat orci, mollis. Massa viverra tortor
        mus urna ornare metus erat tincidunt duis. Turpis leo morbi ipsum vestibulum adipiscing
        fermentum a non est. Quisque ut pulvinar in adipiscing amet. Lacinia at lorem sem cras.
        Tempor sed porttitor id a placerat imperdiet dictum. Bibendum sodales natoque diam egestas
        nunc. Ut augue tempor commodo vulputate molestie turpis. Et id ante neque, risus aliquam,
        nullam. Suspendisse scelerisque massa, morbi quam id curabitur scelerisque quisque. Nulla
        cursus mollis nibh quam. Sit aliquet eget vestibulum arcu. Sem varius duis feugiat at diam
        velit. Enim velit turpis velit turpis in sollicitudin in. Est mauris interdum quis sit. Nibh
        augue cursus at id quisque facilisis neque sed. Praesent eleifend eget enim posuere
        dignissim elementum. Semper tempus pulvinar at ultrices eget magna ac laoreet. Sed volutpat
        in iaculis velit quisque elit sed phasellus lobortis. Vitae habitasse sed euismod purus
        pellentesque fermentum consequat. Maecenas enim duis facilisi sed elementum. Dictum
        condimentum maecenas urna, in tortor nullam. Massa dignissim turpis tellus laoreet enim ac,
        consectetur quis. At rutrum adipiscing dignissim sagittis. Et etiam lacus, amet magna sit
        malesuada leo. Ornare lectus consequat neque eget cursus nec. Augue pretium amet, interdum
        ullamcorper ultrices viverra massa viverra. Cursus laoreet maecenas faucibus sit egestas
        mattis et. Quis nunc cursus risus risus semper. Mattis faucibus velit diam tempus aliquam
        porttitor sit. Massa morbi integer vel tellus. At sed hendrerit erat a non blandit habitasse
        mi. Risus dui magna enim tempor enim. Dictum risus lacinia purus neque vitae consectetur
        elementum urna. Sem pellentesque lorem erat libero nunc egestas tempus sed at. Quis quis
        posuere nunc interdum tempus tortor et, risus. Viverra eget velit, ornare sed scelerisque
        tempor. Augue tortor nec tristique eget volutpat molestie lectus. Pharetra eleifend aliquet
        ultrices enim mauris facilisis in commodo in. Tempor egestas pellentesque libero praesent
        velit. Nec habitant a mattis malesuada pulvinar. Ac ipsum id lobortis nullam vitae. Sit
        consectetur sit porta ac imperdiet arcu fusce sit. At amet consectetur ac proin ultrices
        faucibus velit posuere cras. Scelerisque erat elit aenean enim. Odio adipiscing nunc
        pellentesque accumsan molestie integer. Dui velit, feugiat mi velit gravida sapien fames.
      </p>
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
</div>

<style lang="scss">
  .img-container {
    width: 100%;
    height: 620px;
    clip-path: polygon(0 0%, 100% 0%, 100% 91%, 0% 100%);
    img {
      width: 100%;
      height: inherit;
      object-fit: cover;
    }
  }

  .article-header-box {
    margin-top: 32px;
    margin-bottom: 176px;
    padding: 0 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;

    .category-box {
      text-align: right;
    }

    .article-header {
      h1 {
        margin-bottom: 12px;
        font-size: 32px;
        line-height: 48px;
      }
      .header-action {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        span {
          opacity: 0.56;
        }
      }
    }

    .article-desc {
      display: grid;
      grid-template-columns: 1fr;
      gap: 64px;

      p {
        font-size: 20px;
        line-height: 35px;
        font-family: 'Lora';
      }
    }
  }

  .share-icons-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    .wrap-icon {
      margin-right: 16px;
      border-radius: 2px;
      width: 32px;
      height: 32px;
      background-color: red;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      &:last-child {
        margin: 0;
      }
    }

    @media only screen and (min-width: 550px) {
      margin-top: 0;
    }
  }

  /* medium */
  @media only screen and (min-width: 700px) {
    .article-header-box {
      padding: 0 32px;
    }
    .article-header {
      h1 {
        font-size: 48px !important;
        line-height: 72px !important;
      }
    }
  }

  /* medium */
  @media only screen and (min-width: 960px) {
    .article-desc {
      grid-template-columns: 3fr 1fr !important;
    }
  }

  @media only screen and (min-width: 1008px) {
    .article-header-box {
      padding: 0 64px;
    }
  }

  @media only screen and (min-width: 1295px) {
    .article-header-box {
      padding: 0 140px;
      max-width: 1440px;
      margin: 32px auto 176px auto;
    }
  }
</style>
