import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../Components/BaseURL/getBaseUrl";


export const useProductByID = (id) => {
  const [singleProduct, setSingleProduct] = useState();
  const [loading,setLoading] = useState(false);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`);

        const { success, data, totalItem } = response.data;

        if (success) {
          setSingleProduct(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };
    getAllProducts();
    
  }, [id]);

  return [singleProduct,loading];
};