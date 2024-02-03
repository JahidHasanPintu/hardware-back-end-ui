
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../api/AuthContext';
import Pagination from '../Shared/Pagination/Pagination';
import { toast } from 'react-toastify';
import useRoles from '../../hooks/useRoles';
import getBaseUrl from '../BaseURL/getBaseUrl';
import usePermissions from '../../hooks/usePermissions';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


const Users = () => {
    const [roles] = useRoles();
    const [users, setUsers] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(40);
    const [blockStatus, setBlockStatus] = useState("");
    const [role, setRole] = useState("");
    const { user } = useAuth();
    const baseUrl = getBaseUrl();
    const permissions = usePermissions(user.role_id);
    const hasViewPermission = permissions.includes('user.view');
    const hasEditPermission = permissions.includes('user.edit');
    const hasDeletePermission = permissions.includes('user.delete');

    // Fetch data from server when component mounts
    useEffect(() => {
        const getAllUsers = async () => {
            const response = await fetch(`${baseUrl}/users?page=${page}&limit=${limit}&search=${search}&isblocked=${blockStatus}&role=${role}`,
                {
                    headers: {
                        authorization: `Bearer ${user.token}`,
                    },
                }
            );
            const { success, data, totalItem } = await response.json();

            if (success) {
                setUsers(data);
                setTotalPages(totalItem);
            } else {
                console.error("Error fetching data");
            }
        };
        getAllUsers();
    }, [page, limit, search, blockStatus, role, user]);

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);


    }
    const handleBlock = (e) => {
        const status = e.target.value;
        setBlockStatus(status);
    }
    const handleRole = (e) => {
        const role = e.target.value;
        setRole(role);
    }

    const handleReset = () => {
        setSearch("");
        setRole("");
        setBlockStatus("");
        document.getElementById("filter_form").reset();
    }
    const handleDelete = (id) => {
        if (hasDeletePermission) {
            fetch(`${baseUrl}/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    toast.success(data.message);
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // remove deleted user from the state
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to delete user.');
                });
        } else {
            toast.error("You don't have permission");
        }

    };
    const navigate = useNavigate();
    const handleEdit = (user) => {
        if (hasEditPermission) {
            navigate(`/edit-user/${user.id}`, { state: { user: user } });
        } else {
            toast.error("You don't have permission");
        }

    }



    return (
        <div>
            {hasViewPermission ? (
                <div className='text-start '>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Filter</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Filter users</h6>
                            <form id='filter_form'>
                                <div class="row d-flex align-items-center justify-content-center">
                                    <div class="col-sm-3">
                                        <div class="mb-3">
                                            <label class="form-label">Name / Phone / Email</label>
                                            <input type="text"
                                                onChange={handleSearch}
                                                class="form-control"
                                                placeholder="User name" />
                                        </div>
                                    </div>
                        

                                    <div class="col-sm-3">
                                        <div class="mb-3">
                                            <label for="statusSelection" class="form-label">Status</label>
                                            <select class="form-select" onChange={handleBlock} id="statusSelection">
                                                <option selected disabled>Select Status</option>
                                                <option value={"active"}>Active</option>
                                                <option value={"inactive"}>Inactive</option>
                                                <option value={"blocked"}>Blocked</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="mb-3">
                                            <label for="brandSelection" class="form-label">Role</label>
                                            <select class="form-select" onChange={handleRole} id="brandSelection">
                                                <option selected disabled>Select Role</option>
                                                {roles?.map((role, key) =>
                                                    <option value={role.id} >
                                                        {role.role}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="mt-3">
                                        <button type="button" onClick={handleReset} class="btn btn-primary submit">Reset Filter</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                    <div class="col-md-12 grid-margin stretch-card mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">User List</h6>
                                <p class="text-muted mb-3"></p>
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Users</th>
                                                <th>Role</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>City</th>
                                                <th>Zipcode</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users?.map((user, key) =>
                                                <tr key={key}>
                                                    <th>{++key}</th>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.user_role}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.city}</td>
                                                    <td>{user.zipcode}</td>
                                                    <td>{user.status}</td>
                                                    <td>

                                                        <button type="button" onClick={() => handleEdit(user)} class="btn btn-primary btn-icon me-1">

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </button>
                                                        <button type="button" onClick={() => handleDelete(user.id)} class="btn btn-danger btn-icon">
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
            )}
        </div>

    );
};

export default Users;