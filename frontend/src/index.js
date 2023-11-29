import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { BrowserRouter } from "react-router-dom";

import {Provider}  from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <div>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    position="top-right"
                    getState={(state) => state.toastr} // This is the default
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick/>
            </div>
            <BrowserRouter>
                <App />
            </BrowserRouter>,
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
