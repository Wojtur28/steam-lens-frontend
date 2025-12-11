export async function apiRequest(url, options = {}) {
    // 1. Pobierz zapisane tokeny
    const accessToken = localStorage.getItem("steam_access_token");
    const apiKey = localStorage.getItem("steam_api_key");

    // 2. Przygotuj nagłówki
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers, // Zachowaj inne nagłówki jeśli zostały przekazane
    };

    // 3. Dodaj nagłówki dynamicznie, jeśli istnieją w ustawieniach
    if (accessToken) {
        headers['X-Steam-Access-Token'] = accessToken;
    }

    // Opcjonalnie, jeśli backend będzie tego potrzebował w przyszłości:
    if (apiKey) {
        headers['X-Steam-Web-API-Key'] = apiKey;
    }

    // 4. Wykonaj zapytanie z nowymi nagłówkami
    const updatedOptions = {
        ...options,
        headers: headers
    };

    const response = await fetch(url, updatedOptions);

    let json;

    try {
        json = await response.json();
    } catch (e) {
        const errorText = await response.text();
        throw new Error(
            `Błąd w parsowaniu odpowiedzi (HTTP ${response.status} ${response.statusText}). ` +
            `Serwer zwrócił nieoczekiwany format. ` +
            `Początek odpowiedzi: "${errorText.substring(0, 50)}..."`
        );
    }

    if (json.success) {
        return json;
    }

    throw json.error || new Error("Wystąpił nieznany błąd API");
}