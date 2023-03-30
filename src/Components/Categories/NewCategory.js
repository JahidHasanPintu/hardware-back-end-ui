import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [status, setStatus] = useState('active');

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'cat_name') {
      setCategoryName(value);
    } else if (name === 'cat_image') {
      setCategoryImage(files[0]);
    } else if (name === 'status') {
      setStatus(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cat_name', categoryName);
    formData.append('cat_image', categoryImage);
    formData.append('status', status);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/categories/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);

      toast.success('category created successfully.');
    } catch (error) {
      console.error(error);

      toast.error('Failed to create category.');
    }
  };

  return (
    <div className='text-start'>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Category Create</h6>

              <form
                className="forms-sample row"
                id="from_input"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="col-md-4">
                  <label for="name" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    autocomplete="off"
                    name="cat_name"
                    value={categoryName}
                    placeholder="category name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label for="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="cat_image"
                    placeholder="Category Image"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label for="status" className="form-label">
                    Status
                  </label>
                  <select
                   name="status"
                   id="status"
                   className="form-control"
                   value={status}
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
                  <button type="submit" className="btn btn-primary me-2 mt-2">
                    Submit
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

export default NewCategory;