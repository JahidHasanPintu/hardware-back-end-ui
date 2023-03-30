import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategories';

const EditSubCategory = () => {
    const location = useLocation();
    const subcategory = location.state.subcategory;
    const navigate = useNavigate();
    const [categories] = useCategories();

 

    const [categoryId, setCategoryId] = useState('');
    const [subCatName, setSubCatName] = useState('');
    const [subCatImage, setSubCatImage] = useState(null);
    const [status, setStatus] = useState('active');

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'subcat_name') {
            setSubCatName(value);
        } else if (name === 'subcat_image') {
            setSubCatImage(files[0]);
        } else if (name === 'status') {
            setStatus(value);
        }else if (name === 'cat_id') {
            setCategoryId(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('subcat_name', subCatName);
        formData.append('subcat_image', subCatImage);
        formData.append('status', status);
        formData.append('cat_id', categoryId);

        try {
            const response = await axios.put(
                `http://localhost:5000/api/v1/subcategories/${subcategory.subcat_id}`,
                formData,
                // formValue,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);

            toast.success('Sub Category updated successfully.');
            navigate('/subcategories')
            
        } catch (error) {
            console.error(error);

            toast.error('Failed to update sub category.');
        }
    };

    return (
        <div className='text-start'>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Sub Category Update</h6>

                            <form
                                className="forms-sample row"
                                id="from_input"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                                // onChange={InputValue}
                            >
                                <div className="col-md-4">
                                    <label htmlFor="name" className="form-label">
                                        Sub Category Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        autoComplete="off"
                                        name="subcat_name"
                                        placeholder="Category Name"
                                        defaultValue={subcategory.subcat_name}
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
                                        name="subcat_image"
                                        placeholder="Images"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label for="cat_id" className="form-label">
                                        Parent Category
                                    </label>
                                    <select
                                        name="cat_id"
                                        id="cat_id"
                                        className="form-control"
                                        value={categoryId}
                                        placeholder="categoy id"
                                        onChange={handleInputChange}

                                    >
                                        <option>Select Parent Category</option>
                                        {categories?.map((category, key) =>
                                            <option value={category.cat_id} >
                                                {category.cat_name}
                                            </option>
                                        )}

                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="status" className="form-label">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        // defaultValue={SubCat.status}
                                    >
                                        <option >Select Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-check col-md-4"></div>
                                <div className="form-check col-md-4"></div>
                                <div className="form-check col-md-4">
                                    <button type="submit" className="btn btn-primary me-2 mt-2 justify-content-end">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditSubCategory;

