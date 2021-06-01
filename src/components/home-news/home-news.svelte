<script>
    import NewsCard from '../_shared/news-card/news-card.svelte'
</script>

<div class={'home-news-container'}>
  <div class="home-news-box">
    <h1 class="h1-700">Newsletter</h1>
    <div class="news-card-box" >
        <NewsCard/>
        <NewsCard/>
    </div>
  </div>

  <div class="newsletter-contact" />
</div>

<style>
  .home-news-container {
    padding: 128px;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .home-news-box {
    background-color: red;
    width: 840px;
    height: 300px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
  }

  .newsletter-contact {
    background-color: green;
    width: 280px;
  }
</style>
