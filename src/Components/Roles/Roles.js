import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from '../Shared/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
const Roles = () => {
    const baseUrl = getBaseUrl();

    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [limit, setLimit] = useState(20);

    const { user } = useAuth();
    const permissions = usePermissions(user.role_id);

    const hasViewPermission = permissions.includes('user.view');
    const hasEditPermission = permissions.includes('user.edit');
    const hasDeletePermission = permissions.includes('user.delete');
    const hasCreatePermission = permissions.includes('user.create');

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);

    }
    const handleFilter = (e) => {
        const status = e.target.value;
        setStatus(status);

    }

    const handleDelete = (id) => {
        if (hasDeletePermission) {
            fetch(`${baseUrl}/roles/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    toast.success(data.message);
                    setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to delete role.');
                }

                );
        } else {
            toast.error("You don't have permission");
        }

    };
    const navigate = useNavigate();
    const handleEdit = (role) => {
        navigate(`/edit-roles/${role.id}`, { state: { role: role } });
    }
    const navigateToNewRole = () => {
        if (hasCreatePermission) {
            navigate(`/new-roles`);
        } else {
            toast.error("You don't have permission");
        }

    }

    const handleReset = () => {
        setSearch("");
        setStatus("");
        document.getElementById("filter_form").reset();
    }

    useEffect(() => {
        const getAllRoles = async () => {
            const response = await fetch(`${baseUrl}/roles?page=${page}&limit=${limit}&search=${search}`);
            const { success, data, totalItem } = await response.json();

            if (success) {
                console.log(data);
                setRoles(data);
                setTotalPages(totalItem);
            } else {
                console.error("Error fetching data");
            }
        };
        getAllRoles();
    }, [page, limit, search]);

    return (
        <div>
            {
                hasViewPermission ? (
                    <div className='text-start '>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Role Management</h5>
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
                                    </div>

                                </form>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="btn btn-primary submit"
                                >Reset Filter</button>
                                <button
                                    type="button"
                                    onClick={navigateToNewRole}
                                    className="ms-2 btn btn-primary submit"
                                >Add New</button>
                            </div>
                        </div>
                        <div className="col-md-12 grid-margin stretch-card mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Role List</h6>
                                    <p className="text-muted mb-3"></p>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>

                                                    <th>Role Name</th>
                                                    <th>Permissions</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles?.map((role, key) =>
                                                    <tr key={key}>
                                                        <th>{++key}</th>
                                                        <td>{role.role}</td>
                                                        <td className="text-nowrap text-truncate" style={{ maxWidth: '200px' }}>
                                                            {role?.permissions?.map((permission, index) => (
                                                                <span key={index}>{permission.name}</span>
                                                            ))}
                                                        </td>
                                                        <td>

                                                            <button type="button"
                                                                onClick={() => handleEdit(role)}
                                                                class="btn btn-primary btn-icon me-1">

                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(role.id)}
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
                            page={page}
                            limit={limit}
                            total={totalPages}
                            setPage={(page) => setPage(page)}
                        />


                    </div>

                ) : (

                    <>
                    <LoadingSpinner />
                    <p>checking permission.</p>
                    </>
                )
            }
        </div>

    );
};

export default Roles;