import styles from './Hike.module.scss';

export const Hike = ({
    _id,
    title,
    imageUrl,
    season,
}) => {
    return (
        <div className={styles.hike}>
            <div className={styles.hike__image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.hike__content}>
                <h3>{title}</h3>
                <p className={styles.hike__excerpt}>{season}</p>
                <button className={styles.hike__button}>Прочети още</button>
            </div>
        </div>
    );
};