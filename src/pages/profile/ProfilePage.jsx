import styles from "./ProfilePage.module.css";
import {useTranslation} from "react-i18next";

export default function ProfilePage() {
    const {t} = useTranslation();

    return (
        <section className={styles.profile}>
            <header className={styles.profile__head}>
                <h1>{t('profile.title')}</h1>
                <p className={styles.profile__subtitle}>{t('profile.subtitle')}</p>
            </header>

            <div className={styles.profile__content}>
                <div className={styles.card}>
                    <div className={styles.card__head}>{t('profile.sections.userInfo.title')}</div>
                    <div className={styles.card__body}>
                        <p><strong>{t('profile.sections.userInfo.name')}</strong> John Doe</p>
                        <p><strong>{t('profile.sections.userInfo.email')}</strong> email@gmail.com</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>{t('profile.sections.accountSettings.title')}</div>
                    <div className={styles.card__body}>
                        <p>{t('profile.sections.accountSettings.description')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}