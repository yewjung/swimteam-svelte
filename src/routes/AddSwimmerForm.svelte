<script lang="ts">
    import {   InlineNotification, Modal, TextInput, } from "carbon-components-svelte";
    import { createEventDispatcher, onMount,  } from "svelte";
    import { slide } from "svelte/transition";
    import { Swimmer, type ISwimmer } from "../Swimmer";
    import TimeInput from "./TimeInput.svelte";
    import { v4 as uuidv4 } from 'uuid';


    export let open: boolean

    let dispatch = createEventDispatcher()

    export let swimmer : ISwimmer = new Swimmer()
    // let name =  ""
    // let butterfly =  0
    // let backstroke =  0
    // let breaststroke =  0
    // let freestyle =  0

    let showError = false
    let errorMessage = ""

    $: mode = swimmer.id === "" ? 'add' : 'edit'
    $: if (mode == 'add' || mode == 'edit') {
        console.log("mode")
        console.log(mode)
        console.log("swimmer")
        console.log(swimmer)
    }
    $: nameInvalid = !swimmer.name
    $: butterflyInvalid = !isTimeValid(swimmer.butterfly)
    $: breaststrokeInvalid = !isTimeValid(swimmer.breaststroke)
    $: backstrokeInvalid = !isTimeValid(swimmer.backstroke)
    $: freestyleInvalid = !isTimeValid(swimmer.freestyle)
    $: allTimeEmpty = swimmer.butterfly == 0 && swimmer.backstroke == 0 && swimmer.backstroke == 0 && swimmer.freestyle == 0

    function onSubmit() {
        if (nameInvalid) {
            errorMessage = "Name cannot be empty"
            showError = true
            return;
        }
        
        if (allTimeEmpty) {
            errorMessage = "At least one timing is required."
            showError = true
            return;
        }

        if (butterflyInvalid || breaststrokeInvalid || backstrokeInvalid || freestyleInvalid) {
            errorMessage = "Time input must be a positive integer"
            showError = true
        }

        const event = mode == 'add' ? 'addNewSwimmer' : 'updateSwimmer'
        dispatch(event, {
            id: mode == 'add' ? uuidv4() : swimmer.id,
            name: swimmer.name, 
            butterfly: swimmer.butterfly, 
            backstroke: swimmer.backstroke, 
            breaststroke: swimmer.breaststroke, 
            freestyle: swimmer.freestyle
        })
        open = false
    }

    function isTimeValid(time: number) {
        // Check if time is an integer
        return Number.isInteger(time)
    }
</script>

<Modal
  bind:open
  modalHeading={mode == 'add' ? "Add Swimmer" : "Edit Swimmer"}
  primaryButtonText={mode == 'add' ? "Add" : "Update"}
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#db-name"
  on:click:button--secondary={() => (open = false)}
  on:open 
  on:close
  on:submit={onSubmit}
>
<br />
      <TextInput
        invalid={nameInvalid}
        invalidText="Name cannot be empty"
        required
        id="db-name"
        labelText="Name"
        placeholder="Enter name..."
        bind:value={swimmer.name}
      />
      <TimeInput 
        bind:timeInMilli={swimmer.butterfly}
        stroke="Butterfly"
      />
      <TimeInput 
        bind:timeInMilli={swimmer.backstroke}
        stroke="Backstroke"
      />
      <TimeInput 
        bind:timeInMilli={swimmer.breaststroke}
        stroke="Breaststroke"
      />
      <TimeInput 
        bind:timeInMilli={swimmer.freestyle}
        stroke="Freestyle"
      />
    {#if showError}
    <div transition:slide class="notification">

        <InlineNotification
                timeout={5000}
                title="Error"
                subtitle={errorMessage}
                on:close={() => {
                    showError = false
                    errorMessage = ""
                }}
        />
        </div>
    {/if}
</Modal>



<style>
    .notification {
        display: flex;
        justify-content: center;
    }
    
</style>