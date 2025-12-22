import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "./FamilyPage.module.css";
import {fetchSharedLibrary} from "@/services/steamService.js";
import PlaceholderImage from "@/assets/gemini_question_mark.png";
import Pagination from "@/components/pagination/Pagination.jsx";
import {formatPrice} from "@/utility/formatPrice.js";
import {useError} from "@/contexts/ErrorContext.jsx";

export default function FamilyPage() {
    const {t} = useTranslation();
    const {showError} = useError();

    const [page, setPage] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const result = await fetchSharedLibrary(page, 24);
                setData(result);
                setError(null);
            } catch (err) {
                setError(err);

                // Handle i18n error objects
                let errorMessage;
                if (typeof err === 'object' && err.key) {
                    errorMessage = t(err.key, err.params || {});
                } else if (typeof err === 'string') {
                    errorMessage = err;
                } else if (err.message) {
                    errorMessage = err.message;
                } else {
                    errorMessage = t('errors.api.unknownError');
                }

                showError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [page, showError, t]);

    const ownersMap = useMemo(() => {
        if (!data?.owners) return {};
        return data.owners.reduce((acc, owner) => {
            acc[owner.steamId] = owner;
            return acc;
        }, {});
    }, [data]);

    const handleImageError = (event) => {
        event.target.onerror = null;
        event.target.src = PlaceholderImage;
    };

    if (loading && !data) return <div className={styles.loading}>{t('family.loading', 'Ładowanie...')}</div>;
    if (error || !data) return null;

    const {games, totalValue, totalGames, owners} = data || {};
    const apps = games?.data || [];
    const meta = games?.meta;

    return (
        <section className={styles.family}>
            <header className={styles.family__head}>
                <h1>{t('family.title', 'Biblioteka Rodzinna')}</h1>
                <p className={styles.family__subtitle}>
                    {t('family.subtitle', 'Współdzielona kolekcja gier')}
                </p>
            </header>

            <div className={styles.summary}>
                <div className={styles.summaryCard}>
                    <h3>{t('family.totalValue', 'Wartość Biblioteki')}</h3>
                    <div className={styles.summaryValue}>{formatPrice(totalValue)}</div>
                </div>
                <div className={styles.summaryCard}>
                    <h3>{t('family.totalGames', 'Liczba Gier')}</h3>
                    <div className={styles.summaryValue}>{totalGames}</div>
                </div>
            </div>

            <div className={styles.ownersLegend}>
                {owners?.map(owner => (
                    <div key={owner.steamId} className={styles.ownerChip}>
                        <img src={owner.avatarUrl} alt={owner.name}/>
                        <div className={styles.ownerInfo}>
                            <span className={styles.ownerName}>{owner.name}</span>
                            <span className={styles.ownerValue}>{formatPrice(owner.totalValue)}</span>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={meta?.totalPages || 0}
                onPageChange={setPage}
            />

            <div className={styles.family__grid}>
                {apps.map((app) => (
                    <a
                        key={app.appId}
                        href={`https://store.steampowered.com/app/${app.appId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardLink}
                    >
                        <div className={styles.card}>
                            <div className={styles.card__image}>
                                <img
                                    src={app.headerImage || `https://cdn.akamai.steamstatic.com/steam/apps/${app.appId}/header.jpg`}
                                    alt={app.name}
                                    onError={handleImageError}
                                    loading="lazy"
                                />
                                <div className={styles.priceTag}>
                                    {formatPrice(app.price)}
                                </div>
                            </div>

                            <div className={styles.card__content}>
                                <div className={styles.card__title}>{app.name}</div>

                                <div className={styles.card__footer}>
                                    <div className={styles.owners}>
                                        <div className={styles.owners__list}>
                                            {app.ownerSteamIds.map((ownerId) => {
                                                const owner = ownersMap[ownerId];
                                                if (!owner) return null;
                                                return (
                                                    <img
                                                        key={ownerId}
                                                        src={owner.avatarUrl}
                                                        alt={owner.name}
                                                        title={owner.name}
                                                        className={styles.ownerAvatar}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={meta?.totalPages || 0}
                onPageChange={setPage}
            />
        </section>
    );
}