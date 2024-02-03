import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useBrand from '../../hooks/useBrand';
import useCategories from '../../hooks/useCategories';
import useSubCategories from '../../hooks/useSubCategories';
import Pagination from '../Shared/Pagination/Pagination';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';



const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [catID, setCatID] = useState("");
    const [subcatID, setSubCatID] = useState("");
    const [brandID, setBrandID] = useState("");
    const [limit, setLimit] = useState(40);

    const [categories] = useCategories(1,200,'','');
    const [subcategories] = useSubCategories(1,200);
    const [brands] = useBrand(1,200);
    const baseUrl = getBaseUrl();

    const { user } = useAuth();
    const permissions = usePermissions(user.role_id);
    const hasViewPermission = permissions.includes('products.view');
    const hasEditPermission = permissions.includes('products.edit');
    const hasDeletePermission = permissions.includes('products.delete');
    const hasCreatePermission = permissions.includes('products.create');

    // Fetch data from server when component mounts
    useEffect(() => {
        const getAllProducts = async () => {
            const response = await fetch(`${baseUrl}/products?page=${page}&limit=${limit}&search=${search}&brand_id=${brandID}&cat_id=${catID}&subcat_id=${subcatID}`);
            const { success, data, totalItem } = await response.json();

            if (success) {
                setProducts(data);
                setTotalPages(totalItem);
                console.log(data);
            } else {
                console.error("Error fetching data");
            }
        };
        getAllProducts();
    }, [page, limit, search, brandID, catID, subcatID]);

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);


    }
    const handleBrand = (e) => {
        const brand = e.target.value;
        setBrandID(brand);
    }
    const handleCat = (e) => {
        const catID = e.target.value;
        setCatID(catID);
    }
    const handleSubCat = (e) => {
        const subcatID = e.target.value;
        setSubCatID(subcatID);
    }
    const handleDelete = (id) => {
        if (hasDeletePermission) {
            fetch(`${baseUrl}/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {

                    toast.success(data.message);
                    setProducts(prevProducts => prevProducts.filter(prod => prod.id !== id));
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to delete product.');
                }

                );

        } else {
            toast.error("You don't have permission");
        }

    };

    const navigate = useNavigate();
    const handleEdit = (product) => {
        if (hasEditPermission) {
            navigate(`/edit-products/${product.id}`, { state: { product: product } });
        } else {
            toast.error("You don't have permission");
        }

    }


    const handleReset = () => {
        setSearch("");
        setBrandID("");
        setCatID("");
        setSubCatID("");
        document.getElementById("filter_form").reset();
    }

    return (
        <div>
            {
                hasViewPermission ? (
                    <div className='text-start '>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Filter</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <form id='filter_form'>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label class="form-label">Product Name</label>
                                                <input
                                                    type="text"
                                                    onChange={handleSearch}
                                                    class="form-control"
                                                    placeholder="Product name" />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label for="statusSelection" class="form-label">Category</label>
                                                <select
                                                    class="form-select"
                                                    onChange={handleCat}
                                                    id="statusSelection">
                                                    <option selected disabled>Select Category</option>
                                                    {categories?.map((category, key) =>
                                                        <option value={category.id} >
                                                            {category.cat_name}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label for="statusSelection" class="form-label">Sub Category</label>
                                                <select
                                                    class="form-select"
                                                    id="statusSelection"
                                                    onChange={handleSubCat}
                                                >
                                                    <option selected disabled>Select Subcategories</option>
                                                    {subcategories?.map((subcategory, key) =>
                                                        <option value={subcategory.subcat_id} >
                                                            {subcategory.subcat_name}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label for="brandSelection" class="form-label">Brand</label>
                                                <select
                                                    class="form-select"
                                                    id="brandSelection"
                                                    onChange={handleBrand}
                                                >
                                                    <option selected disabled>Select Brand</option>
                                                    {brands?.map((brand, key) =>
                                                        <option value={brand.id} >
                                                            {brand.brand_name}
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                                <button type="button" onClick={handleReset} class="btn btn-primary submit">Reset Filter</button>
                            </div>
                        </div>
                        <div class="col-md-12 grid-margin stretch-card mt-3">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title">Product List</h6>
                                    <p class="text-muted mb-3"></p>
                                    <div class="table-responsive">
                                        <table class="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Image</th>
                                                    <th>Product Name</th>
                                                    <th>Brand</th>
                                                    <th>Category</th>
                                                    <th>Sub Category</th>
                                                    <th>Price</th>
                                                    <th>Old Price</th>
                                                    <th>Quantity</th>
                                                    <th>Sold</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products?.map((product, index) =>
                                                        <tr key={product.id}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                <img src={product.images[0]} class="img-fluid img-thumbnail" alt={product.name}></img>
                                                            </td>
                                                            <td>{product.name.slice(0, 20)} ..</td>
                                                            <td>{product.brand_name}</td>
                                                            <td>{product.cat_name}</td>
                                                            <td>{product.subcat_name}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.oldPrice}</td>
                                                            <td>{product.quantity}</td>
                                                            <td>{product.sale_count}</td>
                                                            <td>

                                                                <button type="button" onClick={() => handleEdit(product)} class="btn btn-primary btn-icon me-1">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                </button>
                                                                <button type="button" onClick={() => handleDelete(product.id)} class="btn btn-danger btn-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>

                                                                </button></td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination
                            page={page}
                            limit={limit}
                            total={totalPages}
                            setPage={(page) => setPage(page)}
                        />



                    </div>
                ) : (

                    <>
                    <LoadingSpinner />
                    <p>checking permission.</p>
                    </>
                )
            }
        </div>

    );
};

export default Products;