<script lang="ts">
  export let title
  let submit = null
  let contact = ''
  let description = ''
  let errors = {contact:'',description:''}
  import { createEventDispatcher } from 'svelte'
  import Modal from '../_shared/confirmation-modal/modal.svelte'
  import Loading from '../_shared/loading/loading.svelte'
  import Button from '../_shared/button/button.svelte'
  const dispatch = createEventDispatcher()

  function handleBack() {
    dispatch('back')
  }

  function handleForm(e: Event) {
    //valdate form
    let regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
    if(!contact.match(regex)){
      errors.contact = 'Invalid input, Enter a valid phone or email address'
      return
    }

    if(description === ''){
      errors.description = ('description is required')
      return
    }



    submit = fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify({ from: contact, text: description, subject: title }),
      headers: { 'content-type': 'application/json' },
    })
      .then((resp) => {
         contact = ''
         description = ''
      })
      .catch((e) => {
        console.log(e)
        submit=null
      })
  }
</script>

{#if submit}

  {#await submit}
  <div class={'loading-container'}>
    <Loading/>
  </div>
  {:then resp}
    <Modal  >
    <p class={'medium-300 m0'}>🎉 You're all set!</p>
    <pre class={'medium-300 m0'}>We will get back to you soon!</pre>
    </Modal>
   {:catch error}
   <Modal type={'error'}>
    <p class={'medium-300 m0'}>Error!</p>
    <pre class={'medium-300 m0'}>{error.message}</pre>
    </Modal>
  {/await}
{/if}
<form on:submit|preventDefault={handleForm} method="POST" class={'quote-form-container'}>
  <h1 class={'h1-700'}>Tell us more...</h1>

  <div class={'input-container'}>
    <label class={'small-500 label'} for="emailorphone"> Your email or phone:</label>
    <input
      on:change={()=>errors.contact=''}
      placeholder="type your text here"
      type="text"
      class="primary default-400 input"
      id={'emailorphone'}
      name="contact"
      bind:value={contact}
    />
     <p class={'input-error very-small-400'}>{errors.contact}</p>
  </div>

  <div class={'input-container'}>
    <label class={'small-500 label'} for="description">
      Tell us about yourself and the project:</label
    >
    <textarea
      on:change={()=>errors.description=''}
      placeholder="type your text here"
      class="primary default-400 input text-area"
      id={'description'}
      name={'description'}
      bind:value={description}
    />

    <p class={'input-error very-small-400'}>{errors.description}</p>
  </div>

  <div class={'form-action-container'}>
    <button on:click={handleBack} class={'back default-500'}> Back </button>
    <button type={'submit'} class={'default-500'}> Submit </button>
  </div>
</form>

<style>

  .loading-container {
    position: absolute;
    z-index: 9999;
  }
  .m0{
    margin:0;
  }
  .input-error {
    color: rgb(255, 32, 32);
  }
  .quote-form-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    justify-items: center;

    padding: 0 32px;
  }

  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }

  .input-container .label {
    opacity: 0.7;
  }
  .input-container .input {
    width: 100%;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #00b478;
    height: 40px;
  }

  .input-container .input:focus {
    outline: none;
  }

  .input-container .input::placeholder {
    color: #046d4ab6;
  }

  .text-area {
    height: 120px !important;
  }

  .form-action-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .form-action-container button {
    border-radius: 14px;
    border: 2px solid #ffffff;
    background: transparent;
    color: #fff;
    padding: 16px 32px;
  }

  .form-action-container .back {
    border: none;
    text-align: left;
    padding-left: 0;
  }

  /* extra large */
  @media only screen and (min-width: 1295px) {
    .quote-form-container {
      padding: 0 128px;
    }
  }
</style>
