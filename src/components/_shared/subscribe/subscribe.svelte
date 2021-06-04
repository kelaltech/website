<div class="subscribe-form">
  <h6 class="default-400">Get articles in your inbox when they get published here.</h6>
  <form action="">
    <label for="subscribe-form">YOUR EMAIL:</label>
    <input type="email" required name="subscribe-form" id="news-subscribe" />

    <button class="default-500">SUBSCRIBE NOW →</button>
  </form>
</div>

<style lang="scss">
  .subscribe-form {
    h6 {
      margin: 0;
      margin-bottom: 32px;
      opacity: 0.56;
    }

    form {
      label {
        display: block;
        margin-bottom: 8px;
        opacity: 0.56;
      }

      input {
        height: 40px;
        width: 100%;
        border: 0;
        outline: none;
        background: #f8f8f8;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        border-radius: 7px;
        padding: 0 4px;
      }

      button {
        margin-top: 24px;
        padding: 8px 4px;
        border: 0;
        outline: none;
        background-color: transparent;
        box-sizing: content-box;
        border-image-slice: 1;
        transition: 0.25s;
        border-radius: 7px;
        &:hover {
          background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
</style>
