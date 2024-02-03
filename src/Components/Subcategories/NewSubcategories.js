
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategories';
import getBaseUrl from '../BaseURL/getBaseUrl';
import usePermissions from '../../hooks/usePermissions';
import { useAuth } from '../../api/AuthContext';


const NewSubcategories = () => {
    const [categories] = useCategories();
    const baseUrl = getBaseUrl();
    const { user } = useAuth();
    const permissions = usePermissions(user.role_id);
    const hasCreatePermission = permissions.includes('subcategories.create');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [status, setStatus] = useState('active');
    const [subCategoryImage, setSubCategoryImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'subcat_name') {
            setSubCategoryName(value);
        } else if (name === 'cat_id') {
            setCategoryId(value);
        } else if (name === 'status') {
            setStatus(value);
        } else if (name === 'subcat_image') {
            setSubCategoryImage(files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('subcat_name', subCategoryName);
        formData.append('cat_id', categoryId);
        formData.append('status', status);
        formData.append('subcat_image', subCategoryImage);

        try {
            const response = await axios.post(
                `${baseUrl}/subcategories/create`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);

            toast.success('Sub category created successfully.');
        } catch (error) {
            console.error(error);

            toast.error('Failed to create Sub category.');
        }
    };


    return (
        <div>
            {
                hasCreatePermission ? (
                    <div className='text-start'>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Create Subcategory</h6>

                                        <form
                                            className="forms-sample row"
                                            id="from_input"

                                            encType="multipart/form-data"
                                            onSubmit={handleSubmit}

                                        >
                                            <div className="col-md-3">
                                                <label for="name" className="form-label">
                                                    Subcategory Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    autocomplete="off"
                                                    name="subcat_name"

                                                    placeholder="Subcategory Name"
                                                    value={subCategoryName}

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
                                                        <option value={category.id} >
                                                            {category.cat_name}
                                                        </option>
                                                    )}

                                                </select>
                                            </div>
                                            <div className="col-md-3 d-none">
                                                <label for="image" className="form-label">
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control "
                                                    id="image"
                                                    name="subcat_image"
                                                    placeholder="Sub category image"
                                                    onChange={handleInputChange}

                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <label for="status" className="form-label">
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    id="status"
                                                    className="form-control"

                                                    value={status}
                                                    placeholder="Status"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="active" selected>
                                                        Active
                                                    </option>
                                                    <option value="inactive">In Active</option>
                                                </select>
                                            </div>


                                            <div className="form-check col-md-4"></div>
                                            <div className="form-check col-md-4"></div>
                                            <div className="form-check col-md-4">
                                                <button type="submit" className="btn btn-primary me-2 mt-2 justify-content-end">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (

                    <p>You don't have permission to view this component.</p>
                )
            }
        </div>

    );
};

export default NewSubcategories;