export class SquareState {
    rank: number
    file: number
    piece: string | null = null
    clickable: boolean = false
    selected: boolean = false
    moveDestination: boolean = false
    checked: boolean = false

    constructor(rank: number, file: number) {
        this.rank = rank
        this.file = file
    }

    pieceColor(): string | null {
        if (this.piece === null) {
            return null
        }

        if (this.piece >= 'a' && this.piece <= 'z') {
            return 'b'
        }

        return 'w'
    }

    clone(): SquareState {
        const cloned = new SquareState(this.rank, this.file)
        cloned.piece = this.piece
        cloned.clickable = this.clickable
        cloned.selected = this.selected
        cloned.moveDestination = this.moveDestination
        cloned.checked = this.checked
        return cloned
    }
}
