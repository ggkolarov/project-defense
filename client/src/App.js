import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import $ from 'jquery';

//Services
import { hikeServiceFactory } from './services/hikeService';
import { authServiceFactory } from './services/authService';

//Contexts
import { AuthContext } from './contexts/AuthContext';
import { ModalsContext } from './contexts/ModalsContext';

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
import { EditHike } from './components/EditHike/EditHike';

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [hikes, setHikes] = useState([]);
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const hikeService = hikeServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken);

    const [authFormErros, setAuthFormErros] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [hikeFormErrors, setHikeFormErrors] = useState({
        title: '',
        imageUrl: '',
        season: '',
        latitude: '',
        longitude: '',
        region: '',
        mountain: '',
        startingPoint: '',
        endPoint: '',
        denivelation: '',
        length: '',
        duration: '',
        hikeInfo: '',
    });

    useEffect(() => {
        hikeService.getAll()
            .then(result => {
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
    
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidUrl = (url) => {
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
    };

    const onRegisterSubmit = async (values) => {
        const {repeatPassword, ...registerData} = values;
        const { email } = values;
        const errors = {};

        if (repeatPassword !== registerData.password) {
            errors.passwordMatch = 'Паролите не съвпадат!';
            setAuthFormErros(errors);
            return;
        }

        if (!isValidEmail(email)) {
            errors.email = 'Невалиден имейл!'
            setAuthFormErros(errors);
            return;
        }

        try {
            const result = await authService.register(registerData);
            setAuth(result);
            navigate('/catalog');
            closeRegisterModal();
        } catch (error) {
            errors.userAlreadyExists = 'Вече има съществуващ потребител с този имейл!';
        }

        setAuthFormErros(errors);
    };

    const onLoginSubmit = async (loginData) => {
        const errors = {};

        try {
            const result = await authService.login(loginData);
            
            setAuth(result);
            navigate('/catalog');
            closeLoginModal();
        } catch (error) {
            errors.incorrectLoginCredentials = 'Невалидни данни! Моля проверете вашият имейл или парола!';
        }

        setAuthFormErros(errors);
    };

    const onLogout = async () => {
        await authService.logout();
        
        setAuth({}); 
    };

    const validateAuthForm = (e) => {
        const value = e.target.value;
        const errors = {};

        if(e.target.name === 'username' && (value.length <= 0 )) {
            errors.username = 'Моля въведете Потребителско име!';
        }

        if(e.target.name === 'comment' && (value.length <= 0 )) {
            errors.comment = 'Моля въведете коментар!';
        }

        if(e.target.name === 'email' && !isValidEmail(e.target.value)) {
            errors.email = 'Невалиден имейл!';
        }

        if(e.target.name === 'password' && (value.length < 5 )) {
            errors.password = 'Паролата трябва да бъде дълга поне 5 символа!';
        }

        if(e.target.name === 'repeatPassword' && (value.length < 5 )) {
            errors.repeatPassword = 'Паролата трябва да бъде дълга поне 5 символа!';
        }

        setAuthFormErros(errors);
    };

    const validateHikeForm = (e) => {
        const value = e.target.value;
        const hikeErros = {};

        if(e.target.name === 'title' && (value.length <= 0 )) {
            hikeErros.title = 'Заглавието е задължително!';
        }

        if(e.target.name === 'imageUrl' && !isValidUrl(e.target.value)) {
            hikeErros.imageUrl = 'Моля въведете валиден линк за снимката!';
        }

        if(e.target.name === 'season' && (value.length <= 0 )) {
            hikeErros.season = 'Моля въведете сезон, в който е правен прехода!';
        }

        if(e.target.name === 'latitude' && (value.length <= 0 )) {
            hikeErros.latitude = 'Моля въведете географска ширина на крайната точка!';
        }

        if(e.target.name === 'longitude' && (value.length <= 0 )) {
            hikeErros.longitude = 'Моля въведете географска дължина на крайната точка!';
        }

        if(e.target.name === 'region' && (value.length <= 0 )) {
            hikeErros.region = 'Моля въведете регион, в който е местонахождението на прехода!';
        }

        if(e.target.name === 'mountain' && (value.length <= 0 )) {
            hikeErros.mountain = 'Моля въведете името на планината, в която е маршрутът!';
        }

        if(e.target.name === 'startingPoint' && (value.length <= 0 )) {
            hikeErros.startingPoint = 'Моля въведете начална точка!';
        }

        if(e.target.name === 'endPoint' && (value.length <= 0 )) {
            hikeErros.endPoint = 'Моля въведете крайна точка!';
        }

        if(e.target.name === 'denivelation' && (value.length <= 0 )) {
            hikeErros.denivelation = 'Моля въведете денивелацията на маршрута!';
        }

        if(e.target.name === 'length' && (value.length <= 0 )) {
            hikeErros.length = 'Моля въведете дължина на маршрута!';
        }
        
        if(e.target.name === 'duration' && (value.length <= 0 )) {
            hikeErros.duration = 'Моля въведете времетраене на маршрута!';
        }

        setHikeFormErrors(hikeErros);
    };

    const onSubmitCreateHike = async (data) => {
        const { imageUrl } = data;
        const hikeErros = {};

        if (!isValidUrl(imageUrl)) {
            hikeErros.imageUrl = 'Моля въведете валиден линк за снимката!';

            setHikeFormErrors(hikeErros);
            return;
        }

        const newHike = await hikeService.create(data);

        setHikes(state => [...state, newHike]); 
        navigate('/catalog');
    };

    const onHikeDeleteClick = async (hikeId) => {
        await hikeService.remove(hikeId);

        setHikes(state => state.filter(x => x._id !== hikeId));
        navigate('/catalog');
    };

    const onSubmitEditHike = async (values) => {
        const { imageUrl } = values;
        const hikeErros = {};

        if (!isValidUrl(imageUrl)) {
            hikeErros.imageUrl = 'Моля въведете валиден линк за снимката!';
            
            setHikeFormErrors(hikeErros);
            return;
        }

        const result = await hikeService.edit(values._id, values);

        setHikes(state => state.map(editedHike => editedHike._id === values._id ? result : editedHike));

        navigate(`/catalog/${values._id}`);
    };

    const modalsContextValues = {      
        showRegisterModal,
        showLoginModal,
        closeLoginModal,
        closeRegisterModal,
    }

    const authContextValues = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        validateAuthForm,
        validateHikeForm,
        authFormErros,
        hikeFormErrors,
        userId: auth._id,
        userEmail: auth.email,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <div className="page">
            <AuthContext.Provider value={authContextValues}>
                <ModalsContext.Provider value={modalsContextValues}>
                    <Header  mobileMenuClick={mobileMenuClick}/>
                <Navigation />
                <Login show={loginModal} />
                <Register show={registerModal} />
                </ModalsContext.Provider>

                <div className="main__content" style={{ textAlign: 'center' }}>
                    <div className="module-container">
                        <Routes>
                            <Route path='/' element={<Home hikes={hikes} />} />
                            <Route path='/create-hike' element={<CreateHike onSubmitCreateHike={onSubmitCreateHike} />} />
                            <Route path='/catalog' element={<AllHikings hikes={hikes} />} />
                            <Route path='/catalog/:hikeId' element={<HikeDetails onHikeDeleteClick={onHikeDeleteClick}/>} />
                            <Route path='/catalog/edit/:hikeId' element={<EditHike onSubmitEditHike={onSubmitEditHike} />} />
                            <Route path='/mountains/pirin' element={<PirinMountains hikes={hikes} />} />
                            <Route path='/mountains/rila' element={<RilaMountains hikes={hikes} />} />
                            <Route path='/mountains/rodopi' element={<RodopiMountains hikes={hikes} />} />
                            <Route path='/mountains/stara-planina' element={<StaraPlaninaMountains hikes={hikes} />} />
                        </Routes>
                    </div>
                </div>
            </AuthContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
