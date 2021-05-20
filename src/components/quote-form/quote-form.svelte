<script lang="ts">
  export let title
  let submit
  let contact = ''
  let description = ''
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function handleBack() {
    dispatch('back')
  }

  function handleForm(e: Event) {
    console.log(contact, description, title)
    submit = fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify({ from: contact, text: description, subject: title }),
      headers: { 'content-type': 'application/json' },
    })
      .then((resp) => {
        console.log(resp.json())
      })
      .catch((e) => {
        console.log(e)
      })
  }
</script>

<form on:submit|preventDefault={handleForm} method="POST" class={'quote-form-container'}>
  <h1 class={'h1-700'}>Tell us more...</h1>

  <div class={'input-container'}>
    <label class={'small-500 label'} for="emailorphone"> Your email or phone:</label>
    <input
      placeholder="type your text here"
      type="text"
      class="primary default-400 input"
      id={'emailorphone'}
      name="contact"
      bind:value={contact}
    />
  </div>

  <div class={'input-container'}>
    <label class={'small-500 label'} for="description">
      Tell us about yourself and the project:</label
    >
    <textarea
      placeholder="type your text here"
      class="primary default-400 input text-area"
      id={'description'}
      name={'description'}
      bind:value={description}
    />
  </div>

  <div class={'form-action-container'}>
    <button on:click={handleBack} class={'back default-500'}> Back </button>
    <button type={'submit'} class={'default-500'}> Submit </button>
  </div>
</form>

<style>
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
