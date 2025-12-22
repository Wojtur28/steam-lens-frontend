import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";

export default function Header() {

    const {t} = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const settingsRef = useRef(null);

    const [formData, setFormData] = useState({
        apiKey: "",
        steamId: "",
        familyId: "",
        accessToken: ""
    });

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

        const storageKeys = {
            apiKey: 'steam_api_key',
            steamId: 'steam_id',
            familyId: 'steam_family_id',
            accessToken: 'steam_access_token'
        };

        localStorage.setItem(storageKeys[name], value);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    }

    const toggleSettings = () => {
        setIsSettingsOpen(prev => !prev);
    };

    const closeSettings = () => {
        setIsSettingsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                closeSettings();
            }
        }

        if (isDropdownOpen || isSettingsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, isSettingsOpen]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__brand}>
                    <img className={styles.header__logo} src="../../assets/logo.png" alt={"Steam Leans Logo"}/>
                    <NavLink to="/" className={styles.header__title}>SteamLeans</NavLink>
                </div>

                <nav className={styles.nav}>
                    <NavLink to="/" className={styles.nav__link}>{t('header.dashboard')}</NavLink>
                    <NavLink to="/library" className={styles.nav__link}>{t('header.library')}</NavLink>
                    <NavLink to="/achievement" className={styles.nav__link}>{t('header.achievements')}</NavLink>
                    <NavLink to="/family" className={styles.nav__link}>{t('header.family')}</NavLink>
                    <button className={styles.nav__settingsButton} onClick={toggleSettings}>
                        {t('header.settings')}
                    </button>
                </nav>

                <div className={styles.header__avatarContainer} ref={dropdownRef}>
                    <img
                        className={styles.header__avatar}
                        src="https://i.pravatar.cc/40"
                        alt="User avatar"
                        onClick={toggleDropdown}
                    />

                    {isDropdownOpen && (
                        <div className={styles.header__dropdown}>
                            <NavLink to="/profile" className={styles.header__dropdownLink} onClick={closeDropdown}>
                                {t('header.profile')}
                            </NavLink>
                            <button className={styles.header__dropdownButton} onClick={closeDropdown}>
                                {t('header.logout')}
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {isSettingsOpen && (
                <div className={styles.settingsModal}>
                    <div className={styles.settingsModal__content} ref={settingsRef}>
                        <div className={styles.settingsModal__header}>
                            <h2>{t('settings.title', 'Ustawienia')}</h2>
                            <button className={styles.settingsModal__close} onClick={closeSettings}>×</button>
                        </div>

                        <div className={styles.settingsModal__form}>
                            <div className={styles.settingsModal__field}>
                                <label htmlFor="steamId">Steam ID (64-bit)</label>
                                <input
                                    type="text"
                                    id="steamId"
                                    name="steamId"
                                    value={formData.steamId}
                                    onChange={handleChange}
                                    placeholder="76561198000000000"
                                />
                            </div>

                            <div className={styles.settingsModal__field}>
                                <label htmlFor="familyId">Family Group ID</label>
                                <input
                                    type="text"
                                    id="familyId"
                                    name="familyId"
                                    value={formData.familyId}
                                    onChange={handleChange}
                                    placeholder="12345678"
                                />
                            </div>

                            <div className={styles.settingsModal__field}>
                                <label htmlFor="accessToken">Access Token</label>
                                <input
                                    type="text"
                                    id="accessToken"
                                    name="accessToken"
                                    value={formData.accessToken}
                                    onChange={handleChange}
                                    placeholder="Bearer..."
                                />
                            </div>

                            <div className={styles.settingsModal__field}>
                                <label htmlFor="apiKey">WebAPI Key</label>
                                <input
                                    type="text"
                                    id="apiKey"
                                    name="apiKey"
                                    value={formData.apiKey}
                                    onChange={handleChange}
                                    placeholder="XXXXXXXXXXXXX"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}