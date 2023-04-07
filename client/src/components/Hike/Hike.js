import { Link } from 'react-router-dom';
import styles from './Hike.module.scss';

export const Hike = ({
    _id,
    title,
    hikeInfo,
    imageUrl,
}) => {
    return (
        <div className={styles.hike} data-aos="fade-up">
            <div className={styles.hike__image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.hike__content}>
                <h3>{title}</h3>
                <p className={styles.hike__excerpt}>{hikeInfo}</p>

                <div className={styles.buttons}>
                    <Link className={styles.hike__button} to={`/catalog/${_id}`}>Прочети още</Link>
                </div>
            </div>
        </div>
    );
};