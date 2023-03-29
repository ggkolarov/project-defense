import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as hikeService from '../../services/hikeService';

import styles from './HikeDetails.module.scss';
import { Map } from "../Map/Map";

export const HikeDetails = () => {
    const { hikeId } = useParams();
    const [hike, setHike] = useState({});

    useEffect(() => {
        hikeService.getOne(hikeId)
            .then(result => {
                setHike(result);
            })
    }, [hikeId]);

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
                        <li><strong>Публикувано от:</strong> Username</li>
                    </ul>
                </div>
                <div className="hike__details--map">
                    <Map />
                </div>
            </div>
            
            <p className="hike__details--content">{hike.hikeInfo}</p>
        </div>
    );
};