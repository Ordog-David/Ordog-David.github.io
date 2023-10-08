import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"

import { checkMove, getRelativeSquare } from "./Common"

export function kingMoves(game: GameState, square: SquareState): Array<SquareState> {
    const moveDestinationSquares: Array<SquareState> = []

    checkMove(game, square, 1, -1, moveDestinationSquares)
    checkMove(game, square, 1, 0, moveDestinationSquares)
    checkMove(game, square, 1, 1, moveDestinationSquares)
    checkMove(game, square, 0, 1, moveDestinationSquares)
    checkMove(game, square, -1, 1, moveDestinationSquares)
    checkMove(game, square, -1, 0, moveDestinationSquares)
    checkMove(game, square, -1, -1, moveDestinationSquares)
    checkMove(game, square, 0, -1, moveDestinationSquares)

    if ((square.pieceColor() === 'w' && game.castlingAvailability.includes('Q')) ||
        (square.pieceColor() === 'b' && game.castlingAvailability.includes('q'))) {
        const empty = checkEmpty(game, square, -1) && checkEmpty(game, square, -2) && checkEmpty(game, square, -3)
        // TODO: Check for check in the intermediate step
        if (empty) {
            moveDestinationSquares.push(getRelativeSquare(game, square, 0, -2)!)
        }
    }

    if ((square.pieceColor() === 'w' && game.castlingAvailability.includes('K')) ||
        (square.pieceColor() === 'b' && game.castlingAvailability.includes('k'))) {
        const empty = checkEmpty(game, square, 1) && checkEmpty(game, square, 2)
        // TODO: Check for check in the intermediate step
        if (empty) {
            moveDestinationSquares.push(getRelativeSquare(game, square, 0, 2)!)
        }
    }

    return moveDestinationSquares
}

function checkEmpty(game: GameState, square: SquareState, dFile: number) {
    const relativeSquare = getRelativeSquare(game, square, 0, dFile)
    return relativeSquare !== null && relativeSquare.piece === null
}
