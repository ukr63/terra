import {useEffect} from "react";
import Cookies from 'js-cookie';

export default function Logout()
{
    useEffect(() => {
        Cookies.remove('access_token');
        window.location.href = '/';
    }, []);
}
