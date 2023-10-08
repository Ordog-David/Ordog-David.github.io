<h1>C      H      E      S      S</h1>
<div style="display:flex; flex-direction: row; justify-content: center; align-items: center;">
    <p style="padding: 8px">Ínválasztás:</p>
    <label class="switch">
            <input type="checkbox" id="switch">
            <span class="slider round"></span>
    </label>
</div>

<!--
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
-->
<button class="button" on:click={printx}>Új játék</button>
<button class="button" on:click={kezdokodRejtes}>Kezdőkód megadása</button>
<div id= "kezdokodGombok">
    <div style="padding: 50px">
        <label for="kezdoPozicio">Kezdőpozíció</label>
        <input type="string" id="kezdoPozicio" name="kezdoPozicio">
    </div>
    <button class="confirmButton">Kezdőpozíció betöltése</button>
</div>

<style>
    :global(body) {
        user-select: none;
        text-align: center;
        background-color: #7A1B7A;
        color: black;
    }
    .button {
        background-color: #00008b;
        color: #7A1B7A;
        margin: auto;
        width: 20%;
        border: 3px solid black;
        padding: 10px;
    }
    .button:hover{
        background-color: black;
    }
    .button:active {
        background-color: white;
        color: #7A1B7A;
    }
    h1 {
        text-align: center;
        margin: auto;
        border: 0;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
  
    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
  
    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-style: solid;
        border-radius: 10px;
        border-color: black;
    }
  
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 1px;
        background-color: red;
        -webkit-transition: .4s;
        transition: .4s;
    }
  
    input:checked + .slider {
        background-color: black;
    }
  
    input:focus + .slider {
        box-shadow: 0 0 1px black;
    }
  
    input:checked + .slider:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }
  
    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }
  
    .slider.round:before {
        border-radius: 50%;
    }
    #kezdokodGombok {
        visibility: hidden;
    }
</style>

<script>
    import { goto } from '$app/navigation';

    let kezdokodMutat = false

    function printx() {
        goto('/ChessBoard')
    }
    function kezdokodRejtes() {
        if(kezdokodMutat == false) {
            kezdokodMutat = true
            document.getElementById("kezdokodGombok").style.visibility = "visible"
        }
        else {
            kezdokodMutat = false
            document.getElementById("kezdokodGombok").style.visibility = "hidden"
        }
    }
</script>