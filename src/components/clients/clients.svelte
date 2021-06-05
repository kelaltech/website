<script>
  import awtar from '../../assets/images/clients/awtar.png'

  import furniture from '../../assets/images/clients/3f.svg'
  import addis_zeybe from '../../assets/images/clients/addis_zeybe.svg'
  import alama from '../../assets/images/clients/alama.png'
  import dream from '../../assets/images/clients/dream.png'
  import nyala from '../../assets/images/clients/nyala.png'
  import sun from '../../assets/images/clients/sun.png'
  import zetseat from '../../assets/images/clients/zetseat.png'
</script>

<div class="clients-container">
  <img
    title={'Finfine Furnitur company'}
    src={furniture}
    alt={'Finfine Furnitur company'}
    class="client"
  />
  <img
    title={'Addis Zeybe (Digital News outlet)'}
    src={addis_zeybe}
    alt={'Addis Zeybe'}
    class="client"
  />
  <img
    title={'Zetseat Apostolic Church'}
    src={zetseat}
    alt={'Zetseat Apostolic Church'}
    class="client"
  />

  <img title={'Awtar Musics'} src={awtar} alt={'Awtar Musics'} class="client" />
  <img title={'Nyala Motors S.C.'} src={nyala} alt={'Nyala Motors S.C.'} class="client" />

  <img title={'Dream Engineering PLC'} src={dream} alt={'Dream Engineering PLC'} class="client" />
  <img title={'Sun It Solutions'} src={sun} alt={'Sun It Solutions'} class="client" />

  <img title={'Alama.co'} src={alama} alt={'Alama'} class="client" />
</div>

<style>
  .clients-container {
    padding: 138px 32px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    justify-items: center;
    max-width: 1440px;
    margin: 0 auto;
  }

  .client {
    height: 84px;
    object-fit: contain;
  }

  /* small screen */
  @media only screen and (min-width: 640px) {
    .clients-container {
      grid-template-columns: repeat(3, 1fr);
      gap: 64px;
    }
  }

  /* medium */
  @media only screen and (min-width: 700px) {
    .clients-container {
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }
  }
  /* large */
  @media only screen and (min-width: 1008px) {
    .clients-container {
      gap: 64px;
    }
  }
  /* extra large */
  @media only screen and (min-width: 1295px) {
    .clients-container {
      padding-right: 128px;
      padding-left: 128px;
    }
  }
</style>
