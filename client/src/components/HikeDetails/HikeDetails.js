import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { hikeServiceFactory } from '../../services/hikeService';

import styles from './HikeDetails.module.scss';
import { Map } from "../Map/Map";
import { useService } from "../../hooks/useService";
import { FormsContext } from '../../contexts/FormsContext';

export const HikeDetails = () => {
    const { userId, userEmail, onHikeDeleteClick } = useContext(FormsContext);
    const { hikeId } = useParams();
    const [hike, setHike] = useState({});
    const hikeService = useService(hikeServiceFactory);

    useEffect(() => {
        hikeService.getOne(hikeId)
            .then(result => {
                setHike(result);
            })
    }, [hikeId]);

    const isOwner = hike._ownerId === userId;

    return (
        <div className={styles.hike__details}>
            <h1 className="hike__details--title">{hike.title}</h1>
            <img className="hike__details--image" src={hike.imageUrl} alt={hike.title} />

            <div className="hike__details--wrapper">
                <div className="hike__details--info">
                    <ul>
                        <li><strong>Начална точка:</strong> {hike.startingPoint}</li>
                        <li><strong>Крайна точка:</strong> {hike.endPoint}</li>
                        <li><strong>Планина:</strong> {hike.mountain}</li>
                        <li><strong>Сезон:</strong> {hike.season}</li>
                        <li><strong>Област:</strong> {hike.region}</li>
                        <li><strong>Денивелация:</strong> {hike.denivelation}</li>
                        <li><strong>Дължина на маршрута:</strong> {hike.length}</li>
                        <li><strong>Времетраене:</strong> {hike.duration}</li>
                        <li><strong>Публикувано от:</strong> {userEmail}</li>
                    </ul>
                </div>
                <div className="hike__details--map">
                    <Map hike={hike} />
                </div>
            </div>
            
            <p className="hike__details--content">{hike.hikeInfo}</p>

            {isOwner && (
                <div className={styles.buttons}>
                    <Link to={`/catalog/edit/${hike._id}`} className={styles.hike__button}>Редактирай</Link>
                    <button className={styles.hike__button} onClick={() => {onHikeDeleteClick(hike._id)}}>Изтрий</button>
                </div>
            )}

        </div>
    );
};