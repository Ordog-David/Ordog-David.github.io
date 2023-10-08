<script lang="ts">
    import Square from "./Square.svelte"
    import type { SquareState } from "$lib/SquareState"

    export let squares: Array<SquareState>
    export let playerColor: string

    function fileIndex(file: number) {
        if (playerColor == 'w') {
            return file
        }

        return 7 - file
    }
</script>
<tr>
    <Square {...squares[fileIndex(0)]} on:click />
    <Square {...squares[fileIndex(1)]} on:click />
    <Square {...squares[fileIndex(2)]} on:click />
    <Square {...squares[fileIndex(3)]} on:click />
    <Square {...squares[fileIndex(4)]} on:click />
    <Square {...squares[fileIndex(5)]} on:click />
    <Square {...squares[fileIndex(6)]} on:click />
    <Square {...squares[fileIndex(7)]} on:click />
</tr>
