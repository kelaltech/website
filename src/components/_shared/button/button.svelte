<script>
  let className
  export { className as class }
  export let to
</script>

{#if !to}
  <button class={`small-400 border-gradient  ${className || ''}`}>
    <slot>Button</slot>
  </button>
{:else}
  <a href={to} class={` small-400 border-gradient  ${className || ''}`}>
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
    font-weight: 500;
    color: #0e1c2a;
  }

  .border-gradient {
    border: double 3px transparent;
    background-image: linear-gradient(white, white),
      radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);
    background: linear-gradient(#fff, #fff) padding-box,
      radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%) border-box;
    border: 3px solid transparent;
    color: #0e1c2a;
    background-color: white;
    transition: background 0.3s ease, color 0.3s ease;
  }

  button:hover,
  a:hover {
    cursor: pointer;
    text-decoration: none;
  }

  .border-gradient:hover,
  .border-gradient:focus {
    background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%) border-box;
    border: 3px solid transparent;
    color: #fff;
    transition: background 0.3s ease, color 0.3s ease;
  }
</style>
