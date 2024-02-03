import { useEffect, useState } from 'react';
import getBaseUrl from '../Components/BaseURL/getBaseUrl';

const useSubCategories = (page, limit, search, status, category) => {

    let pageNum, pageLim, csearch, cstatus,scat;

    if (page) {
        pageNum = page;
    } else {
        pageNum = 1;
    }

    if (limit) {
        pageLim = limit;
    } else {
        pageLim = 50;
    }

    if (search) {
        csearch = search;
    } else {
        csearch = "";
    }

    if (status) {
        cstatus = status;
    } else {
        cstatus = '';
    }
    if (category) {
        scat = category;
    } else {
        scat = '';
    }


    const [subCategories, setSubCategories] = useState([]);
    // const url = `process.env.BASE_URL/products`;
    const baseUrl = getBaseUrl();
    useEffect(() => {
        fetch(`${baseUrl}/subcategories?page=${pageNum}&limit=${pageLim}&search=${csearch}&status=${cstatus}&cat_id=${scat}`)
            .then(res => res.json())
            .then(data => setSubCategories(data.data));
    }, [baseUrl,pageNum,pageLim,csearch,cstatus,scat])

    return [subCategories, setSubCategories];
};

export default useSubCategories;