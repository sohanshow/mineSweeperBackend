import { Cell } from "./Cell";

export class Board {
    private _grid: Cell[][];
    private _width: number;
    private _height: number;
    private _mineCount: number = 15;
    private mineLocations: Set<string> = new Set();
    private _gameOver: boolean = false;
    private _isWon: boolean = false;
    
    constructor(width: number, height: number){
        this._width = width;
        this._height = height;
        this._grid = [];
        this.initializeBoard();
        this.placeMines();
        this.calculateNeighborCounts();
    }

    private initializeBoard(): void {
        this._grid = Array(this._height).fill(null).map((_, y) => 
            Array(this._width).fill(null).map((_, x) => new Cell(x, y))
        );
    }

    private placeMines(): void {
        let minesPlaced = 0;

        while (minesPlaced < this._mineCount) {
            const x = Math.floor(Math.random() * this._width);
            const y = Math.floor(Math.random() * this._height);
            const key = `${x},${y}`;

            if (!this.mineLocations.has(key)) {
                this.mineLocations.add(key);
                this._grid[y][x].setMine();
                minesPlaced++;
            }
        }
    }

    private calculateNeighborCounts(): void {
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                if (!this._grid[y][x].isMine) {
                    const count = this.countAdjacentMines(x, y);
                    this._grid[y][x].setNeighborMineCount(count);
                }
            }
        }
    }

    private countAdjacentMines(x: number, y: number): number {
        let count = 0;

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const newX = x + dx;
                const newY = y + dy;
                if (this.isValidPosition(newX, newY) && this._grid[newY][newX].isMine) {
                    count++;
                }
            }
        }
        return count;
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    }

    public revealCell(x: number, y: number): boolean {
        if (!this.isValidPosition(x, y) || this._gameOver || this._grid[y][x].isFlagged || this._grid[y][x].isRevealed) {
            return false;
        }

        const cell = this._grid[y][x];
        cell.reveal();

        if (cell.isMine) {
            this._gameOver = true;
            this.revealAllMines();
            return false;
        }

        if (cell.neighborMineCount === 0) {
            this.revealAdjacentCells(x, y);
        }

        this.checkWinCondition();
        return true;
    }

    private revealAdjacentCells(x: number, y: number): void {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const newX = x + dx;
                const newY = y + dy;
                if (this.isValidPosition(newX, newY) && !this._grid[newY][newX].isRevealed && !this._grid[newY][newX].isFlagged) {
                    this.revealCell(newX, newY);
                }
            }
        }
    }

    private revealAllMines(): void {
        this.mineLocations.forEach(key => {
            const [x, y] = key.split(',').map(Number);
            this._grid[y][x].reveal();
        });
    }

    public toggleFlag(x: number, y: number): boolean {
        if (!this.isValidPosition(x, y) || this._gameOver || this._grid[y][x].isRevealed) {
            return false;
        }

        this._grid[y][x].toggleFlag();
        return true;
    }

    private checkWinCondition(): void {
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                const cell = this._grid[y][x];
                if (!cell.isMine && !cell.isRevealed) {
                    return;
                }
            }
        }
        this._isWon = true;
        this._gameOver = true;
    }

    // Getters
    get grid(): Cell[][] {
        return this._grid;
    }

    get gameOver(): boolean {
        return this._gameOver;
    }

    get isWon(): boolean {
        return this._isWon;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get mineCount(): number {
        return this._mineCount;
    }
}


