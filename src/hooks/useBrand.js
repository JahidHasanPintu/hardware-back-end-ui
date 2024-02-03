import { useEffect, useState } from 'react';
import getBaseUrl from '../Components/BaseURL/getBaseUrl';

const useBrand = (page, limit, search, status) => {
    let pageNum, pageLim, csearch, cstatus;

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
  

    const [brands,setBrands] = useState([]);
    const baseUrl = getBaseUrl();
    useEffect(()=>{
        fetch(`${baseUrl}/brands?page=${pageNum}&limit=${pageLim}&search=${csearch}&status=${cstatus}`)
        .then(res=>res.json())
        .then(data => setBrands(data.data));
    },[pageNum, pageLim, csearch, cstatus, baseUrl])

    return [brands,setBrands];
};

export default useBrand;