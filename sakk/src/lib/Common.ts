import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"

export function getRelativeSquare(game: GameState, square: SquareState,
                                  dRank: number, dFile: number): SquareState | null {
    return getSquare(game, square.rank + dRank, square.file + dFile)
}

export function getSquare(game: GameState, rank: number, file: number): SquareState | null {
    if (rank < 0 || rank > 7 || file < 0 || file > 7) {
        return null
    }

    return game.squares[rank][file]
}

export function checkMove(game: GameState, square: SquareState, dRank: number, dFile: number,
                          moveDestinationSquares: Array<SquareState>): void {
    const destinationSquare = getRelativeSquare(game, square, dRank, dFile)
    if (destinationSquare !== null && destinationSquare.pieceColor() !== square.pieceColor()) {
        moveDestinationSquares.push(destinationSquare)
    }
}

export function checkMoves(game: GameState, square: SquareState, dRank: number, dFile: number,
                           moveDestinationSquares: Array<SquareState>): void {
    const opponentColor = square.pieceColor() == 'w' ? 'b' : 'w'
    for (let n = 1; n < 8; n++) {
        const destinationSquare = getRelativeSquare(game, square, n * dRank, n * dFile)
        if (destinationSquare === null || destinationSquare.pieceColor() === square.pieceColor()) {
            break
        }
        moveDestinationSquares.push(destinationSquare)
        if (destinationSquare.pieceColor() === opponentColor) {
            break
        }
    }
}