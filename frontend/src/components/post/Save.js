import {useEffect, useState} from "react";
import config from "config";
import axios from "axios";
import Cookies from "js-cookie";
import {toastr} from 'react-redux-toastr';
import {Link, useParams} from "react-router-dom";


export default function Save() {
    const {id} = useParams();
    const [data, setData] = useState({
        title: '',
        description: ''
    });

    const init = async () => {
        try {
            if (id) {
                const response = await axios.get(config.backend + '/api/post/detail/' + id, {
                    headers: {"Authorization": "Bearer " + Cookies.get('access_token')},
                });

                setData(response.data.post);
            }
        } catch (error) {
            toastr.error('Error', error.response.data.message);
        }
    };


    useEffect( () => {
        init();

    }, []);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const savePost = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(config.backend + '/api/post/save', data,{
                headers: {"Authorization": "Bearer " + Cookies.get('access_token')},
            });

            toastr.success('Success', response.data.message);
            init();
        } catch (error) {
            toastr.error('Error', error.response.data.message);
        }
    }

    return (
        <>
            <form onSubmit={savePost}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input name="title" value={data.title} onChange={handleChange} type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" value={data.description} onChange={handleChange} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    );
}
