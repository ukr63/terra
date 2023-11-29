import React, { Component } from 'react';
import config from "config";
import axios from 'axios';
import Cookies from 'js-cookie';
import {toastr} from 'react-redux-toastr'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        };
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(config.backend + '/api/user/register', {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            },{
                headers: { "Content-Type": "multipart/form-data" },
            });

            const {access_token} = response.data;

            Cookies.set('access_token', access_token);

            window.location.href = '/';
        } catch (error) {
            toastr.error('Error authenticating', error.response.data.message);
        }
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    };

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    };

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user-name" className="form-label">Name</label>
                        <input type="text"
                               className="form-control"
                               id="user-name"
                               value={this.state.name}
                               onChange={this.handleNameChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user-email" className="form-label">Email</label>
                        <input type="email"
                               className="form-control"
                               id="user-email"
                               aria-describedby="emailHelp"
                               value={this.state.email}
                               onChange={this.handleEmailChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                               className="form-control"
                               id="exampleInputPassword1"
                               value={this.state.password}
                               onChange={this.handlePasswordChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Register;
