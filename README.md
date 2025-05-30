**Premise: Backend for minesweeper (including state management)**

# Front-End is already there somewhere.

- I have to build the backend such that the front-end can call it.

## What is the front-end looking for:

- Want to facilitate a game
- All of the actions that the user needs to achieve
- Handle all of the logic
- Define all the actions of Minesweeper. Expose them in API so that the front-end can call
- Functions are fine
- Any protocol is fine (this would not focus on security too much)


## Rules:

- All the regular minesweeper actions
Example: 
- Empty boxes reveal a large section
- Numbers represent mines around them? (Diagonal and sideways)
- If the user clicks on a mine then we reveal all the mines (don't worry about that).

---

# Implementation Details

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Create a new game
- **POST** `/api/games`
- **Body**: 
```json
{
    "width": number,
    "height": number
}
```
- **Response**: Game state with gameId

### Get game state
- **GET** `/api/games/:gameId`
- **Response**: Current game state

### Reveal a cell
- **POST** `/api/games/:gameId/reveal`
- **Body**:
```json
{
    "x": number,
    "y": number
}
```
- **Response**: Updated game state

### Toggle flag
- **POST** `/api/games/:gameId/flag`
- **Body**:
```json
{
    "x": number,
    "y": number
}
```
- **Response**: Updated game state

### Delete a game
- **DELETE** `/api/games/:gameId`
- **Response**: 204 No Content

## Development

- Build the project:
```bash
npm run build
```

- Start production server:
```bash
npm start
```

## Game State Format

The game state response includes:
```json
{
    "grid": [
        [
            {
                "state": string,     // "F" for flag, "." for hidden, "*" for mine, " " for empty, or number
                "isRevealed": boolean,
                "isFlagged": boolean
            }
        ]
    ],
    "gameOver": boolean,
    "isWon": boolean,
    "width": number,
    "height": number,
    "mineCount": number
}
```
