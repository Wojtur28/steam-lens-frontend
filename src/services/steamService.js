import {Game} from "@/models/game.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STEAM_ID = import.meta.env.VITE_STEAM_ID;

export async function fetchUserGames(page = 0, pageSize = 12) {
    const response = await fetch(`${API_BASE_URL}/api/steam/user/games/${STEAM_ID}?page=${page}&pageSize=${pageSize}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'API request failed');
    }

    const games = (data.data || []).map(gameData => new Game(gameData));
    const meta = data.meta || null;

    return {games, meta};
}