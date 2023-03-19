<script lang="ts">
    import { DataTable, Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Button,
    OverflowMenu,
    OverflowMenuItem, } from "carbon-components-svelte";
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import { Swimmer, type ISwimmer, type SwimmerRowData } from "../Swimmer";
    import AddSwimmerForm from "./AddSwimmerForm.svelte";

    function formatTime(milliseconds: number | undefined): string {
        if (milliseconds === undefined) {
            return ""
        }
        if (milliseconds === 0) {
            return "no record"
        }
        const centiseconds = Math.floor(milliseconds / 10) % 100;
        const seconds = Math.floor(milliseconds / 1000) % 60;
        const minutes = Math.floor(milliseconds / 60000);

        const pad = (num: number) => num.toString().padStart(2, '0');

        return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
    }

    function parseTime(timeString: string): number {
        const [minutes, seconds, centiseconds] = timeString.split(':').map(Number);
        return (minutes * 60000) + (seconds * 1000) + (centiseconds * 10);
    }


    function convertSwimmerToRowData(swimmer: ISwimmer): any {
        return {
                id: swimmer.id, 
                name: swimmer.name, 
                butterfly: formatTime(swimmer.butterfly),
                backstroke: formatTime(swimmer.backstroke),
                breaststroke: formatTime(swimmer.breaststroke),
                freestyle: formatTime(swimmer.freestyle),
            }
    }

    function openFormAndSetSwimmer(editSwimmer: SwimmerRowData | null | undefined) {
        if (!editSwimmer) {
            swimmer = new Swimmer()
        } else {
            swimmer = {...swimmers.find(swimmer => swimmer.id === editSwimmer.id)!}
        }
        open = true

    }

    const headers = [
        { key: "name", value: "Name" },
        { key: "butterfly", value: "Butterfly" },
        { key: "backstroke", value: "Backstroke" },
        { key: "breaststroke", value: "Breaststroke" },
        { key: "freestyle", value: "Freestyle" },
        { key: "overflow", empty: true },
    ]
    let swimmers: ISwimmer[] = [
        {   
            id: "asdasdasd",
            name: "Load Balancer 1",
            butterfly: 123123,
            backstroke: 123123,
            breaststroke: 123123,
            freestyle: 123123,
        }
    ]
    $: rows = swimmers.map(convertSwimmerToRowData)
    let open = false
    let swimmer: ISwimmer

</script>
  
<div class="tableRow">
    <div class="tableWrap">
        <DataTable
        sortable
        title="All swimmers"
        {headers}
        {rows}
        >
            <Toolbar>
                <ToolbarContent>
                    <ToolbarSearch 
                        persistent
                        shouldFilterRows
                    />
                    <Button on:click={() => openFormAndSetSwimmer(null)} iconDescription="Tooltip text" icon={Add} />
                </ToolbarContent>
            </Toolbar>
            <svelte:fragment slot="cell" let:cell let:row>
                {#if cell.key === "overflow"}
                <OverflowMenu flipped>
                    <OverflowMenuItem text="Edit" on:click={() => openFormAndSetSwimmer({...row})}/>
                </OverflowMenu>
                {:else}{cell.value}{/if}
            </svelte:fragment>
        </DataTable>
    </div>
    <div class="tableWrap">
        <DataTable
        title="Selected swimmers"
        {headers}
        {rows}
        />
    </div>
</div>

<AddSwimmerForm 
    bind:open {swimmer} 
    on:addNewSwimmer={e => swimmers = [...swimmers, e.detail]}
    on:updateSwimmer={e => {
        const index = swimmers.findIndex(swimmer => swimmer.id === e.detail.id)
        swimmers = [...swimmers.slice(0, index), e.detail, ...swimmers.slice(index + 1)]
    }}
    />

<style>
    .tableWrap {
        margin: 10px
    }
    .tableRow {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
  