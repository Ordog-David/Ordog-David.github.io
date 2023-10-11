enum State {
    Uninitialised = 'uninitialised',
    Initialising = 'initialising',
    Waiting = 'waiting',
    Searching = 'searching'
};

export class Stockfish {
    state: State = State.Uninitialised
    stockfish: Worker | null = null
    skillLevel: number

    onInitCompleted: (() => void) | null = null
    onBestMoveReceived: ((move: string) => void) | null = null

    constructor(skillLevel: number) {
        this.skillLevel = skillLevel
    }

    postMessage(message: string) {
        console.log('ui -> stockfish: ' + message)
        this.stockfish!.postMessage(message);
    }

    // Callback when receiving UCI messages from Stockfish.
    onMessageReceived({ data }: { data: string }): void {
        const message = data

        console.log("stockfish -> ui: " + message)
        if (this.onInitCompleted && message === 'uciok' ) {
            this.onInitCompleted();
        }

        if (this.onBestMoveReceived && message.slice(0, 8) === 'bestmove' ) {
            this.onBestMoveReceived(message);
        }
    }

    // Initialise Stockfish. Resolve promise after receiving uciok.
    init(): Promise<void> {
        return new Promise((resolve) => {
            this.state = State.Initialising;

            //this.stockfish = new Worker(new URL('./stockfish.js', import.meta.url));
            this.stockfish = new Worker('./stockfish.js');
            this.stockfish.addEventListener('message', (message) => this.onMessageReceived(message));
    
            this.onInitCompleted = () => {
                if (this.state === State.Initialising) {
                    this.state = State.Waiting;
                    this.onInitCompleted = null;
                    this.postMessage('setoption name Skill Level value ' + this.skillLevel)
                    resolve();
                }
            };
            this.postMessage('uci')
        });
    }

    getMove(fen: string): Promise<string> {
        return new Promise((resolve) => {
            if (this.stockfish === null || this.state !== State.Waiting) {
                throw new Error('Engine not ready (state: ' + this.state + ')');
            }

            this.state = State.Searching;

            this.onBestMoveReceived = (message: string) => {
                this.state = State.Waiting;
                this.onBestMoveReceived = null;
                resolve(message.split(' ')[1]);
            };
            this.postMessage('position fen ' + fen);
            this.postMessage('go');
        });
    }
}
