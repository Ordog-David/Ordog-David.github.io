import { SquareState } from "./SquareState"
import { Stockfish } from "./Stockfish"

export class GameState {
    squares: Array<Array<SquareState>>
    playerColor: string
    activeColor: string = "w"
    castlingAvailability: Array<string> = Array()
    enPassantTargetSquare: SquareState | null = null
    stockfish: Stockfish
    fenStartingPosition: string = ''
    fenMoves: Array<string> = new Array()

    constructor(playerColor: string) {
        this.squares = this.createSquares()
        this.playerColor = playerColor
        this.stockfish = new Stockfish(4000, 20)
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
}
