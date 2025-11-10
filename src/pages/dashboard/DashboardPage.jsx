import styles from "./DashboardPage.module.css";

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 400,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 300,
        pv: 4567,
        amt: 2400,
    },
    {
        name: 'Page C',
        uv: 320,
        pv: 1398,
        amt: 2400,
    },
    {
        name: 'Page D',
        uv: 200,
        pv: 9800,
        amt: 2400,
    },
    {
        name: 'Page E',
        uv: 278,
        pv: 3908,
        amt: 2400,
    },
    {
        name: 'Page F',
        uv: 189,
        pv: 4800,
        amt: 2400,
    },
];

export default function DashboardPage() {

    return (
        <section className={styles.dashboard}>
            <header className={styles.dashboard__head}>
                <h1>Dashboard</h1>
                <p className={styles.dashboard__subtitle}>Podgląd aktywności z ostatnich 14 dni</p>
            </header>

            <div className={styles.dashboard__grid}>
                <div className={styles.card}>
                    <div className={styles.card__head}>Total playtime</div>
                    <div className={styles.card__value}>43h</div>
                    <div className={styles.card__hint}>2571 minut łącznie</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Sessions</div>
                    <div className={styles.card__value}>28</div>
                    <div className={styles.card__hint}>Wszystkie sesje</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Średnio dziennie</div>
                    <div className={styles.card__value}>3h</div>
                    <div className={styles.card__hint}>Ileś tam per day</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Zagranych gier</div>
                    <div className={styles.card__value}>5</div>
                    <div className={styles.card__hint}>Róznych gier</div>
                </div>

                <div className={`${styles.card} ${styles.card__medium}`}>
                    <div className={styles.card__head}>Trend tygodniowy</div>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{top: 5, right: 20, left: -20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#242836"/>
                            <XAxis dataKey="name" stroke="#a1a7b3" fontSize={12}/>
                            <YAxis stroke="#a1a7b3" fontSize={12}/>
                            <Tooltip
                                contentStyle={{backgroundColor: '#1a1e27', border: '1px solid #242836'}}
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="#3ea6ff"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={`${styles.card} ${styles.card__medium}`}>
                    <div className={styles.card__head}>Trend miesięczny</div>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{top: 5, right: 20, left: -20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#242836"/>
                            <XAxis dataKey="name" stroke="#a1a7b3" fontSize={12}/>
                            <YAxis stroke="#a1a7b3" fontSize={12}/>
                            <Tooltip
                                contentStyle={{backgroundColor: '#1a1e27', border: '1px solid #242836'}}
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="#3ea6ff"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </section>
    );
}