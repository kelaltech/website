<script lang="ts" >
  import globe from '../../assets/images/icons/globe.png'
  import pointer from '../../assets/images/icons/mouse-pointer.png'
  import lightBulb from '../../assets/images/icons/mdi-light_lightbulb.png'
  import smartphone from '../../assets/images/icons/smartphone.png'
  import arrow from '../../assets/images/icons/arrow-right.png'
  import Form from '../quote-form/quote-form.svelte'

  let selectedButton = ''
  let openForm:boolean = false;
  
  function handleClicked (text:string){
    console.log('clicked')
    selectedButton =text
    openForm=true
  }
</script>

<div class="getting-started-container">

  {#if !openForm}
  <div class="getting-started-content">
    <h1>How Can we Help You?</h1>

    <div class="getting-started-actions">
      <button on:click={()=>handleClicked('Web page')}>
        Button
      </button> 

      <!-- acction btn-1 -->
      <div   class="action-item">
        <img src={globe} alt="" />
        <div>
          <span>I want a landing page, website or a blog</span>
          <img src={arrow} alt="" />
        </div>
      </div>

      <!-- acction btn-2 -->
      <div class="action-item">
        <img src={pointer} alt="" />
        <div>
          <span>I want a custom web app</span>
          <img src={arrow} alt="" />
        </div>
      </div>

      <!-- acction btn-3 -->
      <div class="action-item">
        <img src={smartphone} alt="" />
        <div>
          <span>I want a custom mobile app</span>
          <img src={arrow} alt="" />
        </div>
      </div>

      <!-- acction btn-3 -->
      <div class="action-item">
        <img src={lightBulb} alt="" />
        <div>
          <span>I want something else. Let me explain…</span>
          <img src={arrow} alt="" />
        </div>
      </div>
    </div>
  </div>
  {:else}
  <Form title={'I want a landing page'} />
  {/if}
</div>

<style>
  .getting-started-container {
    width: 100%;
    height: 1020px;
    clip-path: polygon(0 9%, 100% 0%, 100% 91%, 0% 100%);
    background: #0e1c2a;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .getting-started-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 88px;
    justify-items: center;
  }

  .getting-started-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
  .action-item {
    border: 2px solid #00b478;
    box-sizing: border-box;
    border-radius: 14px;
    padding: 48px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .action-item > img {
    margin-right: 32px;
  }

  .action-item > div > img {
    margin-left: 48px;
  }

  .action-item > div {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
</style>
