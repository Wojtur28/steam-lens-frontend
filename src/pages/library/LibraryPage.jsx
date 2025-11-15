import styles from "./LibraryPage.module.css";
import {useEffect, useState} from "react";
import {Game} from "@/models/game.js";
import {useTranslation} from "react-i18next";


const calculateDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

export default function LibraryPage() {

    const {t} = useTranslation();
    const [games, setGames] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const pageSize = 12;

    useEffect(() => {
        async function fetchGames() {
            const steamId = import.meta.env.VITE_STEAM_ID;

            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:8080/api/steam/user/games/${steamId}?page=${currentPage}&pageSize=${pageSize}`);

                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    const gameInstances = (data.data || []).map(gameData => new Game(gameData));
                    setGames(gameInstances);
                    setMeta(data.meta);
                    setError(null);
                } else {
                    new Error(`HTTP error! status: ${response.status}`);
                }

            } catch (error) {
                setError(error.message);
                setGames([]);
                setMeta(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchGames()
    }, [currentPage]);

    const handlerPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        if (meta && currentPage < meta.totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    if (loading) {
        return (
            <section className={styles.library}>
                <header className={styles.library__head}>
                    <h1>{t('library.title')}</h1>
                    <p className={styles.library__subtitle}>{t('library.subtitle')}</p>
                </header>
                <p>{t('library.loading')}</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.library}>
                <header className={styles.library__head}>
                    <h1>{t('library.title')}</h1>
                    <p className={styles.library__subtitle}>{t('library.subtitle')}</p>
                </header>
                <p>{t('library.error')}: {error}</p>
            </section>
        );
    }

    return (
        <section className={styles.library}>
            <header className={styles.library__head}>
                <h1>{t('library.title')}</h1>
                <p className={styles.library__subtitle}>{t('library.subtitle')}</p>
                {meta && (
                    <div className={styles.pagination}>
                        <button onClick={handlerPreviousPage} disabled={currentPage === 0}>
                            {t('library.pagination.prev')}
                        </button>
                        <span>
                            {t('library.pagination.pageInfo', {
                                currentPage: meta.page + 1,
                                totalPages: meta.totalPages
                            })}
                        </span>
                        <button onClick={handleNextPage} disabled={currentPage >= meta.totalPages - 1}>
                            {t('library.pagination.next')}
                        </button>
                    </div>
                )}
            </header>

            <div className={styles.library__grid}>
                {games.map((game) => (
                    <div className={styles.card} key={game.appid}>
                        <div className={styles.card__image}>
                            <img
                                src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                                alt={game.name}
                            />
                        </div>
                        <div className={styles.card__head}>{game.name}</div>
                        <div className={styles.card__footer}>
                            <div className={styles.card__value}>
                                {t('library.card.played', {hours: Math.round(game.playtime_forever / 60)})}
                            </div>
                            <div className={styles.card__hint}>
                                {t('library.card.lastPlayed', {date: calculateDate(game.rtime_last_played)})}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {meta && (
                <div className={styles.pagination}>
                    <button onClick={handlerPreviousPage} disabled={currentPage === 0}>
                        {t('library.pagination.prev')}
                    </button>
                    <span>
                        {t('library.pagination.pageInfo', {currentPage: meta.page + 1, totalPages: meta.totalPages})}
                    </span>
                    <button onClick={handleNextPage} disabled={currentPage >= meta.totalPages - 1}>
                        {t('library.pagination.next')}
                    </button>
                </div>
            )}
        </section>
    )
}