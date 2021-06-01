<script>
  import {
    Email,
    Reddit,
    LinkedIn,
    Telegram,
    Facebook,
    Twitter,
  } from 'svelte-share-buttons-component'
  import share from '../../../assets/images/icons/share.svg'
  const url = 'https://kelaltech.com/request-quote'
  const title = 'Kelal Tech PLC Official Website'
  const desc = `Want to make a deal with us?Looking for some information? Or, just want to chat? We'd be very happy to hear from you.`
</script>

<div class="share-icon-container">
  <img class="share-icon" height={24} src={share} alt="" />

  <div class="share-icons-box">
    <Email subject={title} body="{desc} {url}" />
    <LinkedIn class="share-button" {url} />
    <Facebook class="share-button" {url} />
    <Twitter
      class="share-button"
      text={title}
      {url}
      hashtags="github,svelte"
      via="username"
      related="other,users"
    />
    <Telegram class="share-button" text={title} {url} />

    <Reddit class="share-button" {title} {url} />
  </div>
</div>

<style lang="scss">
  .share-icon-container {
    position: relative;
    z-index: 1;
    margin: auto;
  }

  .share-icon {
    right: 0px;
    position: absolute;
    z-index: 3;
  }

  .share-icon-container:hover > .share-icons-box {
    display: inline-block;
    padding: 8px 16px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2px;
  }

  .share-icons-box {
    position: absolute;
    z-index: 9999999;
    width: auto;
    height: 300px;
    display: none;
    left: -250px;
    top: 20px;
  }
</style>
