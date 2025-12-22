import styles from "./DashboardPage.module.css";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useData} from "@/hooks/useData.js";
import {fetchDashboardSummary} from "@/services/steamService.js";
import {useTranslation} from "react-i18next";

const CustomXAxisTick = ({x, y, payload}) => {
    const str = payload.value;
    const words = str.split(' ');
    const mid = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, mid).join(' ');
    const secondLine = words.slice(mid).join(' ');

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={12} dy={12} textAnchor="middle" fill="#a1a7b3" fontSize={11}>
                <tspan x="0" dy="0">{firstLine}</tspan>
                {secondLine && <tspan x="0" dy="16">{secondLine}</tspan>}
            </text>
        </g>
    );
};

export default function DashboardPage() {
    const {t} = useTranslation();

    const {
        data: summary,
        loading
    } = useData(fetchDashboardSummary, []);

    if (loading) return <section className={styles.dashboard}>{t('dashboard.loading')}</section>;
    if (!summary) return null;

    const totalPlaytimeHours = summary?.total_last_2weeks_playtime?.total_last_2weeks_playtime_hours;
    const totalPlaytimeMinutes = summary?.total_last_2weeks_playtime?.total_last_2weeks_playtime_minutes;
    const recentPlayedGamesCount = summary?.number_of_recent_played_games;

    const averageDailyHours = summary
        ? (totalPlaytimeMinutes / 60 / 14).toFixed(1)
        : null;

    const sortedGames = summary?.recent_played_games
        ? [...summary.recent_played_games].sort((a, b) => b.playtime_2weeks_minutes - a.playtime_2weeks_minutes)
        : [];

    const topGame = sortedGames.length > 0 ? sortedGames[0] : null;

    const chartData = sortedGames.slice(0, 7).map(game => ({
        name: game.name.length > 20 ? game.name.substring(0, 20) + '...' : game.name,
        minutes: game.playtime_2weeks_minutes,
        hours: game.playtime_2weeks_hours
    }));

    return (
        <section className={styles.dashboard}>
            <header className={styles.dashboard__head}>
                <h1>{t('dashboard.title')}</h1>
                <p className={styles.dashboard__subtitle}>{t('dashboard.subtitle')}</p>
            </header>

            <div className={styles.dashboard__grid}>
                <div className={styles.card}>
                    <div className={styles.card__head}>{t('dashboard.cards.totalPlaytime.title')}</div>
                    <div className={styles.card__value}>{totalPlaytimeHours}h</div>
                    <div
                        className={styles.card__hint}>{t('dashboard.cards.totalPlaytime.hint', {minutes: totalPlaytimeMinutes})}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>{t('dashboard.cards.topGame.title')}</div>
                    <div className={styles.card__value}>{topGame ? topGame.playtime_2weeks_hours : 0}h</div>
                    <div
                        className={styles.card__hint}>{topGame ? topGame.name : t('dashboard.cards.topGame.noActivity')}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>{t('dashboard.cards.dailyAverage.title')}</div>
                    <div className={styles.card__value}>{averageDailyHours}h</div>
                    <div className={styles.card__hint}>{t('dashboard.cards.dailyAverage.hint')}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>{t('dashboard.cards.gamesCount.title')}</div>
                    <div className={styles.card__value}>{recentPlayedGamesCount}</div>
                    <div className={styles.card__hint}>{t('dashboard.cards.gamesCount.hint')}</div>
                </div>

                <div className={`${styles.card} ${styles.card__medium}`}>
                    <div className={styles.card__head}>{t('dashboard.charts.topGamesMinutes')}</div>

                    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                        <BarChart data={chartData} margin={{top: 5, right: 20, left: 0, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#242836"/>
                            <XAxis
                                dataKey="name"
                                stroke="#a1a7b3"
                                fontSize={12}
                                interval={0}
                                tick={<CustomXAxisTick/>}
                                height={50}
                            />
                            <YAxis stroke="#a1a7b3" fontSize={12}/>
                            <Tooltip
                                cursor={{fill: '#242836', opacity: 0.4}}
                                contentStyle={{backgroundColor: '#1a1e27', border: '1px solid #242836'}}
                            />
                            <Bar dataKey="minutes" fill="#3ea6ff" radius={[4, 4, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={`${styles.card} ${styles.card__medium}`}>
                    <div
                        className={styles.card__head}>{t('dashboard.recentGames.title', {count: sortedGames.length})}</div>
                    <ul className={styles.recentGamesList}>
                        {sortedGames.map(game => (
                            <li key={game.name} className={styles.recentGameItem}>
                                <img src={game.img_icon_url} alt={game.name} className={styles.gameIcon}/>
                                <div>
                                    <strong>{game.name}</strong>
                                    <p className={styles.gamePlaytime}>
                                        {game.playtime_2weeks_hours}h {game.playtime_2weeks_minutes % 60}m {t('dashboard.recentGames.timeframe')}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}