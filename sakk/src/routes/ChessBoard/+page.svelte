<script lang="ts">
    import { GameState } from '$lib/GameState'
    import type { SquareState } from '$lib/SquareState'
    import { Stockfish } from '$lib/Stockfish';
    import Rank from './Rank.svelte'

    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import { initializeStateFromFEN, playMove } from '$lib/ForsythEdwardsNotation'
    import { calculateMoveDestinationSquaresFilteredForCheck, executeMove } from '$lib/Move'

    let game = new GameState($page.url.searchParams.get('playerColor') || 'w',
                             new Stockfish(parseInt($page.url.searchParams.get('skillLevel') || '1')))

    function onSquareClick(event: MouseEvent) {
        const target = event.target as HTMLTableCellElement

        const stringRank = target.dataset["rank"]
        const stringFile = target.dataset["file"]
        if (stringRank === undefined || stringFile === undefined) {
            return
        }

        const rank = parseInt(stringRank)
        const file = parseInt(stringFile)
        const square = game.squares[rank][file]

        /* Nothing to do if the square is not clickable */
        if (!square.clickable) {
            return
        }

        /* If the square is already selected, then unselect it */
        if (square.selected) {
            setSelectableSquares()
            return
        }

        const selectedSquare = getSelectedSquare()

        /* If the square is a valid destination, then move the piece */
        if (square.moveDestination && selectedSquare !== null) {
            executeMove(game, selectedSquare, square, '')
            setSelectableSquares()
            return
        }

        /* The square is an unselected piece, switch to it */
        if (selectedSquare !== null) {
            selectedSquare.selected = false
        }
        square.selected = true

        /* Show the possible moves */
        const moveDestinationSquares = calculateMoveDestinationSquaresFilteredForCheck(game, square)
        setMoveDestinationSquares(moveDestinationSquares)
    }

    function setSelectableSquares(): void {
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const square = game.squares[rank][file]
                square.selected = false
                square.clickable = game.playerColor === game.activeColor && game.playerColor === square.pieceColor()
                square.moveDestination = false
            }
        }

        if (game.playerColor !== game.activeColor) {
            game.stockfish?.getMove(game.getFen()).then((move) => playStockfishMove(move))
        }

        game = game
    }

    function getSelectedSquare(): SquareState | null {
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                if (game.squares[rank][file].selected) {
                    return game.squares[rank][file]
                }
            }
        }

        return null
    }

    function setMoveDestinationSquares(moveDestinationSquares: Array<SquareState>): void {
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const square = game.squares[rank][file]
                const isMoveDestination = moveDestinationSquares.includes(square)
                square.moveDestination = isMoveDestination
                square.clickable = square.pieceColor() === game.playerColor || isMoveDestination
            }
        }

        game = game
    }

    function playStockfishMove(move: string) {
        playMove(game, move)
        setSelectableSquares()
    }

    function rankIndex(rank: number) {
        if (game.playerColor == 'w') {
            return 7 - rank
        } else {
            return rank
        }
    }

    $: console.log(game)

    onMount(() => {
        initializeStateFromFEN(game, $page.url.searchParams.get('startingPosition'))
        game.stockfish!.init().then(() => setSelectableSquares())
    })
</script>

<h1>Chess.c*m</h1>

<table>
    <Rank squares={game.squares[rankIndex(0)]} playerColor={game.playerColor} on:click={onSquareClick} />
    <Rank squares={game.squares[rankIndex(1)]} playerColor={game.playerColor} on:click={onSquareClick} />
    <Rank squares={game.squares[rankIndex(2)]} playerColor={game.playerColor} on:click={onSquareClick} />
    <Rank squares={game.squares[rankIndex(3)]} playerColor={game.playerColor} on:click={onSquareClick} />
    <Rank squares={game.squares[rankIndex(4)]} playerColor={game.playerColor} on:click={onSquareClick} />
    <Rank squares={game.squares[rankIndex(5)]} playerColor={game.playerColor} on:click={onSquareClick} />
    <Rank squares={game.squares[rankIndex(6)]} playerColor={game.playerColor} on:click={onSquareClick}/>
    <Rank squares={game.squares[rankIndex(7)]} playerColor={game.playerColor} on:click={onSquareClick} />
</table>

<div style="text-align: right; text-align: bottom;">
    <img src="images/opponent.png" alt="Ellenfél" />
</div>

<style>
    :global(body) {
        user-select: none;
        text-align: center;
        background-color: #7A1B7A;
        color: black;
    }
    img {
        width: 300px;
    }
    h1 {
        font-size: 50px;
    }
    table {
        cursor: not-allowed;
        margin: auto;
        padding: 6px;
        background-color: white;
        border-radius: 7px;
        box-shadow: 1px 1px 4px black;
        border-collapse: collapse;
    }
</style>
