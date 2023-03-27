import { useState, useEffect } from 'react';
import { Routes, Route , useNavigate} from 'react-router-dom';

import * as hikeService from './services/hikeService'; 

//Context
import { ModalShowHideContext } from './context/ModalShowHideContext';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss"

// Pages
import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";

// Components
import { Home } from './pages/Home';
import { AllHikings } from './pages/AllHikings';
import { Login } from './components/Login/Login';
import { CreateHike } from './components/CreateHike/CreateHike';

function App() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [hikes, setHikes] = useState([]);

    useEffect(() => {
        hikeService.getAll()
        .then(result => {
            console.log(result);
            setHikes(Object.values(result)); // resultata se setva chrez setHikes v state-a
        })
    }, []);

    const onSubmitCreateHike = async (data) => {
        console.log(data);

        const newHike = await hikeService.create(data);

        // TODO: add to state

        setHikes(state => [...state, newHike]); // get all old hikes (...state) and add the new one as well

        navigate('/all-hikings');
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalShowHideContext = {
        handleShow,
        handleClose,
    };

    return (
        <div className="page">
            <ModalShowHideContext.Provider value={modalShowHideContext}>
                <Header />
                <Navigation />

                <Login show={show} />
            </ModalShowHideContext.Provider>

            <div className="main__content" style={{ textAlign: 'center' }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create-hike' element={<CreateHike onSubmitCreateHike={onSubmitCreateHike} />} />
                    <Route path='/all-hikings' element={<AllHikings hikes={hikes} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
