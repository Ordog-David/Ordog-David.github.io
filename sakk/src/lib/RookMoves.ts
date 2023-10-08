import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"

import { checkMoves } from "./Common"

export function rookMoves(game: GameState, square: SquareState): Array<SquareState> {
    const moveDestinationSquares: Array<SquareState> = []

    checkMoves(game, square, 1, 0, moveDestinationSquares)
    checkMoves(game, square, 0, 1, moveDestinationSquares)
    checkMoves(game, square, -1, 0, moveDestinationSquares)
    checkMoves(game, square, 0, -1, moveDestinationSquares)

    return moveDestinationSquares
}
