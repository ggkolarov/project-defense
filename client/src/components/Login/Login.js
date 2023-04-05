import React from 'react';
import { useContext } from 'react';

import { FormsContext } from '../../contexts/FormsContext';
import { useForm } from '../../hooks/useForm';

import { Modal, Form, Button } from 'react-bootstrap';

export const Login = ({
    show,
}) => {
    const { onLoginSubmit } = useContext(FormsContext);
    const { closeLoginModal } = useContext(FormsContext);

    const { formValues, onChangeHandler, onSubmit } = useForm({
        email: '',
        password: ''
    }, onLoginSubmit);

    return (
        <>
            <Modal
                show={show}
                onHide={closeLoginModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Вход</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST" onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Имейл адрес:</Form.Label>
                            <Form.Control type="text" id="email" name="email" placeholder="example@gmail.com" value={formValues.email || ''} onChange={onChangeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Парола:</Form.Label>
                            <Form.Control type="password" id="password" name="password" value={formValues.password || ''} onChange={onChangeHandler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Влез</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeLoginModal()}>Затвори</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};