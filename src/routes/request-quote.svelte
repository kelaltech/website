<script context="module">
  export const hydrate = true
</script>

<script lang="ts">
  import { seo } from '../lib/seo-store'
  import { onMount } from 'svelte'
  import arrow from '../assets/images/icons/arrow-right.svg'
  import globe from '../assets/images/icons/globe.svg'
  import lightBulb from '../assets/images/icons/mdi-light_lightbulb.svg'
  import pointer from '../assets/images/icons/mouse-pointer.svg'
  import smartphone from '../assets/images/icons/smartphone.svg'
  import Form from '../components/quote-form/quote-form.svelte'
  import Share from '../components/_shared/share/share.svelte'

  seo.update((current) => {
    current.title = 'Request quotation'
    return current
  })

  let selectedButtonText = ''
  let openForm = false

  function handleClick(text: string) {
    selectedButtonText = text
    openForm = true
  }

  function handleOpenForm() {
    openForm = false
  }

  function handleKeyboardClick(event, text) {
    // Keypresses other then Enter and Space should not trigger a command
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return
    }
    selectedButtonText = text
    openForm = true
  }

  onMount(async () => {
    const params = await new URLSearchParams(window.location.search)
    if (params.has('from')) {
      openForm = true
      selectedButtonText = params.get('value')
    }
  })
</script>

<div class="getting-started-container">
  {#if !openForm}
    <div class="getting-started-content">
      <div class={'getting-started-header-box'}>
        <h1>How Can we Help You?</h1>
        <div class="share-btn">
          <Share />
        </div>
      </div>

      <div class="getting-started-actions">
        <!-- acction btn-1 -->
        <div
          role={'button'}
          tabindex="0"
          on:keydown={(e) => handleKeyboardClick(e, 'I want a landing page, website or a blog')}
          on:click={() => handleClick('I want a landing page, website or a blog')}
          class="action-item"
        >
          <img src={globe} alt="" />
          <div>
            <span>I want a landing page, website or a blog</span>
            <img height={24} src={arrow} alt="" />
          </div>
        </div>

        <!-- acction btn-2 -->
        <div
          role={'button'}
          tabindex="0"
          on:keydown={(e) => handleKeyboardClick(e, 'I want a custom web app')}
          on:click={() => handleClick('I want a custom web app')}
          class="action-item"
        >
          <img src={pointer} alt="" />
          <div>
            <span>I want a custom web app</span>
            <img height={24} src={arrow} alt="" />
          </div>
        </div>

        <!-- acction btn-3 -->
        <div
          role={'button'}
          tabindex="0"
          on:keydown={(e) => handleKeyboardClick(e, 'I want a custom mobile app')}
          on:click={() => handleClick('I want a custom mobile app')}
          class="action-item"
        >
          <img src={smartphone} alt="" />
          <div>
            <span>I want a custom mobile app</span>
            <img height={24} src={arrow} alt="" />
          </div>
        </div>

        <!-- acction btn-4 -->
        <div
          role={'button'}
          tabindex="0"
          on:keydown={(e) => handleKeyboardClick(e, 'I want something else. Let me explain…')}
          on:click={() => handleClick('I want something else. Let me explain…')}
          class="action-item"
        >
          <img src={lightBulb} alt="" />
          <div>
            <span>I want something else. Let me explain…</span>
            <img height={24} src={arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  {:else}
    <Form on:back={handleOpenForm} title={selectedButtonText || ''} />
  {/if}
</div>

<style lang="scss">
  .getting-started-header-box {
    display: flex;
    width: 100%;

    h1 {
      flex: 80%;
      text-align: center;
      font-size: 18px;
    }

    .share-btn {
      align-self: center;
      width: 10%;
      height: 24px;
    }
  }
  .getting-started-container {
    width: 100%;
    height: auto;
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    background: #0e1c2a;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .getting-started-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
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
    transition: 0.25s;

    &:hover {
      cursor: pointer;
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

  @media only screen and (min-width: 500px) {
    .getting-started-content {
      gap: 88px;
    }

    .getting-started-header-box {
      h1 {
        font-size: 32px;
      }

      .share-btn {
        width: auto;
      }
    }
  }

  /* small screen */
  @media only screen and (min-width: 640px) {
    .getting-started-container {
      height: calc(100vh);
    }
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
