import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"

import { checkMove, getRelativeSquare } from "./Common"
import { isCheckMove } from "./Move"

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
        const allowed = checkEmpty(game, square, -1) && checkEmpty(game, square, -2) &&
                        checkIntermediateCheck(game, square, -1) && checkEmpty(game, square, -3)
        if (allowed) {
            moveDestinationSquares.push(getRelativeSquare(game, square, 0, -2)!)
        }
    }

    if ((square.pieceColor() === 'w' && game.castlingAvailability.includes('K')) ||
        (square.pieceColor() === 'b' && game.castlingAvailability.includes('k'))) {
        const allowed = checkEmpty(game, square, 1) && checkIntermediateCheck(game, square, 1) &&
                        checkEmpty(game, square, 2)
        if (allowed) {
            moveDestinationSquares.push(getRelativeSquare(game, square, 0, 2)!)
        }
    }

    return moveDestinationSquares
}

function checkEmpty(game: GameState, square: SquareState, dFile: number): boolean {
    const relativeSquare = getRelativeSquare(game, square, 0, dFile)
    return relativeSquare !== null && relativeSquare.piece === null
}

function checkIntermediateCheck(game: GameState, square: SquareState, dFile: number): boolean {
    const relativeSquare = getRelativeSquare(game, square, 0, dFile)
    if (relativeSquare === null) {
        return false
    }
    return isCheckMove(game, square, relativeSquare)
}
