import { SquareState } from "./SquareState"
import type { Stockfish } from "./Stockfish"

export class GameState {
    squares: Array<Array<SquareState>>
    playerColor: string
    activeColor: string = "w"
    castlingAvailability: Array<string> = Array()
    enPassantTargetSquare: SquareState | null = null
    stockfish: Stockfish | null
    fenStartingPosition: string = ''
    fenMoves: Array<string> = new Array()

    constructor(playerColor: string, stockfish: Stockfish | null) {
        this.squares = this.createSquares()
        this.playerColor = playerColor
        this.stockfish = stockfish
    }

    createSquares(): Array<Array<SquareState>> {
        const ranks = new Array(8)
        for (let r = 0; r < ranks.length; r++) {
            ranks[r] = this.createRank(r)
        }
        return ranks
    }

    createRank(r: number): Array<SquareState> {
        const rank = new Array(8)
        for (let f = 0; f < rank.length; f++) {
            rank[f] = new SquareState(r, f)
        }
        return rank
    }

    getFen(): string {
        let fen = this.fenStartingPosition
        if (this.fenMoves.length !== 0) {
            fen += ' moves ' + this.fenMoves.join(' ')
        }
        return fen
    }

    getSquare(square: SquareState): SquareState {
        return this.squares[square.rank][square.file]
    }

    clone(): GameState {
        const cloned = new GameState(this.playerColor, null)

        for (let r = 0; r < 8; r++) {
            for (let f = 0; f < 8; f++) {
                cloned.squares[r][f] = this.squares[r][f].clone()
            }
        }

        cloned.activeColor = this.activeColor
        cloned.castlingAvailability = Object.assign([], this.castlingAvailability)
        if (this.enPassantTargetSquare !== null) {
            cloned.enPassantTargetSquare = cloned.getSquare(this.enPassantTargetSquare)
        } else {
            cloned.enPassantTargetSquare = null
        }

        return cloned
    }
}
