import { useContext } from 'react';
import { FormsContext } from '../../contexts/FormsContext';

import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../images/logo.png';

export const Header = ({
    mobileMenuClick,
}) => {
    const { isAuthenticated, userEmail } = useContext(FormsContext);
    const { onLogout } = useContext(FormsContext);
    const { showLoginModal } = useContext(FormsContext);
    const { showRegisterModal } = useContext(FormsContext);
    
    return (
        <header>
            <div className="module-container">
                <Link to="/"><img className={styles.logo} src={logo} alt="" /></Link>

                <div className="burgerMenu" id="burgerMenu" onClick={mobileMenuClick}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                {isAuthenticated && (
                    <>
                        <div className={styles.add__hiking}>
                            <Link to="/create-hike">Добави преход</Link>
                        </div>

                        <div className={styles.user__info}>
                            <span>{userEmail}</span>
                        </div>
                    </>
                )}

                <div className={styles.user__controls}>
                    {!isAuthenticated && (
                        <>
                            <button onClick={() => showLoginModal()} className="login">Влез</button>
                            <button onClick={() => showRegisterModal()} className={styles.register}>Регистрирай се</button>
                        </>
                    )}

                    {isAuthenticated && (
                        <button className="logout" onClick={() => onLogout()}>Излез</button>
                    )}
                </div>
            </div>
        </header>
    );
};