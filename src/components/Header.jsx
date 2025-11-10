import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Header() {

    const {t} = useTranslation();

    return (
        <header className={styles.header}>
            <div className={styles.header__brand}>
                <img className={styles.header__logo} src="src/assets/logo.png"  alt={"Steam Leans Logo"}/>
                <NavLink to="/" className={styles.header__title}>SteamLeans</NavLink>
            </div>

            <nav className={styles.header__nav}>
                <NavLink to="/library" className={styles.header__link}>{t('header.library')}</NavLink>
                <NavLink to="/achievement" className={styles.header__link}>{t('header.achievements')}</NavLink>
            </nav>

            <img className={styles.header__avatar} src="https://i.pravatar.cc/40" alt="User avatar" />
        </header>
    );
}
