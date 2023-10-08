import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"

import { checkMove } from "./Common"

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

