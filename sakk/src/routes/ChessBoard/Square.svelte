<script lang="ts">
    export let piece: string | null
    export let clickable: boolean
    export let selected: boolean
    export let moveDestination: boolean
    export let rank: number
    export let file: number

    class Figure {
        figure: string
        color: string

        constructor(figure: string, color: string) {
            this.figure = figure
            this.color = color
        }
    }

    const figures: Map<String, Figure> = new Map([
        ['P', new Figure('♟', 'white')],
        ['R', new Figure('♜', 'white')],
        ['N', new Figure('♞', 'white')],
        ['B', new Figure('♝', 'white')],
        ['Q', new Figure('♛', 'white')],
        ['K', new Figure('♚', 'white')],
        ['p', new Figure('♟', 'black')],
        ['r', new Figure('♜', 'black')],
        ['n', new Figure('♞', 'black')],
        ['b', new Figure('♝', 'black')],
        ['q', new Figure('♛', 'black')],
        ['k', new Figure('♚', 'black')]
    ])

    $: figure = piece !== null ? figures.get(piece)!.figure : ''
    $: color = piece !== null ? figures.get(piece)!.color : ''
</script>

<td class={color} class:clickable={clickable} class:selected={selected} class:moveDestination={moveDestination}
    data-rank={rank} data-file={file} on:click>{figure}</td>

<style>
    td {
        width: 2vw;
        height: 10vh;
        box-shadow: 1px 1px 3px inset black;
        cursor: not-allowed;
        text-align: center;
        font-size: 40px;
        user-select: none;
        width: 64px;
        height: 64px;
    }
    :global(tr):nth-child(odd) td:nth-child(even),
    :global(tr):nth-child(even) td:nth-child(odd) {
        background-color: #00008b;
    }
    td.white {
        /*color: #7A1B7A;*/
        color: yellow;
        text-shadow: 0px 0px 4px black;
    }
    td.black {
        color: black;
        text-shadow: 0px 0px 4px white;
    }
    td.clickable {
        cursor: pointer;
    }
    td.clicked {
        background-color: #00008b;
        color: #7A1B7A;
    }
    td:hover {
        box-shadow: 1px 1px 3px black;
    }
    td.selected {
        background-color: #7A1B7A !important;        
    }
    td.moveDestination {
        background-color: rgb(254,178,4) !important;
    }
</style>