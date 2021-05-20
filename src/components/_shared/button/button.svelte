<script>
  let className
  export { className as class }
  export let to
</script>

{#if !to}
  <button class={`border-gradient border-gradient-purple ${className || ''}`}>
    <slot>Button</slot>
  </button>
{:else}
  <a href={to} class={`border-gradient border-gradient-purple ${className || ''}`}>
    <slot>Link</slot>
  </a>
{/if}

<style>
  button,
  a {
    display: flex;
    align-items: center;
    padding: 16px 32px;
    border-radius: 14px;
    background: none;
    font-size: 18px;
    font-weight: 500;
    color: #0e1c2a;
  }

  .border-gradient {
    border: double 3px transparent;
    background-image: linear-gradient(white, white),
      radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  button:hover,
  a:hover {
    cursor: pointer;
    text-decoration: none;
  }
</style>
