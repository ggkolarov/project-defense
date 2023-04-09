import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { hikeServiceFactory } from '../../services/hikeService';

import styles from './HikeDetails.module.scss';
import { Map } from "../Map/Map";
import { useService } from "../../hooks/useService";
import { AuthContext } from '../../contexts/AuthContext';
import { commentServiceFactory } from "../../services/commentService";

import { Form, Button } from 'react-bootstrap';

export const HikeDetails = ({
    onHikeDeleteClick
}) => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { isAuthenticated, userId } = useContext(AuthContext);
    const { hikeId } = useParams();
    const [hike, setHike] = useState({});
    const hikeService = useService(hikeServiceFactory);
    const commentService = useService(commentServiceFactory)

    useEffect(() => {
        hikeService.getOne(hikeId)
            .then(result => {
                setHike(result);

                return commentService.getAll(hikeId);
            })
            .then(result => {
                setComments(result);
            });
    }, [hikeId]);

    const isOwner = hike._ownerId === userId;

    const onCommentSubmit = async (e, data) => {
        e.preventDefault();

        const newComment = await commentService.create({
            hikeId,
            username,
            comment,
        });

        setComments(state => [...state, newComment]); 

        setUsername('');
        setComment('');
    };

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
                    </ul>
                </div>
                <div className="hike__details--map">
                    <Map hike={hike} />
                </div>
            </div>
            <h2 className={styles.title}>Подробна информация за маршрута</h2>

            <p className="hike__details--content">{hike.hikeInfo}</p>

            <div className={styles.divider}></div>

            <div className="details-comments">
                <h3>Коментари</h3>
                <ul>
                    {comments.map(x => (
                        <li key={x._id} className="comment">
                            <p><span className={styles.userDetails}>{x.username}:</span> {x.comment}</p>
                        </li>
                    ))}
                </ul>

                {comments.length === 0 &&
                    <p className="no-comment">Добавете първия коментар...</p>
                }
            </div>

            <div className={styles.divider}></div>

            {isAuthenticated && (
                <>
                    <h3 className={styles.commentTitle}>Добави коментар</h3>
                    <Form className={styles.create__form} method="POST" onSubmit={onCommentSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Потребителско име или имейл</Form.Label>
                            <Form.Control type="text" id="username" name="username" placeholder="Иван" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Коментар</Form.Label>
                            <Form.Control as="textarea" style={{ height: '100px' }} type="text" id="comment" name="comment" placeholder="Коментар...." value={comment} onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit">Добави коментар</Button>
                    </Form>
                </>
            )}

            {isOwner && (
                <div className={styles.buttons}>
                    <Link to={`/catalog/edit/${hike._id}`} className={styles.hike__button}>Редактирай</Link>
                    <button className={styles.hike__button} onClick={() => { onHikeDeleteClick(hike._id) }}>Изтрий</button>
                </div>
            )}

        </div>
    );
};