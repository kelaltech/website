<script>
  import logo from '../../../assets/images/brand/logo.png'
  import Button from '../button/button.svelte'
  import menuIcon from '../../../assets/images/icons/menu.png'
</script>

<div class={'header-container'}>
  <div class={'company-logo'}>
    <a href="/">
      <img height="64" src={logo} alt="kelaltech logo" />
    </a>
  </div>
  <div class={'header-items'}>
    <div class={'action-btn'}>
      <Button>
        Lets talk
      </Button>
    </div>
    <button class={'menu-icon'}>
      <img src={menuIcon} alt="menu icon" />
      <span>Menu</span>
    </button>
  </div>
</div>

<style>
  .header-container {
    background: transparent;
    width: 100%;
    padding: 32px;
    display: flex;
    justify-content: space-between;
    height: 112px;
    box-sizing: border-box;
    z-index: 999;
  }

  .company-logo {
    align-self: center;
  }
  .header-items {
    display: flex;
    align-items: center;
  }
  .menu-icon {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
  }

  .menu-icon > span {
    font-size: 18px;
    margin-left: 19px;
    font-weight: 500;
  }

  .menu-icon:hover {
    cursor: pointer;
  }

  
  @media screen and (max-width: 550px) {
    .header-container{
      padding:16px;
    }

    .company-logo img {
      height: 42px;
    } 

   .action-btn {
      display: none;
    }
    }
</style>
