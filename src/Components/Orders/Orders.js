import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useBrand from '../../hooks/useBrand';
import useCategories from '../../hooks/useCategories';
import useSubCategories from '../../hooks/useSubCategories';
import Pagination from '../Shared/Pagination/Pagination';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';



const Orders = () => {
    const baseUrl = getBaseUrl();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [sort, setSort] = useState("");
    const [limit, setLimit] = useState(25);

    const [categories] = useCategories();
    const [subcategories] = useSubCategories();
    const [brands] = useBrand();

    const { user } = useAuth();
    const permissions = usePermissions(user.role_id);
    const hasViewPermission = permissions.includes('orders.view');
    const hasEditPermission = permissions.includes('orders.edit');
    const hasDeletePermission = permissions.includes('orders.delete');
    const hasCreatePermission = permissions.includes('orders.create');

    // Fetch data from server when component mounts
    useEffect(() => {
        const getAllOrders = async () => {
            const response = await fetch(`${baseUrl}/orders?page=${page}&limit=${limit}&search=${search}&sortBy=${sort}&payment_status=${paymentStatus}&order_status=${orderStatus}`);
            const { success, data, totalItem } = await response.json();

            if (success) {
                setOrders(data);
                setTotalPages(totalItem);

            } else {
                console.error("Error fetching data");
            }
        };
        getAllOrders();
    }, [page, limit, search, sort, orderStatus, paymentStatus]);

    // Searching and Filtering 
    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);


    }
    const handleSortBy = (e) => {
        const sort = e.target.value;
        setSort(sort);
    }
    const handleOrderStatus = (e) => {
        const orderStatus = e.target.value;
        setOrderStatus(orderStatus);
    }
    const handlePaymentStatus = (e) => {
        const paymentStatus = e.target.value;
        setPaymentStatus(paymentStatus);
    }
    const handleDelete = (id) => {
        if (hasDeletePermission) {
            fetch(`${baseUrl}/orders/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {

                    toast.success(data.message);
                    setOrders(prevOrders => prevOrders.filter(order => order.order_id !== id));
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to delete order.');
                }

                );
        } else {
            toast.error("You don't have permission");
        }

    };

    const navigate = useNavigate();
    const handleEdit = (order) => {
        // console.log(order.order_id);
        if (hasEditPermission) {
            navigate(`/order-details/${order.order_id}`, { state: { order: order } });
        } else {
            toast.error("You don't have permission");
        }

    }


    const handleReset = () => {
        setSearch("");
        setSort("");
        setOrderStatus("");
        setPaymentStatus("");
        document.getElementById("filter_form").reset();
    }

    const changeDateFormate = (oldDate) => {
        const orderDate = new Date(oldDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        return formattedDate;

    }

    function generateInvoiceId(orderNumber) {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const order = orderNumber.toString().padStart(4, '0');
        const invoiceId = `${year}${month}${day}${order}`;
        // return invoiceId;
        console.log(invoiceId);
    }


    return (
        <div>
            {
                hasViewPermission ? (
                    <div className='text-start '>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Filter</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Filter orders</h6>
                                <form id='filter_form'>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label class="form-label">Invoice Id</label>
                                                <input
                                                    type="text"
                                                    onChange={handleSearch}
                                                    class="form-control"
                                                    placeholder="Invoice Id" />
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="mb-3">
                                                <label class="form-label">Phone Number</label>
                                                <input
                                                    type="text"
                                                    onChange={handleSearch}
                                                    class="form-control"
                                                    placeholder="Phone Number" />
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="mb-3">
                                                <label for="statusSelection" class="form-label">Order Status</label>
                                                <select
                                                    class="form-select"
                                                    onChange={handleOrderStatus}
                                                    id="statusSelection">
                                                    <option selected value='' >Select Status</option>
                                                    <option value='pending' >
                                                        Pending
                                                    </option>
                                                    <option value='processing' >
                                                        Processing
                                                    </option>
                                                    <option value='ready-to-pickup' >
                                                        Ready to pickup
                                                    </option>
                                                    <option value='ontheway' >
                                                        On the way
                                                    </option>
                                                    <option value='delivered' >
                                                        Delivered
                                                    </option>
                                                    <option value='cancelled' >
                                                        Cancelled
                                                    </option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="mb-3">
                                                <label for="statusSelection" class="form-label">Payment Status</label>
                                                <select
                                                    class="form-select"
                                                    id="statusSelection"
                                                    onChange={handlePaymentStatus}
                                                >
                                                    <option selected value=''>Select payment status</option>
                                                    <option value='paid' >
                                                        Paid
                                                    </option>
                                                    <option value='unpaid' >
                                                        UnPaid
                                                    </option>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="mb-3">
                                                <label for="brandSelection" class="form-label">Sort By</label>
                                                <select
                                                    class="form-select"
                                                    id="brandSelection"
                                                    onChange={handleSortBy}
                                                >
                                                    <option selected value=''>Default</option>
                                                    <option value='newest' >
                                                        Latest
                                                    </option>
                                                    <option value='oldest' >
                                                        Oldest
                                                    </option>
                                                    <option value='high_price' >
                                                        High to Low
                                                    </option>
                                                    <option value='low_price' >
                                                        Low to High
                                                    </option>

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
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h6 class="card-title">Orders List</h6>
                                        <div class="col-sm-3">
                                            <div class="mb-3">

                                                <input
                                                    type="text"
                                                    onChange={handleSearch}
                                                    class="form-control"
                                                    placeholder="Search Name" />
                                            </div>
                                        </div>
                                    </div>

                                    <p class="text-muted mb-3"></p>
                                    <div class="table-responsive">
                                        <table class="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Invoice ID</th>
                                                    <th>Date</th>
                                                    <th>Customer</th>
                                                    <th>Phone</th>
                                                    <th>Total </th>
                                                    <th>Payment Status</th>
                                                    <th>Delivery Status</th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders?.map((order, index) =>
                                                        <tr key={order.id}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                {order.order_number}

                                                            </td>
                                                            <td>{changeDateFormate(order.created_at)}</td>
                                                            <td>
                                                                {order.user_name}
                                                            </td>
                                                            <td>
                                                                {order.user_phone}
                                                            </td>
                                                            <td>{order.total}</td>
                                                            <td className='text-success'>{order.payment_status}</td>

                                                            <td className='text-warning'>{order.order_status}</td>

                                                            <td>

                                                                <button type="button" onClick={() => handleEdit(order)} class="btn btn-primary btn-icon me-1">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                </button>
                                                                <button type="button" onClick={() => handleDelete(order.order_id)} class="btn btn-danger btn-icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>

                                                                </button></td>
                                                        </tr>
                                                    )
                                                }

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

export default Orders;