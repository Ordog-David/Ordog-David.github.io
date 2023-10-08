import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"
import { getRelativeSquare } from "./Common"

export function knightMoves(game: GameState, square: SquareState): Array<SquareState> {
    const moveDestinationSquares: Array<SquareState> = []

    checkMove(game, square, 2, 1, moveDestinationSquares)
    checkMove(game, square, 1, 2, moveDestinationSquares)
    checkMove(game, square, -1, 2, moveDestinationSquares)
    checkMove(game, square, -2, 1, moveDestinationSquares)
    checkMove(game, square, -2, -1, moveDestinationSquares)
    checkMove(game, square, -1, -2, moveDestinationSquares)
    checkMove(game, square, 1, -2, moveDestinationSquares)
    checkMove(game, square, 2, -1, moveDestinationSquares)

    return moveDestinationSquares
}

function checkMove(game: GameState, square: SquareState, dRank: number, dFile: number,
                   moveDestinationSquares: Array<SquareState>): void {
    const destinationSquare = getRelativeSquare(game, square, dRank, dFile)
    if (destinationSquare !== null && destinationSquare.pieceColor() !== square.pieceColor()) {
        moveDestinationSquares.push(destinationSquare)
    }
}
