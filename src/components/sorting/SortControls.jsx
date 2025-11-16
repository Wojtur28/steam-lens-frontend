import styles from './SortControls.module.css';
import {useTranslation} from "react-i18next";


export default function SortControls({sortConfig, onSort}) {
    const {t} = useTranslation();

    const getSortArrow = (key) => {
        if (sortConfig.key !== key) {
            return '⇅';
        }
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    }

    return (
        <div className={styles.sortControls}>
            <button onClick={() => onSort('name')}>
                {t('library.sort.title')} {getSortArrow('name')}
            </button>
            <button onClick={() => onSort('playtime_forever')}>
                {t('library.sort.playtime')} {getSortArrow('playtime_forever')}
            </button>
            <button onClick={() => onSort('rtime_last_played')}>
                {t('library.sort.lastPlayed')} {getSortArrow('rtime_last_played')}
            </button>
        </div>
    );

}