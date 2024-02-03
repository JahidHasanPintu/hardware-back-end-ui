import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getBaseUrl from '../BaseURL/getBaseUrl';

const NewRole = () => {
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [permissionsList, setPermissionsList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [limit, setLimit] = useState(1000);
    const baseUrl = getBaseUrl();

    const handleSearch = (e) => {
        const roleText = e.target.value;
        setRoleName(roleText);

    }

    const handleStatus = (e) => {
        const status = e.target.value;
        setStatus(status);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            roleName: roleName,
            permissions: permissions,
            status: status
          };
          
          try {
            const response = await axios.post(
              `${baseUrl}/roles/create`,
              data,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
    
          console.log(response.data);
          toast.success(response.data.message);
        } catch (error) {
          console.error(error);
    
          toast.error(error);
        }
      };

    useEffect(() => {
        const getAllPermissions = async () => {
            const response = await fetch(`${baseUrl}/permissions`);
            const { success, data, totalItem } = await response.json();

            if (success) {
                setPermissionsList(data);
                console.log(data);
                setTotalPages(totalItem);
            } else {
                console.error("Error fetching data");
            }
        };
        getAllPermissions();
    }, [page, limit, search]);

    const handleCheckboxChange = (event, permission) => {
        const { checked } = event.target;
        if (checked) {
            setPermissions(prevSelected => [...prevSelected, permission]);
        } else {
            setPermissions(prevSelected => prevSelected.filter(p => p !== permission));
        }
    };



    return (

        <div className='text-start '>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Add new role</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <form id='filter_form'>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="mb-3">
                                    <label className="form-label">Role Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleSearch}
                                        placeholder="Role name"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="mb-3">
                                    <label for="statusSelection" className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        id="statusSelection"
                                        onChange={handleStatus}
                                    >
                                        <option selected>Select Status</option>
                                        <option value={"active"}>Active</option>
                                        <option value={"inactive"}>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </form>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary submit"
                    >Add New Role</button>
                </div>
            </div>

            <div className="col-md-12 grid-margin stretch-card mt-3">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Permission List</h6>
                        <p className="text-muted mb-3"></p>
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>

                                        <th>Permission Name</th>
                                        {/* <th>Total Product</th>
                                        <th>Status</th> */}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissionsList?.map((permission, key) =>
                                        <tr key={key}>
                                            <th>{++key}</th>
                                            <td>{permission.name}</td>
                                            {/* <td>50</td>
                                            <td>{permission.name}</td> */}
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={permission.id}
                                                    onChange={event => handleCheckboxChange(event, permission.id)}
                                                    checked={permissions.includes(permission.id)}
                                                />
                                            </td>
                                        </tr>

                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NewRole;