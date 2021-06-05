<script>
  import newsBg from '../../../assets/images/article-card-img.png'
</script>

<div class={'news-card-h'}>
  <img src={newsBg} alt="news " />

  <div class={'news-excerpt-box'}>
    <div class={'news-excerpt'}>
      <div class="excerpt-header">
        <h3 class="large-500">Kelal Tech Gets a New Brand & Website Refresh</h3>
        <span class="small-400">MAY 25, 2020</span>
      </div>
      <p class="small-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque sit tortor eget a ac
        habitasse. Lobortis at cras velit sit ut sollicitudin elit enim. Mi ut placerat dolor ut
        molestie nunc libero, sed dolor.
      </p>
    </div>

    <div class={'news-action'}>
      <a href={`/newsletter/${'slug'}`} class={'primary small-400'}>Read article →</a>
    </div>
  </div>
</div>

<style lang="scss">
  .news-card-h {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    background-color: white;

    img {
      width: 100%;
      height: 232px;
      object-fit: cover;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
    }

    @media only screen and (min-width: 830px) {
      flex-direction: row;
      img {
        width: 388px;
        height: auto;
        min-height: 256px !important;
        margin-right: 16px;
        border-radius: 0;
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
      }
    }
  }

  .news-excerpt-box {
    padding: 24px;
    .news-excerpt {
      .excerpt-header {
        h3 {
          margin: 0;
          margin-bottom: 8px;
        }
        span {
          color: #0e1c2a;
          opacity: 0.56;
        }
      }
      p {
        margin-top: 32px;
        margin-bottom: 16px;
        color: #0e1c2a;
        opacity: 0.7;
      }
    }
    .news-action {
      text-align: right;
    }
  }
</style>
