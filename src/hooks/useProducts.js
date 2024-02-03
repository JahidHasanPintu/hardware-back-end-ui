import { useEffect, useState } from 'react';
import getBaseUrl from '../Components/BaseURL/getBaseUrl';

const useProducts = () => {
    const [products,setProducts] = useState([]);
    const url = `process.env.BASE_URL/products`;
    const baseUrl = getBaseUrl();
    useEffect(()=>{
        fetch(`${baseUrl}/products`)
        .then(res=>res.json())
        .then(data => setProducts(data.data));
    },[])

    return [products,setProducts];
};

export default useProducts;