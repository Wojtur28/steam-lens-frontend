import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "header": {
                "library": "Library",
                "achievements": "Achievements",
                "dashboard": "Dashboard",
                "family": "Family",
                "profile": "Profile",
                "settings": "Settings",
                "logout": "Logout"
            },
            "main": {
                "yourGames": "Your games"
            },
            "library": {
                "title": "Library",
                "subtitle": "Your game collection",
                "loading": "Loading...",
                "error": "Error",
                "noGames": "No games found.",
                "pagination": {
                    "prev": "Previous",
                    "next": "Next",
                    "pageInfo": "Page {{currentPage}} of {{totalPages}}"
                },
                "card": {
                    "played": "Played: {{hours}}h",
                    "lastPlayed": "Last played: {{date}}"
                },
                "sort": {
                    "title": "Title",
                    "playtime": "Playtime",
                    "lastPlayed": "Last Played"
                }
            },
            "dashboard": {
                "loading": "Loading data...",
                "error": "Error loading: {{message}}",
                "title": "Dashboard",
                "subtitle": "Activity overview for the last 14 days",
                "cards": {
                    "totalPlaytime": {
                        "title": "Total playtime (14 days)",
                        "hint": "{{minutes}} minutes total"
                    },
                    "topGame": {
                        "title": "Favorite game (14 days)",
                        "noActivity": "No activity"
                    },
                    "dailyAverage": {
                        "title": "Daily average",
                        "hint": "Last 14 days"
                    },
                    "gamesCount": {
                        "title": "Games played",
                        "hint": "Unique games in 14 days"
                    }
                },
                "charts": {
                    "topGamesMinutes": "Top games by time (minutes)"
                },
                "recentGames": {
                    "title": "Recently played games ({{count}})",
                    "timeframe": "(in 14 days)"
                }
            },
            "profile": {
                "title": "Profile",
                "subtitle": "Manage your profile settings and preferences",
                "sections": {
                    "userInfo": {
                        "title": "User Information",
                        "name": "Name:",
                        "email": "Email:"
                    },
                    "accountSettings": {
                        "title": "Account Settings",
                        "description": "Change your password, manage connected accounts, and update preferences."
                    }
                }
            },
            "settings": {
                "title": "Settings"
            },
            "family": {
                "title": "Family Library",
                "subtitle": "Shared game collection",
                "loading": "Loading...",
                "error": "Error:",
                "totalValue": "Library Value",
                "totalGames": "Number of Games"
            },
            "errors": {
                "title": "Error",
                "close": "Close",
                "api": {
                    "parseError": "Error parsing response (HTTP {{status}} {{statusText}}). Server returned unexpected format. Response start: \"{{text}}...\"",
                    "unknownError": "An unknown API error occurred"
                },
                "steamId": {
                    "missing": "Steam ID is missing. Please set it in Settings.",
                    "missingEnv": "Steam ID is missing. Please set it in .env file or in Settings."
                },
                "familyId": {
                    "missing": "Family Group ID is missing. Please set it in Settings.",
                    "missingConfig": "FAMILY_GROUP_ID is missing in configuration."
                },
                "network": "Network error. Please check your connection.",
                "unauthorized": "Unauthorized. Please check your access token."
            }
        }
    },
    pl: {
        translation: {
            "header": {
                "library": "Biblioteka",
                "achievements": "Osiągnięcia",
                "dashboard": "Panel główny",
                "family": "Rodzinka",
                "profile": "Profil",
                "settings": "Ustawienia",
                "logout": "Wyloguj się"
            },
            "main": {
                "yourGames": "Twoje gry"
            },
            "library": {
                "title": "Biblioteka",
                "subtitle": "Twoja kolekcja gier",
                "loading": "Ładowanie...",
                "error": "Błąd",
                "noGames": "Nie znaleziono gier.",
                "pagination": {
                    "prev": "Poprzednia",
                    "next": "Następna",
                    "pageInfo": "Strona {{currentPage}} z {{totalPages}}"
                },
                "card": {
                    "played": "Grano: {{hours}}h",
                    "lastPlayed": "Ostatnio grano: {{date}}"
                },
                "sort": {
                    "title": "Tytuł",
                    "playtime": "Czas gry",
                    "lastPlayed": "Ostatnio grano"
                }
            },
            "dashboard": {
                "loading": "Ładowanie danych...",
                "error": "Błąd ładowania: {{message}}",
                "title": "Dashboard",
                "subtitle": "Podgląd aktywności z ostatnich 14 dni",
                "cards": {
                    "totalPlaytime": {
                        "title": "Total playtime (14 dni)",
                        "hint": "{{minutes}} minut łącznie"
                    },
                    "topGame": {
                        "title": "Ulubiona gra (14 dni)",
                        "noActivity": "Brak aktywności"
                    },
                    "dailyAverage": {
                        "title": "Średnio dziennie",
                        "hint": "Ostatnie 14 dni"
                    },
                    "gamesCount": {
                        "title": "Zagranych gier",
                        "hint": "Różnych gier w 14 dni"
                    }
                },
                "charts": {
                    "topGamesMinutes": "Top gry wg czasu (minuty)"
                },
                "recentGames": {
                    "title": "Ostatnio zagrane gry ({{count}})",
                    "timeframe": "(w 14 dni)"
                }
            },
            "profile": {
                "title": "Profil",
                "subtitle": "Zarządzaj ustawieniami profilu i preferencjami",
                "sections": {
                    "userInfo": {
                        "title": "Informacje o użytkowniku",
                        "name": "Imię:",
                        "email": "Email:"
                    },
                    "accountSettings": {
                        "title": "Ustawienia konta",
                        "description": "Zmień hasło, zarządzaj połączonymi kontami i aktualizuj preferencje."
                    }
                }
            },
            "settings": {
                "title": "Ustawienia"
            },
            "family": {
                "title": "Biblioteka Rodzinna",
                "subtitle": "Współdzielona kolekcja gier",
                "loading": "Ładowanie...",
                "error": "Błąd:",
                "totalValue": "Wartość Biblioteki",
                "totalGames": "Liczba Gier"
            },
            "errors": {
                "title": "Błąd",
                "close": "Zamknij",
                "api": {
                    "parseError": "Błąd w parsowaniu odpowiedzi (HTTP {{status}} {{statusText}}). Serwer zwrócił nieoczekiwany format. Początek odpowiedzi: \"{{text}}...\"",
                    "unknownError": "Wystąpił nieznany błąd API"
                },
                "steamId": {
                    "missing": "Brak Steam ID. Ustaw je w Ustawieniach.",
                    "missingEnv": "Brak Steam ID. Ustaw je w pliku .env lub w Ustawieniach."
                },
                "familyId": {
                    "missing": "Brak Family Group ID. Ustaw je w Ustawieniach.",
                    "missingConfig": "Brak FAMILY_GROUP_ID w konfiguracji."
                },
                "network": "Błąd sieci. Sprawdź swoje połączenie.",
                "unauthorized": "Brak autoryzacji. Sprawdź swój token dostępu."
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;