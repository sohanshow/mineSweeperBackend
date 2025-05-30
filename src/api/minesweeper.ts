import express from 'express';
import { MinesweeperService } from '../services/MinesweeperService';

const router = express.Router();
const minesweeperService = new MinesweeperService();

// Create a new game
router.post('/games', (req, res) => {
    try {
        const { width, height } = req.body;
        
        if (!width || !height || width < 1 || height < 1) {
            return res.status(400).json({ 
                error: 'Invalid dimensions. Width and height must be positive numbers.' 
            });
        }

        const gameId = minesweeperService.createGame(width, height);
        const gameState = minesweeperService.getGameState(gameId);

        res.status(201).json({
            gameId,
            ...gameState
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create game' });
    }
});

// Get game state
router.get('/games/:gameId', (req, res) => {
    try {
        const { gameId } = req.params;
        const gameState = minesweeperService.getGameState(gameId);
        res.json(gameState);
    } catch (error) {
        res.status(404).json({ error: 'Game not found' });
    }
});

// Reveal a cell
router.post('/games/:gameId/reveal', (req, res) => {
    try {
        const { gameId } = req.params;
        const { x, y } = req.body;

        if (typeof x !== 'number' || typeof y !== 'number') {
            return res.status(400).json({ 
                error: 'Invalid coordinates. X and Y must be numbers.' 
            });
        }

        const result = minesweeperService.revealCell(gameId, x, y);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: 'Game not found' });
    }
});

// Toggle flag
router.post('/games/:gameId/flag', (req, res) => {
    try {
        const { gameId } = req.params;
        const { x, y } = req.body;

        if (typeof x !== 'number' || typeof y !== 'number') {
            return res.status(400).json({ 
                error: 'Invalid coordinates. X and Y must be numbers.' 
            });
        }

        const result = minesweeperService.toggleFlag(gameId, x, y);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: 'Game not found' });
    }
});

// Delete a game
router.delete('/games/:gameId', (req, res) => {
    try {
        const { gameId } = req.params;
        const result = minesweeperService.deleteGame(gameId);
        
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete game' });
    }
});

export default router; 