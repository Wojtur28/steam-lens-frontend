import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
    return (
        <section className={styles.profile}>
            <header className={styles.profile__head}>
                <h1>Profile</h1>
                <p className={styles.profile__subtitle}>Manage your profile settings and preferences</p>
            </header>

            <div className={styles.profile__content}>
                <div className={styles.card}>
                    <div className={styles.card__head}>User Information</div>
                    <div className={styles.card__body}>
                        <p><strong>Name:</strong> John Doe</p>
                        <p><strong>Email:</strong> email@gmail.com</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card__head}>Account Settings</div>
                    <div className={styles.card__body}>
                        <p>Change your password, manage connected accounts, and update preferences.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}