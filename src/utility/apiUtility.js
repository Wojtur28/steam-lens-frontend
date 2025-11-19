export async function apiRequest(url, options) {
    const response = await fetch(url, options);

    let json;

    try {
        json = await response.json();
    } catch (e) {
        const errorText = await response.text();

        throw new Error(
            `Błąd w parsowaniu odpowiedzi (HTTP ${response.status} ${response.statusText}). ` +
            `Serwer zwrócił nieoczekiwany format (oczekiwano JSON). ` +
            `Początek odpowiedzi: "${errorText.substring(0, 50)}..."`
        );
    }

    if (json.success) {
        return json;
    }

    throw json.error;
}