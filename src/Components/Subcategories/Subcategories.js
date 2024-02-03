import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategories';
import Pagination from '../Shared/Pagination/Pagination';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Subcategories = () => {
    const baseUrl = getBaseUrl();
    const { user } = useAuth();
    const permissions = usePermissions(user.role_id);
    const hasViewPermission = permissions.includes('subcategories.view');
    const hasEditPermission = permissions.includes('subcategories.edit');
    const hasDeletePermission = permissions.includes('subcategories.delete');

    const [subcategories, setSubCategories] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState(40);
    const [categories] = useCategories(1, 200, '', '');

    // Fetch data from server when component mounts
    useEffect(() => {
        const getAllSubCategories = async () => {
            const response = await fetch(`${baseUrl}/subcategories?page=${page}&limit=${limit}&search=${search}&status=${status}&cat_id=${category}`);
            const { success, data, totalItem } = await response.json();

            if (success) {
                setSubCategories(data);
                setTotalPages(totalItem);
            } else {
                console.error("Error fetching data");
            }
        };
        getAllSubCategories();
    }, [page, limit, search, status, category]);

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);


    }
    const handleFilter = (e) => {
        const status = e.target.value;
        setStatus(status);
    }
    const handleParent = (e) => {
        const parent = e.target.value;
        setCategory(parent);
    }
    const handleDelete = (id) => {
        if (hasDeletePermission) {
            if (id != 0) {
                fetch(`${baseUrl}/subcategories/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(data => {

                        toast.success(data.message);
                        setSubCategories(prevSubCat => prevSubCat.filter(subcat => subcat.subcat_id !== id));
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error('Failed to delete subcategory.');
                    }

                    );
            } else {
                toast.error("This one can not be deleted!");
            }

        } else {
            toast.error("You don't have permission");
        }

    };

    const navigate = useNavigate();
    const handleEdit = (subcategory) => {
        if (hasEditPermission) {
            navigate(`/edit-subcategory/${subcategory.subcat_id}`, { state: { subcategory: subcategory } });
        } else {
            toast.error("You don't have permission");
        }

    }


    const handleReset = () => {
        setSearch("");
        setStatus("");
        setCategory("");
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
                                <h6 class="card-subtitle mb-2 text-muted">Find Subcategories</h6>
                                <form id='filter_form'>
                                    <div class="row d-flex align-items-center justify-content-center">
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label class="form-label">Name</label>
                                                <input type="text" onChange={handleSearch} class="form-control" placeholder="Subcategory name" />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label for="statusSelection" class="form-label">Parent Category</label>
                                                <select class="form-select" onChange={handleParent} id="statusSelection">
                                                    <option selected disabled>Select Parent Category</option>
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
                                        <div class="col-sm-3 mt-3">
                                            <button type="button" onClick={handleReset} class="btn btn-primary submit">Reset Filter</button>
                                        </div>
                                    </div>

                                </form>
                                {/* <button type="button" class="btn btn-primary submit">Apply Filter</button> */}
                            </div>
                        </div>
                        <div class="col-md-12 grid-margin stretch-card mt-3">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title">Sub Category List</h6>
                                    <p class="text-muted mb-3"></p>
                                    <div class="table-responsive">
                                        <table class="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Subcategories</th>
                                                    <th>Parent Category</th>
                                                    <th>Product Count</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subcategories?.map((subcategory, key) =>
                                                    <tr key={key}>
                                                        <th>{++key}</th>
                                                        <td>{subcategory.subcat_name}</td>
                                                        <td>{subcategory.cat_name}</td>
                                                        <td>{subcategory.product_count}</td>
                                                        <td>{subcategory.status}</td>
                                                        <td>

                                                            <button type="button" onClick={() => handleEdit(subcategory)} class="btn btn-primary btn-icon me-1">

                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                            </button>
                                                            <button type="button" onClick={() => handleDelete(subcategory.subcat_id)} class="btn btn-danger btn-icon">
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

export default Subcategories;