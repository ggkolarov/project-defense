import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation = () => {
    return (
        <div className={styles.navigation}>
            <nav>
                <Link to="/">Начало</Link>
                <Link to="/hikings">Виж всички преходи</Link>
                <Link to="/winter-hikings">Зимни преходи</Link>
                <Link to="/summer-hikings">Летни преходи</Link>
            </nav>
        </div>
    );

};