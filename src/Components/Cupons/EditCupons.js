import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useLocation, useNavigate } from 'react-router-dom';

const EditCupons = () => {
    const baseUrl = getBaseUrl();
    const location = useLocation();
    const coupon = location.state.coupon;
    const navigate = useNavigate();
    const [code, setCode] = useState( coupon.code||"");
    const [discount, setDiscount] = useState(coupon.discount|| "");
    const [expire, setExpire] = useState(coupon.expiry_date|| "");
    const [max, setMax] = useState(coupon.max_uses|| "");



    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'code') {
            setCode(value);
        } else if (name === 'discount') {
            setDiscount(value);
        } else if (name === 'expiry_date') {
            setExpire(value);
        } else if (name === 'max_uses') {
            setMax(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                code: code,
                discount: discount,
                expiry_date: expire,
                max_uses: max,
            };

            const response = await axios.put(
                `${baseUrl}/cupons/${coupon.id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data);
            toast.success('Coupon updated successfully.');
            navigate('/cupons')

        } catch (error) {
            console.error(error);

            toast.error('Failed to update coupon.');
        }
    };
    return (
        <div className='text-start'>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Update Coupon</h6>

                            <form
                                className="forms-sample row"
                                id="from_input"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                <div className="col-md-4">
                                    <label for="code" className="form-label">
                                        Coupon Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="code"
                                        autocomplete="off"
                                        name="code"
                                        value={code}
                                        placeholder="coupon code"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label for="discount" className="form-label">
                                        Discount
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="discount"
                                        autocomplete="off"
                                        name="discount"
                                        value={discount}
                                        placeholder="discount"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label for="expiry_date" className="form-label">
                                        Expire Date
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiry_date"
                                        autocomplete="off"
                                        name="expiry_date"
                                        value={expire}
                                        placeholder="Expire date"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label for="max_uses" className="form-label">
                                        Maximum use
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="max_uses"
                                        autocomplete="off"
                                        name="max_uses"
                                        value={max}
                                        placeholder="Max use"
                                        onChange={handleInputChange}
                                    />
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

export default EditCupons;