import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { ModalsContext } from '../../contexts/ModalsContext';
import { useForm } from '../../hooks/useForm';

import { Modal, Form, Button, Alert } from 'react-bootstrap';

export const Register = ({
    show,
}) => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { validateAuthForm } = useContext(AuthContext);
    const { authFormErros } = useContext(AuthContext);
    const { closeRegisterModal } = useContext(ModalsContext);

    const { formValues, onChangeHandler, onSubmit } = useForm({
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
                            <Form.Control type="text" id="email" name="email" placeholder="example@gmail.com" value={formValues.email} onBlur={validateAuthForm} onChange={onChangeHandler} />

                            {authFormErros.email &&
                                <Alert variant="danger" className='error-alert'>
                                    {authFormErros.email}
                                </Alert>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Парола:</Form.Label>
                            <Form.Control type="password" id="password" name="password" value={formValues.password} onBlur={validateAuthForm} onChange={onChangeHandler} />

                            {authFormErros.password &&
                                <Alert variant="danger" className='error-alert'>
                                    {authFormErros.password}
                                </Alert>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Потвърджаване на паролата:</Form.Label>
                            <Form.Control type="password" id="repeatPassword" name="repeatPassword" value={formValues.repeatPassword} onBlur={validateAuthForm} onChange={onChangeHandler} />

                            {authFormErros.repeatPassword &&
                                <Alert variant="danger" className='error-alert'>
                                    {authFormErros.repeatPassword}
                                </Alert>
                            }
                        </Form.Group>

                        {authFormErros.passwordMatch &&
                            <Alert variant="danger" className='error-alert'>
                                {authFormErros.passwordMatch}
                            </Alert>
                        }
                        
                        {authFormErros.userAlreadyExists &&
                            <Alert variant="danger" className='error-alert'>
                                {authFormErros.userAlreadyExists}
                            </Alert>
                        }
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