import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import { Modal, Form, Button } from 'react-bootstrap';

export const Register = ({
    show,
}) => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { closeRegisterModal } = useContext(AuthContext);

    const {formValues, onChangeHandler, onSubmit} = useForm({
        email: '',
        password: '',
        repeatPassword: '',
    }, onRegisterSubmit);

    return (
        <>
            <Modal
                show={show}
                onHide={closeRegisterModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Регистрация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST" onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Имейл адрес:</Form.Label>
                            <Form.Control type="text" id="email" name="email" placeholder="example@gmail.com" value={formValues.email} onChange={onChangeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Парола:</Form.Label>
                            <Form.Control type="password" id="password" name="password" value={formValues.password} onChange={onChangeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Потвърджаване на паролата:</Form.Label>
                            <Form.Control type="password" id="repeatPassword" name="repeatPassword" value={formValues.repeatPassword} onChange={onChangeHandler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Регистрирай се</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeRegisterModal()}>Затвори</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};