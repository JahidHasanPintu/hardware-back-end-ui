import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Shared/Pagination/Pagination';
import { toast } from 'react-toastify';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [limit, setLimit] = useState(20);

    // Fetch data from server when component mounts
    useEffect(() => {
        getBrands();
    }, []);

    // Fetch data from server and update state
    const getBrands = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/brands?page=${currentPage}&limit=${limit}&search=${search}&status=${status}`);
        const { success, data, total } = await response.json();

        if (success) {
            setBrands(data);
            setTotalPages(Math.ceil(total / limit));
        } else {
            console.error("Error fetching data");
        }
    };

    // Update current page and fetch data
    const handlePageChange = (page) => {
        setCurrentPage(page);
        getBrands();
    };

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        if (searchText) {
            setSearch(searchText);
            getBrands();
        } else {
            getBrands();
        }

    }
    const handleFilter = (e) => {
        const status = e.target.value;
        setStatus(status);
        getBrands();
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
                getBrands();
                toast.success(data.message);
                // Do something with the response data
            })
            .catch(error => {
                console.log(error);
                toast.error('Failed to delete brand.');
            }

            );
    };
    const [singleBrand, setSingleBrand] = useState({});

    const handleEdit = (brand) => {
        setSingleBrand(brand);
        
    }
    


    // Updating Brand details 
    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState(null);
    const [newStatus, setNewStatus] = useState('active');

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'brand_name') {
            setBrandName(value);
        } else if (name === 'brand_image') {
            setBrandImage(files[0]);
        } else if (name === 'status') {
            setNewStatus(value);
        }
    };

    const handleSubmit = async (id) => {
        
        // event.preventDefault();

        const formData = new FormData();
        formData.append('brand_name', brandName);
        formData.append('brand_image', brandImage);
        formData.append('status', newStatus);

        try {
            const response = await axios.put(
                `http://localhost:5000/api/v1/brands/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);
            getBrands();
            toast.success('Brand updated successfully.');
        } catch (error) {
            console.error(error);

            toast.error('Failed to update brand.');
        }
    };

    const handleReset = () => {
        setSearch("");
        setStatus("");
        document.getElementById("filter_form").reset();
        getBrands();
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
                                        <option value={"active"}>InActive</option>
                                        <option value={"inactive"}>Active</option>
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
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updateBrandModal"
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

            <div class="modal fade" id="updateBrandModal" tabindex="-1" aria-labelledby="updateBrandModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateBrandModalLabel">Change Brand Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
                        </div>
                        <div class="modal-body">
                            <form
                                className="forms-sample row"
                                id="from_input"
                                encType="multipart/form-data"
                            // onSubmit={() => handleSubmit(singleBrand.brand_id)}
                            >
                                <div className="col-md-4">
                                    <label htmlFor="name" className="form-label">
                                        Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        autoComplete="off"
                                        name="brand_name"
                                        defaultValue={singleBrand.brand_name}
                                        placeholder="Brand Name"
                                        value={brandName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="image" className="form-label">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="brand_image"
                                        placeholder="Images"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="status" className="form-label">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-control"
                                        // value={status}
                                        defaultValue={singleBrand.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-check col-md-4"></div>
                                <div className="form-check col-md-4"></div>
                                <div className="form-check col-md-4">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={() => handleSubmit(singleBrand.brand_id)} class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination
                response={{ success: true, page: currentPage, limit: limit, total: totalPages }}
                onPageChange={handlePageChange}
            />


        </div>
    );
};

export default Brands;