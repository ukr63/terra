import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/user/Register";
import Logout from "./components/user/Logout";
import Login from "./components/user/Login";
import Index from "./components/post/Index";

import Header from "./components/body/Header";

import {Provider}  from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Save from "./components/post/Save";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/post/save/:id?" element={<Save/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
