export async function apiRequest(url, options = {}) {
    const accessToken = localStorage.getItem("steam_access_token");
    const apiKey = localStorage.getItem("steam_api_key");

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        headers['X-Steam-Access-Token'] = accessToken;
    }

    if (apiKey) {
        headers['X-API-KEY'] = apiKey;
    }

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
        throw {
            key: 'errors.api.parseError',
            params: {
                status: response.status,
                statusText: response.statusText,
                text: errorText.substring(0, 50)
            }
        };
    }

    if (json.success) {
        return json;
    }

    // If error is a string, pass it as is. If it's an object with a key, use that for i18n
    throw json.error || {key: 'errors.api.unknownError'};
}