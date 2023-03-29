import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as hikeService from './services/hikeService';

//Context
import { ModalShowHideContext } from './context/ModalShowHideContext';
import { HikeItemContext } from './context/HikeItemContext';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss"

// Pages
import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";
import { Footer } from "./components/Footer/Footer";

// Components
import { Home } from './pages/Home';
import { AllHikings } from './pages/AllHikings';
import { Login } from './components/Login/Login';
import { CreateHike } from './components/CreateHike/CreateHike';
import { HikeDetails } from './components/HikeDetails/HikeDetails';

function App() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [hikes, setHikes] = useState([]);

    useEffect(() => {
        hikeService.getAll()
            .then(result => {
                console.log(result);
                setHikes(Object.values(result));
            })
    }, []);

    const onSubmitCreateHike = async (data) => {
        console.log(data);

        const newHike = await hikeService.create(data);

        // TODO: add to state

        setHikes(state => [...state, newHike]); // get all old hikes (...state) and add the new one as well

        navigate('/hikings');
    };

    const onHikeDeleteClick = async (hikeId) => {
        await hikeService.remove(hikeId);

        setHikes(state => state.filter(x => x._id !== hikeId));
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalShowHideContext = {
        handleShow,
        handleClose,
    };

    const hikeItemContext = {
        onHikeDeleteClick,
    };

    return (
        <div className="page">
            <ModalShowHideContext.Provider value={modalShowHideContext}>
                <Header />
                <Navigation />

                <Login show={show} />
            </ModalShowHideContext.Provider>

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
            <Footer />
        </div>
    );
}

export default App;
