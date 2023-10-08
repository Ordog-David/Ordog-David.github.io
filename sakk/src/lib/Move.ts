import { getRelativeSquare, getSquare } from "./Common"
import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"

export function executeMove(game: GameState, from: SquareState, to: SquareState, promotion: string): void {
    if (from.piece === null) {
        throw new Error("There must be a piece at the starting coordinate")
    }

    /* Check if the current move is an en passant */
    if (to === game.enPassantTargetSquare) {
        executeEnPassant(game, from, to)
    }

    /* Check if the current move creates a chance for en passant */
    checkForEnPassant(game, from, to)

    // TODO: Pawn promotion

    /* Check if the current move is a castling */
    if (from.piece.toLowerCase() === 'k' && Math.abs(from.file - to.file) == 2) {
        executeCastling(game, from, to)
    }

    /* Check if the current move precludes some castling */
    checkForCastling(game, from, to)

    to.piece = possiblyPromote(from.piece, promotion)
    from.piece = null

    game.fenMoves.push(createFenMove(from, to, promotion))

    // TODO: Check
    // TODO: Checkmate

    game.activeColor = game.activeColor === 'w' ? 'b' : 'w'
}

function executeEnPassant(game: GameState, from: SquareState, to: SquareState): void {
    const target = getSquare(game, from.rank, to.file)
    if (target === null) {
        throw new Error("En passant move on a non-existing square?")
    }

    target.piece = null
}

function checkForEnPassant(game: GameState, from: SquareState, to: SquareState): void {
    if (from.piece!.toLowerCase() === 'p' && Math.abs(from.rank - to.rank) == 2) {
        const rank = (from.rank + to.rank) / 2
        game.enPassantTargetSquare = game.squares[rank][to.file]
    } else {
        game.enPassantTargetSquare = null
    }
}

function executeCastling(game: GameState, from: SquareState, to: SquareState): void {
    if (from.file > to.file) {
        const rookFrom = getSquare(game, from.rank, 0)!
        const rookTo = getSquare(game, from.rank, 3)!
        rookTo.piece = rookFrom.piece
        rookFrom.piece = null
    } else {
        const rookFrom = getSquare(game, from.rank, 7)!
        const rookTo = getSquare(game, from.rank, 5)!
        rookTo.piece = rookFrom.piece
        rookFrom.piece = null
    }
}

function checkForCastling(game: GameState, from: SquareState, to: SquareState): void {
    if (from.piece === 'K') {
        removeCastling(game, 'Q')
        removeCastling(game, 'K')
    }
    if (from.piece === 'R' && from.file == 0) {
        removeCastling(game, 'Q')
    }
    if (from.piece === 'R' && from.file == 7) {
        removeCastling(game, 'K')
    }
    if (from.piece === 'k') {
        removeCastling(game, 'q')
        removeCastling(game, 'k')
    }
    if (from.piece === 'r' && from.file == 0) {
        removeCastling(game, 'q')
    }
    if (from.piece === 'r' && from.file == 7) {
        removeCastling(game, 'k')
    }
}

function removeCastling(game: GameState, castling: string): void {
    const index = game.castlingAvailability.indexOf(castling)
    if (index >= 0) {
        game.castlingAvailability.splice(index, 1)
    }
}

function possiblyPromote(piece: string, promotion: string): string {
    if (promotion === '') {
        return piece
    }

    if (piece >= 'a' && piece <= 'z') {
        return promotion
    }

    return promotion.toUpperCase()
}

function createFenMove(from: SquareState, to: SquareState, promotion: string): string {
    return createFenPosition(from) + createFenPosition(to) + promotion
}

function createFenPosition(square: SquareState): string {
    const file = String.fromCodePoint("a".codePointAt(0)! + square.file)
    const rank = (square.rank + 1).toString()
    return file + rank
}
