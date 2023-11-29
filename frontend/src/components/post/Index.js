import {useEffect, useState} from "react";
import config from "config";
import axios from "axios";
import Cookies from "js-cookie";
import {toastr} from 'react-redux-toastr';
import {Link} from "react-router-dom";


export default function Index()
{
    const [items, setItems] = useState([])
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        axios.get(config.backend + '/api/post/list', {
            headers: { "Authorization": "Bearer " + Cookies.get('access_token') },
        }).then(response => {
            setItems(response.data.items)
        })
    }

    const deletePost = async (id) => {
        try {

            const response = await axios.delete(config.backend + '/api/post/delete/' + id, {
                headers: {"Authorization": "Bearer " + Cookies.get('access_token')},
            });

            toastr.success('Success', response.data.message);

            init();
        } catch (error) {
            console.log(error);
            toastr.error('Error', error.response.data.message);
        }
    }

    return (
        <>
            {items.map((item, index) => (
                <div className="card m-1">
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <div >
                            <Link to={'/post/save/' + item.id} className="btn btn-primary">Edit</Link>
                            <a className="btn btn-danger delete-post m-1" data-id={item.id} onClick={() => deletePost(item.id)}>Delete</a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
