import {useTranslation} from "react-i18next";
import styles from "./ErrorModal.module.css";

export default function ErrorModal({error, onClose}) {
    const {t} = useTranslation();

    if (!error) return null;

    return (
        <div className={styles.errorModal}>
            <div className={styles.errorModal__content}>
                <div className={styles.errorModal__header}>
                    <div className={styles.errorModal__icon}>⚠️</div>
                    <h2>{t('errors.title', 'Error')}</h2>
                    <button className={styles.errorModal__close} onClick={onClose}>×</button>
                </div>

                <div className={styles.errorModal__body}>
                    <p className={styles.errorModal__message}>{error}</p>
                </div>

                <div className={styles.errorModal__footer}>
                    <button className={styles.errorModal__button} onClick={onClose}>
                        {t('errors.close', 'Close')}
                    </button>
                </div>
            </div>
        </div>
    );
}
