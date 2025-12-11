import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import styles from "./FamilyPage.module.css";
import {useData} from "@/hooks/useData.js";
import {fetchSharedLibrary} from "@/services/steamService.js";
import PlaceholderImage from "@/assets/gemini_question_mark.png";

export default function FamilyPage() {
    const {t} = useTranslation();

    // Używamy hooka useData z nową funkcją fetchującą
    const {data, error, loading} = useData(fetchSharedLibrary);

    // Memoizacja mapy właścicieli dla szybkiego dostępu O(1)
    // Zamienia tablicę graczy na obiekt: { "steamid1": {playerObj}, "steamid2": {playerObj} }
    const ownersMap = useMemo(() => {
        if (!data?.owners) return {};
        return data.owners.reduce((acc, player) => {
            acc[player.steamid] = player;
            return acc;
        }, {});
    }, [data]);

    const handleImageError = (event) => {
        event.target.onerror = null;
        event.target.src = PlaceholderImage;
    };

    // Renderowanie stanów
    if (loading) return <div
        className={styles.loading}>{t('family.loading', 'Ładowanie biblioteki rodzinnej...')}</div>;

    if (error) return (
        <div className={styles.error}>
            {t('family.error', 'Wystąpił błąd:')} {error.message}
            <br/>
            <small>Upewnij się, że skonfigurowano poprawnie ID grupy rodzinnej.</small>
        </div>
    );

    const apps = data?.library?.apps || [];

    if (apps.length === 0) return <div
        className={styles.empty}>{t('family.empty', 'Brak gier w bibliotece rodzinnej.')}</div>;

    return (
        <section className={styles.family}>
            <header className={styles.family__head}>
                <h1>{t('family.title', 'Biblioteka Rodzinna')}</h1>
                <p className={styles.family__subtitle}>
                    {t('family.subtitle', 'Przeglądaj gry udostępniane w Twojej grupie Steam Family')}
                </p>
            </header>

            <div className={styles.family__grid}>
                {apps.map((app) => (
                    <div key={app.appid} className={styles.card}>
                        <div className={styles.card__image}>
                            <img
                                // Używamy capsule_filename z API jeśli jest, lub standardowego URL Steam
                                src={app.capsule_filename
                                    ? `https://cdn.akamai.steamstatic.com/steam/apps/${app.appid}/${app.capsule_filename}`
                                    : `https://cdn.akamai.steamstatic.com/steam/apps/${app.appid}/header.jpg`}
                                alt={app.name}
                                onError={handleImageError}
                                loading="lazy"
                            />
                        </div>

                        <div className={styles.card__content}>
                            <div className={styles.card__title}>{app.name}</div>

                            <div className={styles.card__footer}>
                                <div className={styles.owners}>
                                    <span className={styles.owners__label}>{t('family.owners', 'Właściciele:')}</span>
                                    <div className={styles.owners__list}>
                                        {app.owner_steamids.map((ownerId) => {
                                            const owner = ownersMap[ownerId];
                                            if (!owner) return null;

                                            return (
                                                <img
                                                    key={ownerId}
                                                    src={owner.avatar}
                                                    alt={owner.personaname}
                                                    title={owner.personaname}
                                                    className={styles.ownerAvatar}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}