import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const NewBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [status, setStatus] = useState('active');

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'brand_name') {
      setBrandName(value);
    } else if (name === 'brand_image') {
      setBrandImage(files[0]);
    } else if (name === 'status') {
      setStatus(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('brand_name', brandName);
    formData.append('brand_image', brandImage);
    formData.append('status', status);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/brands/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);

      toast.success('Brand created successfully.');
    } catch (error) {
      console.error(error);

      toast.error('Failed to create brand.');
    }
  };

  return (
    <div className='text-start'>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Brand Create</h6>

              <form
                className="forms-sample row"
                id="from_input"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
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
                    value={status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
  );
};

export default NewBrand;