import {Game} from "@/models/game.js";
import {apiRequest} from "@/utility/apiUtility.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STEAM_ID = import.meta.env.VITE_STEAM_ID;
const FAMILY_GROUP_ID = import.meta.env.VITE_FAMILY_GROUP_ID;

function getSteamId() {
    const localId = localStorage.getItem("steam_id");
    const envId = import.meta.env.VITE_STEAM_ID;
    return localId || envId;
}

export async function fetchUserGames(page = 0, pageSize = 12) {
    const steamId = getSteamId();
    if (!steamId) throw new Error("Brak Steam ID. Ustaw je w pliku .env lub w zakładce Ustawienia.");

    const url = `${API_BASE_URL}/api/steam/user/games/${steamId}?page=${page}&pageSize=${pageSize}`;

    const response = await apiRequest(url);

    const games = (response.data || []).map(gameData => new Game(gameData));
    const meta = response.meta || null;

    return {games, meta};
}

export async function fetchDashboardSummary() {
    const steamId = getSteamId();
    if (!steamId) throw new Error("Brak Steam ID.");

    const url = `${API_BASE_URL}/api/steam/dashboard/${steamId}`;

    const response = await apiRequest(url);

    return response.data;
}

export async function fetchSharedLibrary() {
    const steamId = getSteamId();
    // Tutaj Family Group ID też można by wynieść do settings, na razie zostawiam ENV
    const familyGroupId = import.meta.env.VITE_FAMILY_GROUP_ID;

    if (!familyGroupId) {
        throw new Error("Brak FAMILY_GROUP_ID w konfiguracji (.env)");
    }

    // apiRequest automatycznie doda nagłówek X-Steam-Access-Token z localStorage
    const url = `${API_BASE_URL}/api/steam/family/shared-library/${familyGroupId}?steamId=${steamId}`;
    const response = await apiRequest(url);

    return response.data;
}

export async function fetchStoreAppDetails(appId) {
    const url = `${API_BASE_URL}/api/steam/store/app/${appId}`;
    const response = await apiRequest(url);
    return response.data;
}