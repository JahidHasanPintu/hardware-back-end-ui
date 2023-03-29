import { useEffect, useState } from 'react';

const useSubCategories = () => {
    const [subCategories,setSubCategories] = useState([]);
    // const url = `process.env.BASE_URL/products`;
    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/subcategories')
        .then(res=>res.json())
        .then(data => setSubCategories(data.data));
    },[])

    return [subCategories,setSubCategories];
};

export default useSubCategories;