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