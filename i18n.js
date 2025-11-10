import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "header": {
                "library": "Library",
                "achievements": "Achievements"
            },
            "main": {
                "yourGames": "Your games"
            }
        }
    },
    pl: {
        translation: {
            "header": {
                "library": "Biblioteka",
                "achievements": "Osiągnięcia"
            },
            "main": {
                "yourGames": "Twoje gry"
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