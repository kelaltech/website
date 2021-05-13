<script>
  export let name = 'Button'
</script>

<button class={'border-gradient border-gradient-purple'}>
  {name}
</button>

<style>
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    border-radius: 14px;
    background: none;
    height: 56px;
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

  button:hover {
    cursor: pointer;
  }
</style>
