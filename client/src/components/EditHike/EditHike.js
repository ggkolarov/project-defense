import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

//Hook
import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { hikeServiceFactory } from '../../services/hikeService';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './EditHike.module.scss';
import { Form, Button, Alert } from 'react-bootstrap';

export const EditHike = ({
    onSubmitEditHike,
}) => {
    const { validateHikeForm } = useContext(AuthContext);
    const { hikeFormErrors } = useContext(AuthContext);
    const { hikeId } = useParams();
    const hikeService = useService(hikeServiceFactory);
    const {formValues, onChangeHandler, onSubmit, changeValues} = useForm({
        _id: '',
        title: '',
        imageUrl: '',
        season: '',
        latitude: '',
        longitude: '',
        region: '',
        mountain: '',
        startingPoint: '',
        endPoint: '',
        denivelation: '',
        length: '',
        duration: '',
        hikeInfo: '',
    }, onSubmitEditHike);

    useEffect(() => {
        hikeService.getOne(hikeId)
        .then(result => {
            changeValues(result);
        });
    }, [hikeId]);

    return (
        <Form className={styles.create__form} method="POST" onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Заглавие на маршрута</Form.Label>
                <Form.Control type="text" id="title" name="title" placeholder="х.Вирхен - вр. Мусала" value={formValues.title} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.title &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.title}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Снимка</Form.Label>
                <Form.Control type="text" id="imageUrl" name="imageUrl" placeholder="Добави линк към снимката" value={formValues.imageUrl} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.imageUrl &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.imageUrl}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Сезон</Form.Label>
                <Form.Control type="text" id="season" name="season" placeholder="Зима, Лято, Есен, Пролет" value={formValues.season} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Георграфска ширина (Latitude)</Form.Label>
                <Form.Control type="text" id="latitude" name="latitude" placeholder="41.755514" value={formValues.latitude} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.latitude &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.latitude}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Георграфска дължина (Longitude)</Form.Label>
                <Form.Control type="text" id="longitude" name="longitude" placeholder="23.39969" value={formValues.longitude} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.longitude &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.longitude}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Област</Form.Label>
                <Form.Control type="text" id="region" name="region" placeholder="София Град" onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Планина</Form.Label>
                <Form.Control type="text" id="mountain" name="mountain" placeholder="Пирин" value={formValues.mountain} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Начална точка</Form.Label>
                <Form.Control type="text" id="startingPoint" name="startingPoint" placeholder="Начална точка на маршрута" value={formValues.startingPoint} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.startingPoint &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.startingPoint}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Крайна точка</Form.Label>
                <Form.Control type="text" id="endPoint" name="endPoint" placeholder="Крайна точка на маршрута" value={formValues.endPoint} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.endPoint &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.endPoint}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Денивелация</Form.Label>
                <Form.Control type="text" id="denivelation" name="denivelation" placeholder="100м" value={formValues.denivelation} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.denivelation &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.denivelation}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Дължина на маршрута</Form.Label>
                <Form.Control type="text" id="length" name="length" placeholder="4 км" value={formValues.length} onBlur={validateHikeForm} onChange={onChangeHandler} />
                {hikeFormErrors.length &&
                    <Alert variant="danger" className='error-alert'>
                        {hikeFormErrors.length}
                    </Alert>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Времетраене</Form.Label>
                <Form.Control type="text" id="duration" name="duration" placeholder="1.30 часа" value={formValues.duration} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" style={{ height: '100px' }} type="text" id="hikeInfo" name="hikeInfo" placeholder="Информация за маршрута" value={formValues.hikeInfo} onBlur={validateHikeForm} onChange={onChangeHandler} />
            </Form.Group>
            <Button variant="primary" disabled={!formValues.title || !formValues.imageUrl || !formValues.latitude || !formValues.longitude || !formValues.startingPoint || !formValues.endPoint || !formValues.denivelation || !formValues.length } type="submit">
                Редактирай
            </Button>
        </Form>
    );
}