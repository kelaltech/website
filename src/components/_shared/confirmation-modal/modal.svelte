<script lang="ts">
  export let type: 'error' | 'primary' = 'primary'
  export let to = '/'
</script>

<div class={`confirmation-modal-box ${type === 'primary' ? 'main' : 'error'}`}>
  <slot />

  <div class={`action-box `}>
    {#if type === 'primary'}
      <a href={to}> Done </a>
    {:else}
      <a href={to}> ok </a>
    {/if}
  </div>
</div>

<style>
  .main {
    background-color: #00b478;
  }

  .error {
    background-color: #ff4b4b;
  }
  .action-box {
    width: 100%;
    text-align: center;
  }
  a {
    /* border: 2px solid #0e2a1c; */
    padding: 8px 16px;
    border-radius: 4px;
    color: #0e2a1c;
  }
  a:hover {
    text-decoration: none;
  }
  .confirmation-modal-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    width: 300px;
    height: auto;
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    justify-items: center;
  }
</style>
