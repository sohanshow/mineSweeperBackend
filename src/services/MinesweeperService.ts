import { Board } from '../core/Board';

export class MinesweeperService {
    private games: Map<string, Board> = new Map();

    /**
     * Creates a new game of Minesweeper
     */
    createGame(width: number, height: number): string {
        const gameId = this.generateGameId();
        const board = new Board(width, height);
        this.games.set(gameId, board);
        return gameId;
    }

    /**
     * Gets the current state of a game
     */
    getGameState(gameId: string) {
        const board = this.getBoard(gameId);
        return {
            grid: board.grid.map(row => row.map(cell => ({
                state: cell.getState(),
                isRevealed: cell.isRevealed,
                isFlagged: cell.isFlagged
            }))),
            gameOver: board.gameOver,
            isWon: board.isWon,
            width: board.width,
            height: board.height,
            mineCount: board.mineCount
        };
    }

    /**
     * Reveals a cell at the specified coordinates
     */
    revealCell(gameId: string, x: number, y: number) {
        const board = this.getBoard(gameId);
        const result = board.revealCell(x, y);
        return {
            success: result,
            ...this.getGameState(gameId)
        };
    }

    /**
     * Toggles flag at the specified coordinates
     */
    toggleFlag(gameId: string, x: number, y: number) {
        const board = this.getBoard(gameId);
        const result = board.toggleFlag(x, y);
        return {
            success: result,
            ...this.getGameState(gameId)
        };
    }

    /**
     * Deletes a game
     */
    deleteGame(gameId: string): boolean {
        return this.games.delete(gameId);
    }

    private getBoard(gameId: string): Board {
        const board = this.games.get(gameId);
        if (!board) {
            throw new Error(`Game with ID ${gameId} not found`);
        }
        return board;
    }

    private generateGameId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
} 