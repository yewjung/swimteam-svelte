<script lang="ts">
    import { NumberInput } from "carbon-components-svelte";

    export let timeInMilli = 0;
    // TODO: the following three variables doesn't get updated when timeInMilli is changed from
    // parent component
    let centiseconds = Math.floor(timeInMilli / 10) % 100;
    let seconds = Math.floor(timeInMilli / 1000) % 60;
    let minutes = Math.floor(timeInMilli / 60000);
    $: timeInMilli = minutes * 60 * 1000 + seconds * 1000 + centiseconds * 10

    const onkeypress = "return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
    export let stroke = "Butterfly"

</script>


<div class="time">

    <p class="stroke">{stroke}:</p>
    <div class="input">
        <NumberInput
            bind:value={minutes}
            hideSteppers
            min={0}
            max={999}
            invalidText="Number must be between 0 and 999."
            label="Minutes"
            pattern="[0-9]*"
            inputmode="numeric"
            {onkeypress}
         />
    </div>
    <div class="input">
        <NumberInput
            bind:value={seconds}
            hideSteppers
            min={0}
            max={60}
            invalidText="Number must be between 0 and 60."
            label="Seconds"
            pattern="[0-9]*"
            inputmode="numeric"
            {onkeypress}
        />
    </div>
    <div class="input">
        <NumberInput
            bind:value={centiseconds}
            hideSteppers
            min={0}
            max={99}
            invalidText="Number must be between 0 and 99."
            label="Centi"
            pattern="[0-9]*"
            inputmode="numeric"
            {onkeypress}
        />
    </div>
</div>

<style>
    .stroke {
        align-self: flex-end;
        width: 160px;
    }
    .input {
        margin: 5px;
        flex-grow: 1;
    }
    .time {
        display: flex;
        flex-wrap: wrap;
    }

</style>