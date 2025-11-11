import styles from "./LibraryPage.module.css";

export default function LibraryPage() {
    return (
        <section className={styles.library}>
            <header className={styles.library__head}>
                <h1>Library</h1>
                <p className={styles.library__subtitle}>Your game collection</p>
            </header>

            <div className={styles.library__grid}>
                <div className={styles.card}>
                    <div className={styles.card__head}>Team Fortess 2</div>
                    <div className={styles.card__value}>Played: 20h</div>
                    <div className={styles.card__image}>
                        <img
                            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/capsule_231x87.jpg?t=1757348372"
                            alt="Game Title 1"/>
                    </div>
                    <div className={styles.card__hint}>Last played: 2 days ago</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Game Title 2</div>
                    <div className={styles.card__value}>Played: 15h</div>
                    <div className={styles.card__hint}>Last played: 5 days ago</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Game Title 3</div>
                    <div className={styles.card__value}>Played: 30h</div>
                    <div className={styles.card__hint}>Last played: 1 day ago</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Game Title 4</div>
                    <div className={styles.card__value}>Played: 10h</div>
                    <div className={styles.card__hint}>Last played: 10 days ago</div>
                </div>
            </div>
        </section>
    )
}