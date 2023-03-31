import React, { useEffect, useState } from 'react';
import Pagination from '../Shared/Pagination/Pagination';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [limit, setLimit] = useState(20);
    

    // Fetch data from server when component mounts
    useEffect(() => {
        const getBrands = async () => {
            const response = await fetch(`http://localhost:5000/api/v1/brands?page=${page}&limit=${limit}&search=${search}&status=${status}`);
            const { success, data, totalItem  } = await response.json();
    
            if (success) {
                setBrands(data);
                setTotalPages(totalItem);
            } else {
                console.error("Error fetching data");
            }
        };
        getBrands();
    }, [page,limit,search,status]);

  

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
          

    }
    const handleFilter = (e) => {
        const status = e.target.value;
        setStatus(status);
    }
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/v1/brands/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                
                toast.success(data.message);
                setBrands(prevBrands => prevBrands.filter(brand => brand.brand_id !== id));
            })
            .catch(error => {
                console.log(error);
                toast.error('Failed to delete brand.');
            }

            );
    };

    const navigate =useNavigate();
    const handleEdit = (brand) => {
        navigate(`/edit-brand/${brand.brand_id}`,{state: {brand : brand }});
      }
    

    const handleReset = () => {
        setSearch("");
        setStatus("");
        document.getElementById("filter_form").reset();
    }

    return (
        <div className='text-start '>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Filter</h5>
                    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <form id='filter_form'>
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        class="form-control"
                                        placeholder="Brand name" />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Status</label>
                                    <select
                                        class="form-select"
                                        id="statusSelection"
                                        onChange={handleFilter}
                                    >
                                        <option selected disabled>Select Status</option>
                                        <option value={"active"}>Active</option>
                                        <option value={"inactive"}>InActive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </form>
                    <button
                        type="button"
                        onClick={handleReset}
                        class="btn btn-primary submit">Reset Filter</button>
                </div>
            </div>
            <div class="col-md-12 grid-margin stretch-card mt-3">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Brand List</h6>
                        <p class="text-muted mb-3"></p>
                        <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Brand Image</th>
                                        <th>Brand Name</th>
                                        <th>Total Product</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {brands?.map((brand, key) =>
                                        <tr key={key}>
                                            <th>{++key}</th>
                                            <td>
                                                <img src={brand.brand_image} class="img-fluid img-thumbnail" alt={brand.brand_name}></img>
                                            </td>
                                            <td>{brand.brand_name}</td>
                                            <td>50</td>
                                            <td>{brand.status}</td>
                                            <td>

                                                <button type="button"
                                                    onClick={() => handleEdit(brand)}
                                                    class="btn btn-primary btn-icon me-1">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(brand.brand_id)}
                                                    class="btn btn-danger btn-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>

                                                </button></td>
                                        </tr>

                                    )}

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
    );
};

export default Brands;