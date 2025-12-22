import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        apiKey: "",
        steamId: "",
        familyId: "",
        accessToken: ""
    });

    // Pobierz dane z localStorage przy załadowaniu strony
    useEffect(() => {
        const storedApiKey = localStorage.getItem("steam_api_key") || "";
        const storedSteamId = localStorage.getItem("steam_id") || "";
        const storedFamilyId = localStorage.getItem("steam_family_id") || "";
        const storedAccessToken = localStorage.getItem("steam_access_token") || "";

        setFormData({
            apiKey: storedApiKey,
            steamId: storedSteamId,
            familyId: storedFamilyId,
            accessToken: storedAccessToken
        });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        // Mapowanie nazw pól na klucze localStorage
        const storageKeys = {
            apiKey: 'steam_api_key',
            steamId: 'steam_id',
            familyId: 'steam_family_id',
            accessToken: 'steam_access_token'
        };

        // Zapisz automatycznie do localStorage
        localStorage.setItem(storageKeys[name], value);
    };

    return (
        <section className={styles.settings}>
            <header className={styles.settings__head}>
                <h1>{t('settings.title', 'Ustawienia')}</h1>
            </header>

            <div className={styles.settings__inputs}>
                <input
                    type="text"
                    name="steamId"
                    value={formData.steamId}
                    onChange={handleChange}
                    placeholder="Steam ID (64-bit)"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="familyId"
                    value={formData.familyId}
                    onChange={handleChange}
                    placeholder="Family Group ID"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="accessToken"
                    value={formData.accessToken}
                    onChange={handleChange}
                    placeholder="Access Token"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="apiKey"
                    value={formData.apiKey}
                    onChange={handleChange}
                    placeholder="WebAPI Key"
                    className={styles.input}
                />
            </div>
        </section>
    );
}