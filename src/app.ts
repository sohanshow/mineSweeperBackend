import express from 'express';
import cors from 'cors';
import minesweeperRoutes from './api/minesweeper';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', minesweeperRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong in our Minesweeper Backend!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app; 