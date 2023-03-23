import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const NewCategory = () => {
  const [formValue, setFormValue] = useState({});
  const InputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { ...formValue, [name]: value };
    setFormValue(data);
  };

  const createData = (e) => {
    e.preventDefault();
    insertData();
  };

  const insertData = async () => {
    const fd = new FormData(document.getElementById("from_input"));
    const response = await postApi(fd);
    if (response) {
      if (response.code === 200) {
        toast.success(response.message[0], {
          position: "top-right",
        });
        document.getElementById("from_input").reset()
      } else {
        toast.error(response.message[0], {
          position: "top-right",
        });
      }
    }
  };
  const postApi = async (data) => {
    const api_url = `http://localhost:5000/api/v1/categories/create`;
    let conf = {};
    // if (!config) {
      conf = {
        headers: {
          // authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    // } else {
    //   conf = config;
    // }
    return await axios
      .post(api_url, data, conf)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", "Network connection failed!", "error");
      });
  };

  useEffect(() => {
  }, []);
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
                onChange={InputValue}
                onSubmit={createData}
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
                    value={formValue.cat_name}
                    placeholder="category name"
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
                    name="image"
                    placeholder="Email"
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
                    value={formValue.status}
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