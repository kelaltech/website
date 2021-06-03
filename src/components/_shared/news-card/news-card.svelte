<script>
  import pic from '../../../assets/images/article-card-img.png'
</script>

<div class="news-card-container">
  <img src={pic} alt="news card" width="inherit" height="232" />

  <div class="news-card-info">
    <div class={'news-card-header'}>
      <h2 class="large-500 primary-dark">
        {`Assisting Businesses Impacted by COVID-19 to Go Digital`.slice(0, 45)}
      </h2>
      <span class="small-400">MAY 29, 2020</span>
    </div>

    <div class="news-card-desc">
      <p class="small4-400">
        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor sit sit mattis urna pretium
        tempus. Imperdiet viverra ornare a diam, sed tristique. Eu dictum vulputate ut mauris. Eget
        pulvinar condimentum in aliquet consectetur sit feugiat. Aliquam pellentesque vitae eget id
        tempor platea.`.slice(0, 290)}
      </p>

      <div class="news-card-action">
        <a href="/news" class="primary">Read article →</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .news-card-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    max-width: 388px;
    width: 100%;

    img {
      object-fit: cover;
      width: inherit;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
    }

    .news-card-info {
      padding: 24px;
      background: #f8f8f8;

      border-bottom-left-radius: 14px;
      border-bottom-right-radius: 14px;

      .news-card-header {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;

        span {
          opacity: 0.56;
        }
      }

      .news-card-desc {
        position: relative;

        p {
          color: #0e1c2a;
          opacity: 0.7;
        }

        .news-card-action {
          position: absolute;
          bottom: 0;
          height: 72px;
          width: 100%;
          background: linear-gradient(
            180deg,
            rgba(248, 248, 248, 0) 0%,
            rgba(248, 248, 248, 0.84) 47.92%,
            #f8f8f8 100%
          );

          display: flex;
          justify-content: flex-end;
          align-items: flex-end;

          a {
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
