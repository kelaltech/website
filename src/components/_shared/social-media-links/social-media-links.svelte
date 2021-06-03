<script>
  import facebook from '../../../assets/images/icons/facebook.svg'
  import instagram from '../../../assets/images/icons/instagram.svg'
  import linkedin from '../../../assets/images/icons/linkedin.svg'
  import twitter from '../../../assets/images/icons/twitter.svg'
</script>

<div class={'icon-link-container'}>
  <a href="https://twitter.com/kelaltech" target={'_blank'}>
    <img width={32} height={32} src={twitter} alt="link to twiiter" />
  </a>
  <a href="https://www.facebook.com/kelaltech" target={'_blank'}>
    <img width={32} height={32} src={facebook} alt="link to  facebook" />
  </a>
  <a href="https://www.instagram.com/kelaltech/" target={'_blank'}>
    <img width={32} height={32} src={instagram} alt="link to  instagram" />
  </a>
  <a href="https://www.linkedin.com/company/kelal" target={'_blank'}>
    <img width={32} height={32} src={linkedin} alt="link to linkedin" />
  </a>
</div>

<style>
  .icon-link-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    width: 200px;
  }
  @media only screen and (min-width: 640px) {
    .icon-link-container {
      width: 200px;
      gap: 24px;
    }
  }
</style>
