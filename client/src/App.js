import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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

    const onSubmitCreateHike = async (data) => {
        console.log(data);

        const newHike = await hikeService.create(data);

        setHikes(state => [...state, newHike]); // get all old hikes (...state) and add the new one as well

        navigate('/hikings');
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
            navigate('/hikings');
            closeRegisterModal();
        } catch (error) {
            console.log('There is a problem with the registration');
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);
            
            setAuth(result);
            navigate('/hikings');
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
                <Header />
                <Navigation />
                <Login show={loginModal} />
                <Register show={registerModal} />

                <div className="main__content" style={{ textAlign: 'center' }}>
                    <div className="module-container">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/create-hike' element={<CreateHike onSubmitCreateHike={onSubmitCreateHike} />} />
                            <Route path='/hikings' element={
                                <HikeItemContext.Provider value={hikeItemContext}>
                                    <AllHikings hikes={hikes} />
                                </HikeItemContext.Provider>
                            }
                            />
                            <Route path='/hikings/:hikeId' element={<HikeDetails />} />
                        </Routes>
                    </div>
                </div>
            </FormsContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
