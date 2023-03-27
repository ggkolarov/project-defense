import { useContext } from 'react';
import { ModalShowHideContext } from '../../context/ModalShowHideContext';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import styles from './Login.module.scss';

export const Login = ({
    show,
}) => {
    const { handleClose } = useContext(ModalShowHideContext);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};