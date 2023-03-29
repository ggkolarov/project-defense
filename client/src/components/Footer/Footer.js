import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; Copyright HikeJournal trips advisor 2023. <br /> Всички права запазени! Разработен от Георги Коларов</p>
        </footer>
    );
}