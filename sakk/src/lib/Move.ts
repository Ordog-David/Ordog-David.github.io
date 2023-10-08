import { getSquare } from "./Common"
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
    // TODO: Castling
    // TODO: Check
    // TODO: Checkmate

    to.piece = possiblyPromote(from.piece, promotion)
    from.piece = null

    game.fenMoves.push(createFenMove(from, to, promotion))
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
