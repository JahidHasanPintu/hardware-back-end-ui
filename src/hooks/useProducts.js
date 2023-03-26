import { useEffect, useState } from 'react';

const useProducts = () => {
    const [products,setProducts] = useState([]);
    const url = `process.env.BASE_URL/products`;
    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/products')
        .then(res=>res.json())
        .then(data => setProducts(data.data));
    },[])

    return [products,setProducts];
};

export default useProducts;