import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hike.module.scss';

import { HikeItemContext } from '../../context/HikeItemContext';

export const Hike = ({
    _id,
    title,
    hikeInfo,
    imageUrl,
}) => {
    const { onHikeDeleteClick } = useContext(HikeItemContext);

    return (
        <div className={styles.hike}>
            <div className={styles.hike__image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.hike__content}>
                <h3>{title}</h3>
                <p className={styles.hike__excerpt}>{hikeInfo}</p>

                <div className={styles.buttons}>
                    <Link className={styles.hike__button} to={`/hikings/${_id}`}>Прочети още</Link>
                    <button className={styles.hike__button} onClick={() => onHikeDeleteClick(_id)}>Изтрий</button>
                </div>
            </div>
        </div>
    );
};