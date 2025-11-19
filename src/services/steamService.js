import {Game} from "@/models/game.js";
import {apiRequest} from "@/utility/apiUtility.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STEAM_ID = import.meta.env.VITE_STEAM_ID;

export async function fetchUserGames(page = 0, pageSize = 12) {
    const url = `${API_BASE_URL}/api/steam/user/games/${STEAM_ID}?page=${page}&pageSize=${pageSize}`;

    const response = await apiRequest(url);

    const games = (response.data || []).map(gameData => new Game(gameData));

    const meta = response.meta || null;

    return {games, meta};
}

export async function fetchDashboardSummary() {
    const url = `${API_BASE_URL}/api/steam/dashboard/${STEAM_ID}`;

    const response = await apiRequest(url);

    return response.data;
}