import {Link} from 'react-router-dom';
import axios from "axios";
import config from "config";
import Cookies from 'js-cookie';

export default function Header() {

    return (
        <div className="header bg-light">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">Terra</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                {
                                    !Cookies.get('access_token') ? (
                                        <>
                                            <li className="nav-item">
                                                <Link to="/register" className="nav-link">Register</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/login" className="nav-link">Login</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link to="/post/save" className="nav-link">Add Post</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/logout" className="nav-link">Logout</Link>
                                            </li>
                                        </>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
