import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRoles = () => {
    const location = useLocation();
    const exRole = location.state.role;
    const navigate = useNavigate();

    const [roleName, setRoleName] = useState(exRole.role);
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
    };

    const handleStatus = (e) => {
        const status = e.target.value;
        setStatus(status);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            roleId: exRole.id,
            roleName: roleName,
            permissions: permissions,
            selectedPermissions: selectedPermissions,
            removedPermissions: deselectedPermissions,
            status: status
        };
        try {
          const response = await axios.put(
            `${baseUrl}/roles/${exRole.id}`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(response.data);
          toast.success(response.data.message);
          navigate('/roles')
        } catch (error) {
          console.error(error);
          toast.error(error);
        }
    };

    useEffect(() => {
        // Function to collect existing permission IDs
        const collectExistingPermissionIds = () => {
          const permissionIds = exRole?.permissions?.map(permission => permission.id);
          setPermissions(permissionIds);
          console.log(permissionIds);
        };
    
        collectExistingPermissionIds();
      }, [exRole]);

    useEffect(() => {
        
           
          
        //   collectExistingPermissionIds();
        const getAllPermissions = async () => {
            const response = await fetch(`${baseUrl}/permissions`);
            const { success, data, totalItem } = await response.json();

            if (success) {
                // Add a checked property to each permission object based on permissions
                const updatedPermissionsList = data.map(permission => ({
                    ...permission,
                    checked: permissions.includes(permission.id)
                }));

                setPermissionsList(updatedPermissionsList);
                setTotalPages(totalItem);
            } else {
                console.error("Error fetching data");
            }
        };
        getAllPermissions();
    }, [page, limit, search]);


    // const handleCheckboxChange = (event, permissionId) => {
    //     const { checked } = event.target;
    //     if (checked) {
    //       // Add the permission ID to the permissions array if it's checked
    //       setPermissions(prevPermissions => [...prevPermissions, permissionId]);
    //     } else {
    //       // Remove the permission ID from the permissions array if it's unchecked
    //       setPermissions(prevPermissions =>
    //         prevPermissions.filter(permission => permission !== permissionId)
    //       );
    //     }
    //   };
      
      const [selectedPermissions, setSelectedPermissions] = useState([]);
      const [deselectedPermissions, setDeselectedPermissions] = useState([]);
    
      const handleCheckboxChange = (event, permissionId) => {
        const { checked } = event.target;
        if (checked) {
            setPermissions(prevPermissions => [...prevPermissions, permissionId]);
          setSelectedPermissions(prevSelected => [...prevSelected, permissionId]);
          setDeselectedPermissions(prevDeselected =>
            prevDeselected.filter(id => id !== permissionId)
          );
        } else {
            setPermissions(prevPermissions =>
                        prevPermissions.filter(permission => permission !== permissionId)
                      );
          setDeselectedPermissions(prevDeselected => [...prevDeselected, permissionId]);
          setSelectedPermissions(prevSelected =>
            prevSelected.filter(id => id !== permissionId)
          );
        }
      };
    



    return (
        <div className='text-start'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Update role permission</h5>
                    <form id='filter_form'>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="mb-3">
                                    <label className="form-label">Role Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={roleName}
                                        onChange={handleSearch}
                                        placeholder="Role name"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="mb-3">
                                    <label htmlFor="statusSelection" className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        id="statusSelection"
                                        onChange={handleStatus}
                                    >
                                        <option>Select Status</option>
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
                    >Update</button>
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissionsList?.map((permission, key) => (
                                        <tr key={key}>
                                            <th>{++key}</th>
                                            <td>{permission.name}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={permission.id}
                                                    onChange={(event) => handleCheckboxChange(event, permission.id)}
                                                    checked={permissions.includes(permission.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoles;
