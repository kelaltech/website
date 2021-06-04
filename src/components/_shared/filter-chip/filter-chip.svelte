<script lang="ts">
  export let active = false
</script>

<button class={`very-small-400 primary ${active ? 'active' : ''}`}>
  <slot>{`All`}</slot>
</button>

<style lang="scss">
  .active {
    background: #00b478;
    color: white;

    &::after {
      background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #00b478 100%);
    }
  }
  button {
    outline: none;
    border-radius: 16px;
    padding: 4px 16px;
    position: relative;
    border: 1px solid transparent;
    background-clip: content-box;
    background: #f3f8f6;
    margin-right: 16px;
    margin-bottom: 16px;
  }

  button::after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);
    content: '';
    z-index: -1;
    border-radius: 16px;
  }
</style>
