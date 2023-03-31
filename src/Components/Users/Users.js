
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../api/AuthContext';
import Pagination from '../Shared/Pagination/Pagination';
import { toast } from 'react-toastify';


const Users = () => {
    const [users, setUsers] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [blockStatus, setBlockStatus] = useState("");
    const [role, setRole] = useState("");
    const { user } = useAuth();


    // Fetch data from server when component mounts
    useEffect(() => {
        const getAllUsers = async () => {
            const response = await fetch(`http://localhost:5000/api/v1/users?page=${page}&limit=${limit}&search=${search}&isblocked=${blockStatus}&role=${role}`,
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
    }, [page, limit, search,blockStatus,role,user]);

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

    // const handleDelete = (id) => {
    //     fetch(`http://localhost:5000/api/v1/users/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
                
    //             toast.success(data.message);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             toast.error('Failed to delete user.');
    //         }

    //         );
    // };
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/v1/users/${id}`, {
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
    };
    

    return (
        <div className='text-start '>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Filter</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Filter users</h6>
                    <form id='filter_form'>
                        <div class="row">
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
                                    <label class="form-label">Phone</label>
                                    <input type="text" class="form-control" placeholder="Phone" />
                                </div>
                            </div>

                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Blocking</label>
                                    <select class="form-select" onChange={handleBlock} id="statusSelection">
                                        <option selected disabled>Select Status</option>
                                        <option value={true}>Blocked</option>
                                        <option value={false}>Unblocked</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="brandSelection" class="form-label">Role</label>
                                    <select class="form-select" onChange={handleRole} id="brandSelection">
                                        <option selected disabled>Select Role</option>
                                        <option>Super Admin</option>
                                        <option>Admin</option>
                                        <option>Editor</option>
                                        <option>Manager</option>
                                        <option>Customer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button type="button" onClick={handleReset} class="btn btn-primary submit">Reset Filter</button>
                </div>
            </div>
            <div class="col-md-12 grid-margin stretch-card mt-3">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Category List</h6>
                        <p class="text-muted mb-3"></p>
                        <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Users</th>
                                        <th>Zipcode</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user, key) =>
                                        <tr key={key}>
                                            <th>{++key}</th>
                                            <td>{user.fullname}</td>
                                            <td>{user.zipcode}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td>{user.city}</td>
                                            <td>

                                                <button type="button" class="btn btn-primary btn-icon me-1">

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
    );
};

export default Users;