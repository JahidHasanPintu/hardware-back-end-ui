import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../Shared/Pagination/Pagination';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [limit, setLimit] = useState(20);
  
    useEffect(() => {
        getAllCategories();
    }, []);

       // Fetch data from server and update state
       const getAllCategories = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/categories?page=${currentPage}&limit=${limit}&search=${search}&status=${status}`);
        const { success, data, total } = await response.json();

        if (success) {
            setCategories(data);
            setTotalPages(Math.ceil(total / limit));
        } else {
            console.error("Error fetching data");
        }
    };

//     const getAllCategories = async (page = 1) => {
//         axios.get('http://localhost:5000/api/v1/categories')
//         .then(function (response) {
//         // handle success
//         setCategories(response.data.data);
//         // console.log(response.data);
  
//   })
//  };
   
// Update current page and fetch data
const handlePageChange = (page) => {
    setCurrentPage(page);
    getAllCategories();
};

// Searching and Filtering 
const handleSearch = (e) => {
    const searchText = e.target.value;
    if(searchText){
        setSearch(searchText);
    getAllCategories();
    }else{
        getAllCategories();
    }
    
}
const handleFilter = (e) => {
    const status = e.target.value;
    setStatus(status);
    getAllCategories();
}

   // Updating Brand details 
   const [categoryName, setCategoryName] = useState('');
   const [categoryImage, setCategoryImage] = useState(null);
   const [newStatus, setNewStatus] = useState('active');
 
   const handleInputChange = (event) => {
     const { name, value, files } = event.target;
 
     if (name === 'cat_name') {
       setCategoryName(value);
     } else if (name === 'cat_image') {
       setCategoryImage(files[0]);
     } else if (name === 'newStatus') {
       setNewStatus(value);
     }
   };
 
   const handleSubmit = async (id) => {
     console.log("submitted");
     // event.preventDefault();
 
     const formData = new FormData();
     formData.append('brand_name', categoryName);
     formData.append('brand_image', categoryImage);
     formData.append('newStatus', newStatus);
 
     try {
       const response = await axios.put(
         `http://localhost:5000/api/v1/categories/${id}`,
         formData,
         {
           headers: {
             'Content-Type': 'multipart/form-data',
           },
         }
       );
 
       console.log(response.data);
         getAllCategories();
       toast.success('Category updated successfully.');
     } catch (error) {
       console.error(error);
 
       toast.error('Failed to update Category.');
     }
   };

const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/v1/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            getAllCategories();
            toast.success(data.message);
            // Do something with the response data
        })
        .catch(error => {
            console.log(error);
            toast.error('Failed to delete category.');
        }

        );
};

const handleEdit = (id) => {
    console.log("Edit working")
    console.log(id);
}

const handleReset =() =>{
    setSearch("");
    setStatus("");
    document.getElementById("filter_form").reset();
    getAllCategories();
}
  useEffect(() => {
    getAllCategories();
  }, []);

    return (
        <div className='text-start '>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Filter</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <form id='filter_form'>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={handleSearch}
                                    placeholder="Category name" 
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="mb-3">
                                    <label for="statusSelection" className="form-label">Status</label>
                                    <select 
                                    className="form-select" 
                                    id="statusSelection"
                                    onChange={handleFilter}
                                    >
                                        <option selected disabled>Select Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </form>
                    <button 
                    type="button" 
                    onClick={handleReset}
                    className="btn btn-primary submit"
                    >Reset Filter</button>
                </div>
            </div>
            <div className="col-md-12 grid-margin stretch-card mt-3">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Category List</h6>
                        <p className="text-muted mb-3"></p>
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                        <th>Category Image</th>
                                        <th>Category Name</th>
                                        <th>Total Product</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {categories?.map((category, key) =>
                                <tr  key={key}>
                                <th>{++key}</th>
                                <td>
                                                <img src={category.cat_image} class="img-fluid img-thumbnail" alt={category.cat_name}></img>
                                            </td>
                                            <td>{category.cat_name}</td>
                                            <td>50</td>
                                            <td>{category.status}</td>
                                            <td>

                                                <button type="button" 
                                                onClick={() => handleEdit(category.cat_id)} 
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateCategoryModal"
                                                class="btn btn-primary btn-icon me-1">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>

                                                <div class="modal fade" id="updateCategoryModal" tabindex="-1" aria-labelledby="updateCategoryModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="updatecatModalLabel">Change Category Details</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                            <form
                                                                className="forms-sample row"
                                                                id="from_input"
                                                                encType="multipart/form-data"
                                                                // onSubmit={handleSubmit}
                                                            >
                                                                <div className="col-md-4">
                                                                <label htmlFor="name" className="form-label">
                                                                    Category Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="name"
                                                                    autoComplete="off"
                                                                    name="cat_name"
                                                                    defaultValue={category.cat_name}
                                                                    placeholder="cat Name"
                                                                    // value={catName}
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
                                                                    name="cat_image"
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
                                                                    defaultValue = {category.status}
                                                                    onChange={handleInputChange}
                                                                >
                                                                    <option value="active">Active</option>
                                                                    <option value="inactive">Inactive</option>
                                                                </select>
                                                                </div>

                                                                <div className="form-check col-md-4"></div>
                                                                <div className="form-check col-md-4"></div>
                                                                <div className="form-check col-md-4">
                                                                {/* <button type="submit" className="btn btn-primary me-2 mt-2 justify-content-end">
                                                                    Submit
                                                                </button> */}
                                                                </div>
                                                            </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" onClick={()=> handleSubmit(category.cat_id)} class="btn btn-primary">Update</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(category.cat_id)}
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
                response={{ success: true, page: currentPage, limit: limit, total: totalPages }}
                onPageChange={handlePageChange}
            />


        </div>
    );
};

export default Categories;