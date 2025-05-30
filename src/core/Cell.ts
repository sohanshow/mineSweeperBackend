export class Cell {
    private _isMine: boolean = false;
    private _isRevealed: boolean = false;
    private _isFlagged: boolean = false;
    private _neighborMineCount: number = 0;
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    // Getters
    get isMine(): boolean { return this._isMine; }
    get isRevealed(): boolean { return this._isRevealed; }
    get isFlagged(): boolean { return this._isFlagged; }
    get neighborMineCount(): number { return this._neighborMineCount; }
    get x(): number { return this._x; }
    get y(): number { return this._y; }

    // Game actions
    setMine(): void {
        this._isMine = true;
    }

    getCoordinateKey(): string {
        return `${this._x},${this._y}`;
    }

    reveal(): void {
        if (!this._isFlagged) {
            this._isRevealed = true;
        }
    }

    toggleFlag(): void {
        if (!this._isRevealed) {
            this._isFlagged = !this._isFlagged;
        }
    }

    setNeighborMineCount(count: number): void {
        this._neighborMineCount = count;
    }

    // Game state helper
    getState(): string {
        if (this._isFlagged) return 'F';
        if (!this._isRevealed) return '.';
        if (this._isMine) return '*';
        return this._neighborMineCount > 0 ? this._neighborMineCount.toString() : ' ';
    }
}