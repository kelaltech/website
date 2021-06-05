<script>
  import logo from '../../../assets/images/brand/logo.svg'
  import facebook from '../../../assets/images/icons/facebook.svg'
  import instagram from '../../../assets/images/icons/instagram.svg'
  import linkedin from '../../../assets/images/icons/linkedin.svg'
  import twitter from '../../../assets/images/icons/twitter.svg'
</script>

<div class={'footer-container'}>
  <div class="footer-content">
    <div class="links-container">
      <div class={'brand-info'}>
        <a href="/" class={'logo-link'}>
          <img height="64" width={166} src={logo} alt="kelaltech logo" />
        </a>

        <p>
          We Empower Makers <br /> Using Digital Platforms
        </p>
        <a href="/request-quote"> Talk to sales → </a>
      </div>

      <div class={'footer-titles'}>
        <h5>SOLUTIONS</h5>

        <div>
          <a href="/request-quote"> Design a Website </a>
          <a href="/request-quote"> Develop a Web App </a>
          <a href="/request-quote"> Build a Mobile App </a>
          <a href="/request-quote"> Open Source </a>
        </div>
      </div>

      <div class={'footer-titles'}>
        <h5>COMPANY</h5>
        <div>
          <a href="/about"> About Us </a>
          <a href="/contact"> Contact </a>
          <a href="/jobs"> Jobs </a>
          <a href="/news"> Newsletter </a>
        </div>
      </div>
    </div>
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
    <div class={'copy-right-box'}>
      <p>2020 © Kelal Tech PLC. All rights reserved.</p>

      <div>
        <a href="https://privacyterms.io/view/USu7DVMs-vlvivBWS-b7ietU/" target="_blank"> Terms </a>
        <a href="https://privacyterms.io/view/24im3gmH-XDp5sR8O-lGMFTk/" target={'_blank'}>
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .footer-container {
    padding: 64px 32px;
    padding-bottom: 0;
    background: radial-gradient(100% 146.94% at 50% 100%, rgba(248, 248, 248, 0) 0%, #f8f8f8 100%);
  }

  .footer-content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  .brand-info {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .brand-info > p {
    color: #0e1c2a;
    opacity: 0.56;
    margin: 8px 0;
  }

  .brand-info > a {
    color: #00b478;
  }

  .brand-info > .logo-link {
    width: 166px;
  }

  .links-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-titles {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .footer-titles > h5 {
    font-size: 18px;
    margin: 0;
    color: #0e1c2a;
    opacity: 0.84;
  }
  .footer-titles > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .footer-titles > div > a {
    color: #0e1c2a;
    opacity: 0.56;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }

  .icon-link-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    width: 200px;
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .copy-right-box {
    display: flex;
    justify-content: space-between;
    padding: 32px 0;
    color: #0e1c2a;
    opacity: 0.56;
    flex-wrap: wrap;
  }

  .copy-right-box > p {
    padding: 0;
    margin: 0;

    font-size: 14px;
  }

  .copy-right-box > div {
    font-size: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32;
  }

  /* small screen */
  @media only screen and (min-width: 640px) {
    .links-container {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }
    .brand-info {
      gap: 32px;
    }
    .brand-info > p {
      margin: 16px 0;
    }
    .footer-titles {
      gap: 32px;
    }
    .icon-link-container {
      width: 200px;
      gap: 24px;
    }
  }

  /* medium */
  @media only screen and (min-width: 700px) {
    .links-container {
      grid-template-columns: 2fr 1fr 1fr;
    }
  }
  /* extra large */
  @media only screen and (min-width: 1295px) {
    .footer-container {
      padding: 64px 128px;
      padding-bottom: 0;
    }
  }
</style>
