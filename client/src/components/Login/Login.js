import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { ModalsContext } from '../../contexts/ModalsContext';
import { useForm } from '../../hooks/useForm';

import { Modal, Form, Button, Alert } from 'react-bootstrap';

export const Login = ({
    show,
}) => {
    const { onLoginSubmit } = useContext(AuthContext);
    const { validateAuthForm } = useContext(AuthContext);
    const { authFormErros } = useContext(AuthContext);
    const { closeLoginModal } = useContext(ModalsContext);

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
                            <Form.Control type="text" id="email" name="email" placeholder="example@gmail.com" value={formValues.email || ''} onBlur={validateAuthForm} onChange={onChangeHandler} />
                            {authFormErros.email &&
                                <Alert variant="danger" className='error-alert'>
                                    {authFormErros.email}
                                </Alert>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Парола:</Form.Label>
                            <Form.Control type="password" id="password" name="password" value={formValues.password || ''} onBlur={validateAuthForm} onChange={onChangeHandler} />
                            {authFormErros.password &&
                                <Alert variant="danger" className='error-alert'>
                                    {authFormErros.password}
                                </Alert>
                            }

                            {authFormErros.incorrectLoginCredentials &&
                            <Alert variant="danger" className='error-alert'>
                                {authFormErros.incorrectLoginCredentials}
                            </Alert>
                            }
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