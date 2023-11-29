import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {toastr} from 'react-redux-toastr'
import axios from "axios";
import config from "../../config";


export default function Login() {
    const [data, setData] = useState({
        'email': '',
        'password': ''
    });

    useEffect(() => {
    }, []);

    const login = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(config.backend + '/api/user/generate_token', {
                email: data.email,
                password: data.password
            },{
                headers: { "Content-Type": "multipart/form-data" },
            });

            const {access_token} = response.data;

            Cookies.set('access_token', access_token);

            window.location.href = '/';
        } catch (error) {
            toastr.error('Error authenticating', error.response.data.message);
        }
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <form onSubmit={login}>
                <div className="mb-3">
                    <label htmlFor="user-email" className="form-label">Email</label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} className="form-control" id="user-email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    );
}
