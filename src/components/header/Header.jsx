import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";

export default function Header() {

    const {t} = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
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
                        <NavLink to="/settings" className={styles.header__dropdownLink} onClick={closeDropdown}>
                            {t('header.settings')}
                        </NavLink>
                        <button className={styles.header__dropdownButton} onClick={closeDropdown}>
                            {t('header.logout')}
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}