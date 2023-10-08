import type { GameState } from "./GameState"
import type { SquareState } from "./SquareState"
import { getSquare } from "./Common"
import { executeMove } from "./Move"

const startPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export function initializeStateFromFEN(game: GameState, fen: string | null = null): void {
    if (fen === null) {
        fen = startPosition
    }

    game.fenStartingPosition = fen

    const [pieces, activeColor, castlingAvailability, enPassantTargetSquare, , , ...moves] = fen.split(' ')
    initializePieces(game, pieces)
    initializeGame(game, activeColor, castlingAvailability, enPassantTargetSquare)
    playMoves(game, moves)
}

function initializePieces(game: GameState, pieces: string): void {
    let rank = 7
    let file = 0
    for (let c = 0; c < pieces.length; c++) {
        const character = pieces[c]
        if (character >= '0' && character <= '9') {
            file += parseInt(character)
        } else if (character === '/') {
            file = 0
            rank--
        } else {
            game.squares[rank][file].piece = character
            file++
        }
    }
}

function initializeGame(game: GameState, activeColor: string, castlingAvailability: string,
                        enPassantTargetSquare: string): void {
    game.activeColor = activeColor
    game.castlingAvailability = castlingAvailability !== '-' ? castlingAvailability : null
    game.enPassantTargetSquare =
        enPassantTargetSquare !== '-' ? getSquareFromCoordinate(game, enPassantTargetSquare) : null
}

function playMoves(game: GameState, moves: Array<string>): void {
    moves.forEach(move => playMove(game, move))
}

export function playMove(game: GameState, move: string): void {
    const from = getSquareFromCoordinate(game, move.substring(0, 2))
    if (from == null) {
        throw new Error("Invalid from position")
    }

    const to = getSquareFromCoordinate(game, move.substring(2, 4))
    if (to == null) {
        throw new Error("Invalid to position")
    }

    const promotion = move.substring(4)

    executeMove(game, from, to, promotion)
}

function getSquareFromCoordinate(game: GameState, stringCoordinate: string): SquareState | null {
    const rank = parseInt(stringCoordinate[1]) - 1
    const file = stringCoordinate.toLowerCase().codePointAt(0)! - "a".codePointAt(0)!
    return getSquare(game, rank, file)
}
