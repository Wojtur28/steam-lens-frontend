import {Game} from "@/models/game.js";
import {apiRequest} from "@/utility/apiUtility.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

function getSteamId() {
    const localId = localStorage.getItem("steam_id");
    const envId = import.meta.env.VITE_STEAM_ID;
    return localId || envId;
}

function getFamilyId() {
    const localId = localStorage.getItem("steam_family_id");
    const envId = import.meta.env.VITE_FAMILY_GROUP_ID;
    return localId || envId;
}

export async function fetchUserGames(page = 0, pageSize = 12) {
    const steamId = getSteamId();
    if (!steamId) throw {key: 'errors.steamId.missingEnv'};

    const url = `${API_BASE_URL}/api/v1/players/${steamId}/games?page=${page}&pageSize=${pageSize}`;

    const response = await apiRequest(url);

    const games = (response.data || []).map(gameData => new Game(gameData));
    const meta = response.meta || null;

    return {games, meta};
}

export async function fetchDashboardSummary() {
    const steamId = getSteamId();
    if (!steamId) throw {key: 'errors.steamId.missing'};

    const url = `${API_BASE_URL}/api/v1/players/${steamId}/dashboard`;

    const response = await apiRequest(url);

    return response.data;
}

export async function getMyFamilyGroup() {
    const steamId = getSteamId();
    if (!steamId) throw {key: 'errors.steamId.missing'};
    const url = `${API_BASE_URL}/api/v1/family/my-group?steamId=${steamId}`;
    const response = await apiRequest(url);
    return response.data;
}

export async function fetchFamilyGroupDetails() {
    const familyGroupId = getFamilyId();
    if (!familyGroupId) throw {key: 'errors.familyId.missing'};
    const url = `${API_BASE_URL}/api/v1/family/${familyGroupId}`;
    const response = await apiRequest(url);
    return response.data;
}

export async function fetchSharedLibrary(page = 0, pageSize = 24) {
    const steamId = getSteamId();
    const familyGroupId = getFamilyId();

    if (!familyGroupId) throw {key: 'errors.familyId.missingConfig'};
    if (!steamId) throw {key: 'errors.steamId.missing'};

    const url = `${API_BASE_URL}/api/v1/family/${familyGroupId}/shared-library?steamId=${steamId}&page=${page}&size=${pageSize}`;

    const response = await apiRequest(url);
    return response.data;
}

export async function fetchStoreAppDetails(appId) {
    const url = `${API_BASE_URL}/api/v1/steam/store/app/${appId}`;
    const response = await apiRequest(url);
    return response.data;
}