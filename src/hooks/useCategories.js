import { useEffect, useState } from 'react';
import getBaseUrl from '../Components/BaseURL/getBaseUrl';

const useCategories = (page, limit, search, status) => {
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

  const [categories, setCategories] = useState([]);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    fetch(`${baseUrl}/categories?page=${pageNum}&limit=${pageLim}&search=${csearch}&status=${cstatus}`)
      .then(res => res.json())
      .then(data => setCategories(data.data));
  }, [pageNum, pageLim, csearch, cstatus, baseUrl]);

  return [categories,setCategories];
};

export default useCategories;
