import styles from "./LibraryPage.module.css";
import {useTranslation} from "react-i18next";
import PlaceholderImage from "@/assets/gemini_question_mark.png";
import {useSteamGames} from "@/hooks/useSteamGames.js";
import Pagination from "@/components/pagination/Pagination.jsx";
import {useMemo, useState} from "react";
import SortControls from "@/components/sorting/SortControls.jsx";


const calculateDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

const LibraryGrid = ({games, t, onImageError}) => (
    <div className={styles.library__grid}>
        {games.map((game) => (
            <div className={styles.card} key={game.appid}>
                <div className={styles.card__image}>
                    <img
                        src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                        alt={game.name}
                        onError={onImageError}
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
);

export default function LibraryPage() {
    const {t} = useTranslation();
    const pageSize = 12;
    const {games, loading, error, meta, currentPage, setCurrentPage} = useSteamGames(pageSize);

    const [sortConfig, setSortConfig] = useState({key: 'name', direction: 'asc'});

    const handleImageError = (event) => {
        event.target.onerror = null;
        event.target.src = PlaceholderImage;
    }

    const handleSort = (key) => {
        setSortConfig(prevConfig => {
            const newDirection = (prevConfig.key === key && prevConfig.direction === 'asc')
                ? 'desc'
                : 'asc';
            return {key, direction: newDirection};
        });
    };

    const sortedGames = useMemo(() => {
        if (games.length === 0) return [];

        const sortableGames = [...games];

        sortableGames.sort((a, b) => {
            let aValue, bValue;

            switch (sortConfig.key) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'playtime_forever':
                    aValue = a.playtime_forever;
                    bValue = b.playtime_forever;
                    break;
                case 'rtime_last_played':
                    aValue = a.rtime_last_played;
                    bValue = b.rtime_last_played;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortableGames;
    }, [games, sortConfig]);

    const renderContent = () => {
        if (loading) {
            return <p>{t('library.loading')}</p>;
        }
        if (error) {
            return <p>{t('library.error')}: {error}</p>;
        }
        if (sortedGames.length === 0) {
            return <p>{t('library.noGames')}</p>;
        }
        return <LibraryGrid games={sortedGames} t={t} onImageError={handleImageError}/>;
    }

    const paginationProps = meta ? {
        currentPage: meta.page,
        totalPages: meta.totalPages,
        onPageChange: setCurrentPage
    } : null;

    return (
        <section className={styles.library}>
            <header className={styles.library__head}>
                <SortControls sortConfig={sortConfig} onSort={handleSort}/>

                {paginationProps && <Pagination {...paginationProps} />}
            </header>

            {renderContent()}

            {paginationProps && <Pagination {...paginationProps} />}
        </section>
    )
}