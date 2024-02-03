import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../../BaseURL/getBaseUrl';
import { toast } from 'react-toastify';
import Invoice from '../Invoice/Invoice';
const OrderDetails = () => {
    const baseUrl = getBaseUrl();
    const location = useLocation();
    const order = location.state.order;
    const [products, setProducts] = useState(null);
    const orderID = order.order_id;
    const [comments, setComments] = useState("");
    const [orderStatus, setOrderStatus] = useState(order.order_status || "");


    const OrderCreationTime = () => {
        const orderCreatedAt = order.created_at;
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const formattedDate = new Date(orderCreatedAt).toLocaleString('en-US', options);

        return formattedDate;
    };

    const [user, setUser] = useState(null);
    const [oderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/orders/${orderID}`);
                setOrderDetails(response.data.data);
                setProducts(response.data.data.items);
                setPaymentStatus(response.data.data.payment_details.payment_status);

                // Set the default value for comments if it exists in oderDetails
                if (response.data.data.comments) {
                    setComments(response.data.data.comments);
                }

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchOrderDetails();
    }, [baseUrl, orderID]);

    const handleOrderStatus = (e) => {
        const status = e.target.value;
        setOrderStatus(status);

    }
    const [paymentStatus, setPaymentStatus] = useState(oderDetails?.payment_details.payment_status || " ");

    useEffect(() => {
        if (oderDetails) {
            setPaymentStatus(oderDetails.payment_details.payment_status);
        }
    }, [oderDetails]);
    console.log(paymentStatus);
    const handlePaymentStatus = (e) => {
        const status = e.target.value;
        setPaymentStatus(status);

    }

    const handleCommentChange = (event) => {
        setComments(event.target.value);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `${baseUrl}/orders/${orderID}`,
                { comments, orderStatus, paymentStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data);

            toast.success('Updated successfully.');
        } catch (error) {
            console.error(error);

            toast.error('Failed to update details.');
        }
    };


    return (
        <div className=''>
            <nav class="navbar navbar-light bg-white w-100 h-auto" style={{ left: '0px' }}>
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1 text-start p-1"><span className='fw-bold'>
                        Order <span className='text-info text-bold'>#{oderDetails?.order_number}</span>
                    </span>
                        <br />
                        <small className="text-muted fs-6">{OrderCreationTime()}</small></span>
                    <div>
                        {/* <button type="button" class="btn btn-primary"><i className="link-icon text-white" data-feather="download"></i> Download</button> */}
                        <button onClick={handleUpdate} type="button" class="btn btn-primary ms-2"><i className="link-icon text-white" data-feather="download"></i> Update</button>
                    </div>

                </div>
            </nav>

            <div class=" mt-2">
                <div class="row gx-2">
                    <div class="col-8">
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title text-start">Orderded Items</h5> <hr />
                                {
                                    products?.map((product, index) =>
                                        <div class="row mt-2" key={product.product_id}>
                                            <div class="col-6 d-flex">
                                                <img src={product?.image_url} className='me-4' style={{ width: '50px', height: '50px' }} alt='' />
                                                <div className='text-start'>
                                                    <p className='text-bold'>{product?.product_name}</p>
                                                    <p>Color: {product?.color} Size: {product?.size}</p>

                                                </div>
                                            </div>
                                            {/* <div class="col-3">
                                        
                                        </div> */}
                                            <div class="col-3"><span style={{ fontSize: '1.5em' }}>৳</span> {product?.price} x {product?.quantity}</div>
                                            <div class="col-3"><span style={{ fontSize: '1.5em' }}>৳</span> {product?.price * product?.quantity}</div>

                                        </div>
                                    )
                                }


                                <hr />
                                <div class="row">
                                    <div class="col-4 fw-bold">
                                        Order Note
                                    </div>

                                    <div class="col-8">{oderDetails?.order_notes}</div>

                                </div>

                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title text-start">Customer Details</h5> <hr />
                                <div class="row mt-2">
                                    <div class="col-6 d-flex">
                                        <i className="link-icon" data-feather="user"></i>
                                        <p className='ms-2'>{oderDetails?.user_info.fullname}</p>
                                    </div>
                                    <div class="col-6 d-flex">
                                        <i className="link-icon" data-feather="phone"></i>
                                        <p className='ms-2'>{oderDetails?.user_info.phone}</p>
                                    </div>

                                </div>
                                <div class="row mt-2">
                                    <div class="col-6 d-flex">
                                        <i className="link-icon" data-feather="mail"></i>

                                        <p className='ms-2'>{oderDetails?.user_info.email}</p>
                                    </div>
                                    <div class="col-6 d-flex">
                                        <FontAwesomeIcon icon="fa-solid fa-user" />
                                        <p className='ms-2'>{oderDetails?.user_info.zipcode}</p>
                                    </div>

                                </div>
                                <div class="row mt-2">
                                    <div class="col-6 d-flex">
                                        <i className="link-icon" data-feather="map-pin"></i>
                                        <p className='ms-2'>{oderDetails?.user_info.address}</p>
                                    </div>
                                    <div class="col-6 d-flex">
                                        <FontAwesomeIcon icon="fa-solid fa-user" />
                                        <p className='ms-2'>{oderDetails?.user_info.city}</p>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <div class="card">
                                    <div class="card-body text-start fw-bold">
                                        <h5 class="card-title ">Payment Summary</h5> <hr />

                                        <div class="row">
                                            <div class="col-8 fw-bold">
                                                Subtotal
                                            </div>
                                            <div class="col-4"><span style={{ fontSize: '1.5em' }}>৳</span> {oderDetails?.payment_details.subtotal} </div>
                                            {/* <div class="col-4"><span style={{ fontSize: '1.5em' }}>৳</span>  {order.subtotal} </div> */}

                                        </div>
                                        <div class="row">
                                            <div class="col-8 fw-bold">
                                                Shipping
                                            </div>
                                            {/* <div class="col-4"> <span style={{ fontSize: '1.5em' }}>৳</span> {order.shippingcharge} </div> */}
                                            <div class="col-4"><span style={{ fontSize: '1.5em' }}>৳</span> {oderDetails?.payment_details.shipping} </div>

                                        </div>
                                        {/* <div class="row">
                                            <div class="col-8 fw-bold">
                                                Tax - 2.5%
                                            </div>
                                            <div class="col-4"> <span style={{ fontSize: '1.5em' }}>৳</span>  25 </div>

                                        </div> */}
                                        <div class="row">
                                            <div class="col-8 fw-bold">
                                                Coupon
                                            </div>
                                            <div class="col-4">
                                            <span style={{ fontSize: '1.5em' }}>৳</span> {oderDetails?.payment_details.discount}
                                            </div>

                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-8 fw-bold">
                                                Total
                                            </div>
                                            {/* <div class="col-4"> <span style={{ fontSize: '1.5em' }}>৳</span> {order.total} </div> */}
                                            <div class="col-4"><span style={{ fontSize: '1.5em' }}>৳</span> {oderDetails?.payment_details.total} </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <div class="card">
                                    <div class="card-body text-start fw-bold">
                                        <h5 class="card-title ">Order Status</h5> <hr />

                                        <div class="row">
                                            <div class="col-6 fw-bold">
                                                Payment Status
                                            </div>
                                            <div class="col-6 text-warning">
                                                <select
                                                    onChange={handlePaymentStatus}
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    value={paymentStatus} // Use the value prop to control selected option
                                                >
                                                    <option value="unpaid">Unpaid</option>
                                                    <option value="paid">Paid</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-6 fw-bold">
                                                Payment Type
                                            </div>
                                            <div class="col-6">
                                                {oderDetails?.payment_details.payment_method === 'bkash_payment' && 'BKash'}
                                                {oderDetails?.payment_details.payment_method === 'direct_bank_transfer' && 'Bank Transfer'}
                                                {oderDetails?.payment_details.payment_method === 'cash_on_delivery' && 'Cash On Delivery'}
                                            </div>



                                        </div>
                                        <div class="row">
                                            <div class="col-6 fw-bold">
                                                Order Status
                                            </div>
                                            <div className="col-6">
                                                <select
                                                    onChange={handleOrderStatus}
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    defaultValue={orderStatus} // Set the default value based on the orderStatus state
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="preparing">Preparing</option>
                                                    <option value="readytopickup">Ready to Pickup</option>
                                                    <option value="ontheway">On the Way</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value='cancelled' >
                                                        Cancelled
                                                    </option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mb-2'>
                            <div className='col-12'>
                                <div class="card">
                                    <div class="card-body text-start fw-bold">
                                        <h5 class="card-title ">Order Comments</h5> <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-12">
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    cols="50"
                                                    value={comments}
                                                    // defaultValue={OrderDetails?.comments}
                                                    onChange={handleCommentChange}
                                                ></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mb-2'>
                            <div className='col-12'>
                                <div class="card">
                                    <div class="card-body text-start fw-bold">
                                        <h5 class="card-title ">Delivery Address</h5> <hr />
                                        <div className='d-flex'>
                                            <i className="link-icon" data-feather="phone"></i>

                                            <p className='ms-2'>Phone: {oderDetails?.user_info.phone}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <i className="link-icon" data-feather="mail"></i>

                                            <p className='ms-2'>Email: {oderDetails?.user_info.email}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <i className="link-icon" data-feather="map-pin"></i>
                                            <p className='ms-2'>Address: {oderDetails?.user_info.address}</p>

                                        </div>
                                        <div className='d-flex'>
                                            <p className='ms-2 me-5'>Thana: {oderDetails?.user_info.upazila}</p>
                                            <p className='ms-2'>Zipcode: {oderDetails?.user_info.zipcode}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <p className='ms-2 me-5'>City: {oderDetails?.user_info.city}</p>
                                            <p className='ms-4'>Division: {oderDetails?.user_info.division}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Invoice orderDetails={oderDetails} products = {products} /> */}

        </div>
    );
};

export default OrderDetails;