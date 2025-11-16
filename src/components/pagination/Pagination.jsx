import {useTranslation} from "react-i18next";
import styles from "./Pagination.module.css";


export default function Pagination({currentPage, totalPages, onPageChange}) {
    const {t} = useTranslation();

    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevious} disabled={currentPage === 0}>
                {t('library.pagination.prev')}
            </button>
            <span>
                {t('library.pagination.pageInfo', {
                    currentPage: currentPage + 1,
                    totalPages: totalPages
                })}
            </span>
            <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                {t('library.pagination.next')}
            </button>
        </div>
    );
}