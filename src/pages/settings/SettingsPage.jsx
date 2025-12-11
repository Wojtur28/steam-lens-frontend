import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        apiKey: "",
        steamId: "",
        accessToken: ""
    });
    const [saved, setSaved] = useState(false);

    // Pobierz dane z localStorage przy załadowaniu strony
    useEffect(() => {
        const storedApiKey = localStorage.getItem("steam_api_key") || "";
        const storedSteamId = localStorage.getItem("steam_id") || "";
        const storedAccessToken = localStorage.getItem("steam_access_token") || "";

        setFormData({
            apiKey: storedApiKey,
            steamId: storedSteamId,
            accessToken: storedAccessToken
        });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setSaved(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem("steam_api_key", formData.apiKey);
        localStorage.setItem("steam_id", formData.steamId);
        localStorage.setItem("steam_access_token", formData.accessToken);

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <section className={styles.settings}>
            <header className={styles.settings__head}>
                <h1>{t('settings.title', 'Ustawienia')}</h1>
                <p className={styles.settings__subtitle}>
                    {t('settings.subtitle', 'Konfiguracja kluczy API i danych użytkownika')}
                </p>
            </header>

            <div className={styles.settings__content}>
                <form onSubmit={handleSave} className={styles.form}>

                    <div className={styles.formGroup}>
                        <label htmlFor="steamId">Steam ID (64-bit)</label>
                        <input
                            type="text"
                            id="steamId"
                            name="steamId"
                            value={formData.steamId}
                            onChange={handleChange}
                            placeholder="np. 76561198000000000"
                        />
                        <span className={styles.hint}>Nadpisuje domyślne ID z pliku .env</span>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="accessToken">Access Token (Family Sharing)</label>
                        <input
                            type="password" // password, żeby nie było widać od razu długiego ciągu
                            id="accessToken"
                            name="accessToken"
                            value={formData.accessToken}
                            onChange={handleChange}
                            placeholder="Bearer ..."
                        />
                        <span className={styles.hint}>Wymagany do endpointów /family. Przesyłany jako nagłówek X-Steam-Access-Token.</span>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="apiKey">WebAPI Key</label>
                        <input
                            type="password"
                            id="apiKey"
                            name="apiKey"
                            value={formData.apiKey}
                            onChange={handleChange}
                            placeholder="Twój klucz API Steam"
                        />
                        <span className={styles.hint}>Opcjonalne. Przesyłane jako nagłówek X-Steam-Web-API-Key.</span>
                    </div>

                    <div className={styles.formFooter}>
                        <button type="submit" className={styles.saveButton}>
                            {saved ? t('settings.saved', 'Zapisano!') : t('settings.save', 'Zapisz zmiany')}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}