import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import $ from 'jquery';

//Services
import * as authService from './services/authService';
import * as hikeService from './services/hikeService';

//Contexts
import { FormsContext } from './contexts/FormsContext';
import { HikeItemContext } from './contexts/HikeItemContext';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss"

// Pages
import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";
import { Footer } from "./components/Footer/Footer";

// Components
import { Home } from './pages/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { CreateHike } from './components/CreateHike/CreateHike';
import { AllHikings } from './pages/AllHikings';
import { HikeDetails } from './components/HikeDetails/HikeDetails';
import { PirinMountains } from './pages/PirinMountains';
import { RilaMountains } from './pages/RilaMountains';
import { RodopiMountains } from './pages/RodopiMountains';
import { StaraPlaninaMountains } from './pages/StaraPlaninaMountains';

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [hikes, setHikes] = useState([]);
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    useEffect(() => {
        hikeService.getAll()
            .then(result => {
                console.log(result);
                setHikes(Object.values(result));
            })
    }, []);

    //Modals
    const showLoginModal = () => setLoginModal(true);
    const closeLoginModal = () => setLoginModal(false);
    const showRegisterModal = () => setRegisterModal(true);
    const closeRegisterModal = () => setRegisterModal(false);

    const mobileMenuClick = () => {
        $(".burgerMenu").on('click', function() {
            $(this).addClass('is-active');
            $(".Header_user__controls__wB6ey").show();
            $(".Navigation_navigation__Q6rV5").show();
            $(".Header_add__hiking__AdgHw").show();
        });

        $(".burgerMenu.is-active").on('click', function() {
            $(this).removeClass('is-active');
            $(".Header_user__controls__wB6ey").hide();
            $(".Navigation_navigation__Q6rV5").hide();
            $(".Header_add__hiking__AdgHw").hide();
        });
    };

    const onSubmitCreateHike = async (data) => {
        console.log(data);

        const newHike = await hikeService.create(data);

        setHikes(state => [...state, newHike]); // get all old hikes (...state) and add the new one as well

        navigate('/catalog');
    };

    const onHikeDeleteClick = async (hikeId) => {
        await hikeService.remove(hikeId);

        setHikes(state => state.filter(x => x._id !== hikeId));
    };

    const onRegisterSubmit = async (values) => {
        const {repeatPassword, ...registerData} = values;

        if (repeatPassword !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate('/catalog');
            closeRegisterModal();
        } catch (error) {
            console.log('There is a problem with the registration');
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            
            setAuth(result);
            navigate('/');
            closeLoginModal();
        } catch (error) {
            console.log('There is a problem with the login');
        }
    };

    const onLogout = async () => {
        setAuth({}); // client logout
    };

    const formsContextValues = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        showRegisterModal,
        showLoginModal,
        closeLoginModal,
        closeRegisterModal,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    const hikeItemContext = {
        onHikeDeleteClick,
    };

    return (
        <div className="page">
            <FormsContext.Provider value={formsContextValues}>
                <Header mobileMenuClick={mobileMenuClick} />
                <Navigation />
                <Login show={loginModal} />
                <Register show={registerModal} />

                <div className="main__content" style={{ textAlign: 'center' }}>
                    <div className="module-container">
                        <Routes>
                            <Route path='/' element={<Home hikes={hikes} />} />
                            <Route path='/create-hike' element={<CreateHike onSubmitCreateHike={onSubmitCreateHike} />} />
                            <Route path='/catalog' element={
                                <HikeItemContext.Provider value={hikeItemContext}>
                                    <AllHikings hikes={hikes} />
                                </HikeItemContext.Provider>
                            }
                            />
                            <Route path='/catalog/:hikeId' element={<HikeDetails />} />
                            <Route path='/mountains/pirin' element={<PirinMountains hikes={hikes} />} />
                            <Route path='/mountains/rila' element={<RilaMountains hikes={hikes} />} />
                            <Route path='/mountains/rodopi' element={<RodopiMountains hikes={hikes} />} />
                            <Route path='/mountains/stara-planina' element={<StaraPlaninaMountains hikes={hikes} />} />
                        </Routes>
                    </div>
                </div>
            </FormsContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
