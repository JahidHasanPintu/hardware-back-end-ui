import React from 'react';

const Invoice = ({orderDetails,products}) => {
    const OrderCreationTime = () => {
        const orderCreatedAt = orderDetails?.created_at;
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
    return (
        <div className="card">
            <div className="card-body">
                <div className="container-fluid d-flex justify-content-between">
                    <div className="col-lg-3 ps-0 text-start">
                        <a href="#" className="noble-ui-logo d-block mt-3">Dutta<span>Hardware</span></a>
                        <p className="mt-1 mb-1"><b>Ocean of Hardware</b></p>
                        <p>108,<br />Dutta Street,<br />Rajbari, Dhaka Division BD.</p>
                        <h5 className="mt-5 mb-2 text-muted">Invoice to :</h5>
                        <p>{orderDetails?.user_info.fullname}<br />{orderDetails?.user_info.phone},<br />{orderDetails?.user_info.email}</p>
                    </div>
                    <div className="col-lg-3 pe-0">
                        <h4 className="fw-bolder text-uppercase text-end mt-4 mb-2">invoice</h4>
                        <h6 className="text-end mb-5 pb-4">#{orderDetails?.order_number}</h6>
                        <p className="text-end mb-1">Total Amount</p>
                        <h4 className="text-end fw-normal">৳ {orderDetails?.payment_details.total}</h4>
                        <p className="text-end mb-1">Status</p>
                        <h4 className="text-end fw-normal">{orderDetails?.payment_details.payment_status}</h4>
                        <h6 className="mb-0 mt-3 text-end fw-normal mb-2"><span className="text-muted"> Date :</span> {OrderCreationTime()}</h6>
                       
                    </div>
                </div>
                <div className="container-fluid mt-5 d-flex justify-content-center w-100">
                  <div className="table-responsive w-100">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>Description</th>
                              <th>Color</th>
                              <th>Size</th>
                              <th className="text-end">Quantity</th>
                              <th className="text-end">Unit cost</th>
                              <th className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                    products?.map((product, index) =>

                                    <tr  key={product.product_id} className="text-end">
                                    <td className="text-start">{index+1}</td>
                                    <td className="text-start">{product?.product_name}</td>
                                    <td className="text-start">{product?.color ? product.color : 'N/A'}</td>
                                    <td className="text-start">{product?.size? product.size : 'N/A'}</td>
                                    <td> {product?.quantity}</td>
                                    <td>৳{product?.price}</td>
                                    <td>৳{product?.price * product?.quantity}</td>
                                  </tr>
                                    )
                                }
                         
                        </tbody>
                      </table>
                    </div>
                </div>
                <div className="container-fluid mt-5 w-100">
                  <div className="row">
                    <div className="col-md-6 ms-auto">
                        <div className="table-responsive">
                          <table className="table">
                              <tbody>
                                <tr>
                                  <td className="text-start">Sub Total</td>
                                  <td className="text-end">৳ {orderDetails?.payment_details.subtotal}</td>
                                </tr>
                                <tr>
                                  <td className="text-start">Shipping</td>
                                  <td className="text-end">৳ {orderDetails?.payment_details.shipping} </td>
                                </tr>
                                <tr>
                                  <td className="text-start">Discount</td>
                                  <td className="text-danger text-end">(-) ৳ {orderDetails?.payment_details.discount}</td>
                                </tr>
                                <tr className="bg-light">
                                  <td className="text-bold-800 text-start">Total</td>
                                  <td className="text-bold-800 text-end">৳ {orderDetails?.payment_details.total}</td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid w-100">
                  <a href="javascript:;" className="btn btn-primary float-end mt-4 ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-send me-3 icon-md"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>Send Invoice</a>
                  <a href="javascript:;" className="btn btn-outline-primary float-end mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-printer me-2 icon-md"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>Print</a>
                </div>
              
            </div>
        </div>
    );
};

export default Invoice;