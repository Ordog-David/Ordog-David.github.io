import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"
import { getRelativeSquare } from "./Common"

export function pawnMoves(game: GameState, square: SquareState): Array<SquareState> {
    const opponentColor = game.playerColor === 'w' ? 'b' : 'w'
    const dRank = game.playerColor === 'w' ? 1 : -1
    const moveDestinationSquares = []

    const aboveSquare = getRelativeSquare(game, square, dRank, 0)
    if (aboveSquare != null && aboveSquare.piece === null) {
        moveDestinationSquares.push(aboveSquare)
    }

    if ((game.playerColor === 'w' && square.rank === 1) || (game.playerColor === 'b' && square.rank === 6)) {
        const aboveAboveSquare = getRelativeSquare(game, square, 2 * dRank, 0)
        if (aboveSquare != null && aboveSquare.piece === null &&
            aboveAboveSquare != null && aboveAboveSquare.piece === null) {
            moveDestinationSquares.push(aboveAboveSquare)
        }
    }

    const aboveLeftSquare = getRelativeSquare(game, square, dRank, -1)
    checkCapture(game, aboveLeftSquare, opponentColor, moveDestinationSquares)

    const aboveRightSquare = getRelativeSquare(game, square, dRank, 1)
    checkCapture(game, aboveLeftSquare, opponentColor, moveDestinationSquares)

    return moveDestinationSquares
}

function checkCapture(game: GameState, square: SquareState | null, opponentColor: String,
                      moveDestinationSquares: Array<SquareState>): void {
    if (square != null && square.pieceColor() === opponentColor) {
        moveDestinationSquares.push(square)
    } else if (square != null && square === game.enPassantTargetSquare) {
        moveDestinationSquares.push(square)
    }
}