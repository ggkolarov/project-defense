import styles from './CreateHike.module.scss';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Hook
import { useForm } from '../../hooks/useForm';

export const CreateHike = ({
    onSubmitCreateHike,
}) => {
    const {formValues, onChangeHandler, onSubmit} = useForm({ text: '' }, onSubmitCreateHike);

    return (
        <Form className={styles.create__form} onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Заглавие на маршрута</Form.Label>
                <Form.Control type="text" id="title" name="title" placeholder="х.Вирхен - вр. Мусала" value={formValues.title || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Снимка</Form.Label>
                <Form.Control type="text" id="imageUrl" name="imageUrl" placeholder="Добави линк към снимката" value={formValues.imageUrl || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Сезон</Form.Label>
                <Form.Control type="text" id="season" name="season" placeholder="Зима, Лято, Есен, Пролет" value={formValues.season || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Област</Form.Label>
                <Form.Control type="text" id="region" name="region" placeholder="София Град" value={formValues.region || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Планина</Form.Label>
                <Form.Control type="text" id="mountain" name="mountain" placeholder="Пирин" value={formValues.mountain || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Начална точка</Form.Label>
                <Form.Control type="text" id="startingPoint" name="startingPoint" placeholder="Начална точка на маршрута" value={formValues.startingPoint || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Крайна точка</Form.Label>
                <Form.Control type="text" id="endPoint" name="endPoint" placeholder="Крайна точка на маршрута" value={formValues.endPoint || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Денивелация</Form.Label>
                <Form.Control type="text" id="denivelation" name="denivelation" placeholder="100м" value={formValues.denivelation || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Дължина на маршрута</Form.Label>
                <Form.Control type="text" id="length" name="length" placeholder="4 км" value={formValues.length || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Времетраене</Form.Label>
                <Form.Control type="text" id="duration" name="duration" placeholder="1.30 часа" value={formValues.duration || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" style={{ height: '100px' }} type="text" id="hikeInfo" name="hikeInfo" placeholder="Информация за маршрута" value={formValues.hikeInfo || ''} onChange={onChangeHandler} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Добави
            </Button>
        </Form>
    );
}