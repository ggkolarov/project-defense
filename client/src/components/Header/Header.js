import { useContext } from 'react';
import { ModalShowHideContext } from '../../context/ModalShowHideContext';

import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../images/logo.png';

export const Header = () => {
    const { handleShow } = useContext(ModalShowHideContext);
    
    return (
        <header>
            <div className="module-container">
                <Link to="/"><img className={styles.logo} src={logo} alt="" /></Link>

                <div className={styles.add__hiking}>
                    {/* <button onClick={handleShow}>Добави преход</button> */}
                    <Link to="/create-hike">Добави преход</Link>
                </div>

                <div className={styles.user__controls}>
                    <div className={styles.user__info}>
                        <span className={styles.username}>ggkolarov</span>
                    </div>

                    {/* only for not logged users */}
                    <button onClick={() => handleShow()} className="login">Влез</button>
                    <button className={styles.register}>Регистрирай се</button>

                    {/* only for logged users */}
                    <button className="logout">Излез</button>
                </div>
            </div>
        </header>
    );
};