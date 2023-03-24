import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";

import { Home } from './pages/Home';
import { AllHikings } from './pages/AllHikings';
import { Login } from './components/Login/Login';
import { CreateHike } from './components/CreateHike/CreateHike';

function App() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="page">
            <Header handleShow={handleShow} handleClose={handleClose} />
            <Navigation />

            <Login show={show} handleShow={handleShow} handleClose={handleClose} />

            <div className="main__content" style={{textAlign: 'center'}}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create-hike' element={<CreateHike />} />
                    <Route path='/all-hikings' element={<AllHikings />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
