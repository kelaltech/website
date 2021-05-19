<script lang="ts" >
    export let title;

</script>


<div class={'quote-form-container'} >
    <h1 class={'h1-700'}>Tell us more...</h1>


    <div class={'input-container'} >
        <label class={'small-500 label'} for="emailorphone"> Your email or phone:</label>
        <input placeholder="type your text here" type="text" class="primary default-400 input" id={'emailorphone'} name="Email or Phone" />
    </div>

    <div class={'input-container'} >
        <label class={'small-500 label'} for="description"> Tell us about yourself and the project:</label>
        <textarea placeholder="type your text here" class="primary default-400 input text-area" id={'description'}>

        </textarea>
    </div>
</div>

<style lang="css">

.quote-form-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 64px;
    justify-items: center;

    padding: 0 128px;
 }

 .input-container {
     width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;   
 }

 .input-container  .label {
     opacity: 0.7;
 }
 .input-container .input {
    width: 100%; 
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #00B478;
    height: 40px;
 }

 .input-container .input:focus {
     outline: none;
 }

 .input-container .input::placeholder {
     color:#04573b91;
 }

 .text-area {
     height: 120px !important;
 }

</style>