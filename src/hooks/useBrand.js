import { useEffect, useState } from 'react';

const useBrand = () => {
    const [brands,setBrands] = useState([]);
    // const url = `process.env.BASE_URL/products`;
    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/brands')
        .then(res=>res.json())
        .then(data => setBrands(data.data));
    },[])

    return [brands,setBrands];
};

export default useBrand;