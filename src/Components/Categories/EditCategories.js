import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCategories = () => {
    const location = useLocation();
    const category = location.state.category;
    const navigate = useNavigate();
 




    const [formValue, setFormValue] = useState({});
    const InputValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = { ...formValue, [name]: value };
        setFormValue(data);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/v1/categories/${category.cat_id}`,
                // formData,
                formValue,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);

            toast.success('Category updated successfully.');
            navigate('/categories')
            
        } catch (error) {
            console.error(error);

            toast.error('Failed to update category.');
        }
    };

    return (
        <div className='text-start'>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Category Update</h6>

                            <form
                                className="forms-sample row"
                                id="from_input"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                                onChange={InputValue}
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
                                        placeholder="Category Name"
                                        defaultValue={category.cat_name}
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
                                        // defaultValue={brand.status}
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
export default EditCategories;