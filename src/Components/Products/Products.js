import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';



const Products = () => {

    const [products,setProducts] = useState([]);
    const [search,setSearch] = useState("");
    const [brand,setBrand] = useState("");
    const [category,setCategory] = useState("");
    const [subCategory,setSubCategory] = useState("");

    const getProducts = () => {
        fetch(`http://localhost:5000/api/v1/products?page=1&limit=20&search=${search}&brand_id=${brand}&cat_id=${category}&subcat_id=${subCategory}`)
        .then(res=>res.json())
        .then(data => setProducts(data.data));
    
       
    };
    const handleSearch = (e) =>{
        const searchText = e.target.value;
        if(!searchText){
            setSearch("");
        }
        setSearch(searchText);
        getProducts();
        // console.log(searchText);
    }

    useEffect(()=>{
        getProducts();
    },[])
    console.log(products);
    return (
        <div className='text-start '>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Filter</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <form>
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
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Category</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Sub Category</label>
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Subcategories</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="brandSelection" class="form-label">Brand</label>
                                    <select class="form-select" id="brandSelection">
                                        <option selected disabled>Select Brand</option>
                                        <option>Oppo</option>
                                        <option>Redmi</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div class="row">
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Status</label>
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}

                    </form>
                    <button type="button" class="btn btn-primary submit">Apply Filter</button>
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
                                        <th>Product Name</th>
                                        <th>Brand</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    products?.map((product, index) =>
                                        <tr key={product.id}>
                                            <th>{index + 1}</th>
                                            <td>{product.name}</td>
                                            <td>{product.brand_name}</td>
                                            <td>{product.cat_name}</td>
                                            <td>{product.subcat_name}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class="page-item"><a class="page-link" href="/"><i data-feather="chevron-left"></i></a></li>
                    <li class="page-item active"><a class="page-link" href="/">1</a></li>
                    <li class="page-item disabled"><a class="page-link" href="/">2</a></li>
                    <li class="page-item"><a class="page-link" href="/">3</a></li>
                    <li class="page-item"><a class="page-link" href="/"><i data-feather="chevron-right"></i></a></li>
                </ul>
            </nav>


        </div>
    );
};

export default Products;