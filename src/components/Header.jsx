import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__brand}>
                <img className={styles.header__logo} src="src/assets/logo.png"  alt={"Steam Leans Logo"}/>
                <span className={styles.header__title}>SteamLeans</span>
            </div>
            <img className={styles.header__avatar} src="https://i.pravatar.cc/40" alt="User avatar" />
        </header>
    );
}
