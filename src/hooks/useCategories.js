import { useEffect, useState } from 'react';

const useCategories = () => {
    const [categories,setCategories] = useState([]);
    // const url = `process.env.BASE_URL/products`;
    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/categories')
        .then(res=>res.json())
        .then(data => setCategories(data.data));
    },[])

    return [categories,setCategories];
};

export default useCategories;