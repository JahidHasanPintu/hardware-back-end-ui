import { useEffect, useState } from 'react';
import getBaseUrl from '../Components/BaseURL/getBaseUrl';

const useRoles = () => {
    const [roles,setRoles] = useState([]);
    // const url = `process.env.BASE_URL/products`;
    const baseUrl = getBaseUrl();
    useEffect(()=>{
        fetch(`${baseUrl}/roles`)
        .then(res=>res.json())
        .then(data => setRoles(data.data));
    },[])

    return [roles,setRoles];
};

export default useRoles;