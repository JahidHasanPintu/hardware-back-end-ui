import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Brands = () => {
    const [brands, setBrands] = useState();

    const getAllBrands = async (page = 1) => {
        axios.get('http://localhost:5000/api/v1/brands')
        .then(function (response) {
        // handle success
        setBrands(response.data);
        console.log(response.data);
  
  })
 };
   

  useEffect(() => {
    getAllBrands();
    console.log(brands);
  }, []);


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
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control" placeholder="Product name" />
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
                        <div class="row">
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
                        </div>

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
                                        <th>Brand Name</th>
                                        <th>Brand Image</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {brands?.map((brand, key) =>
                                <tr  key={key}>
                                <th>{++key}</th>
                                <td>{brand.brand_name}</td>
                                <td>{brand.brand_image}</td>
                                <td>{brand.status}</td>
                                <td>
                                    
                                    <button type="button" class="btn btn-primary btn-icon me-1">
                                        
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                 </button>
                                <button type="button" class="btn btn-danger btn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    
                                </button></td>
                            </tr>
                                
                                )}

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

export default Brands;