import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

const NewUsers = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('customer');
    const [status, setStatus] = useState(false);
    const [userImage, setUserImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value,files} = event.target;

        if (name === 'fullname') {
            setFullName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'phone') {
            setPhone(value);
        }else if (name === 'password') {
            setPassword(value);
          }else if (name === 'address') {
            setAddress(value);
          }else if (name === 'city') {
            setCity(value);
          }else if (name === 'zipcode') {
            setZipcode(value);
          }else if (name === 'country') {
            setCountry(value);
          }else if (name === 'role') {
            setRole(value);
          }else if (name === 'isblocked') {
            setStatus(value);
          }else if (name === 'image') {
            setUserImage(files[0]);
          }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('fullname', fullName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('zipcode', zipcode);
        formData.append('country', country);
        formData.append('role', role);
        formData.append('isblocked', status);
        formData.append('image', userImage);
        
        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/users/create',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);

            toast.success('User created successfully.');
        } catch (error) {
            console.error(error);

            toast.error('Failed to create User.');
        }
    };
    return (
        <div className='text-start'>
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Create a user</h6>

                        <form
                            className="forms-sample row"
                            id="from_input"

                            encType="multipart/form-data"
                            onSubmit={handleSubmit}

                        >
                            <div className="col-md-3">
                                <label for="name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    autocomplete="off"
                                    name="fullname"

                                    placeholder="Enter full name"
                                    value={fullName}

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="name" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    autocomplete="off"
                                    name="phone"

                                    placeholder="Phone Number"
                                    value={phone}

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    autocomplete="off"
                                    name="email"

                                    placeholder="Email address"
                                    value={email}

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    placeholder="Password"
                                    onChange={handleInputChange}

                                />
                                   
                            </div>
                            <div className="col-md-3">
                                <label for="image" className="form-label">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control "
                                    id="image"
                                    name="image"
                                    placeholder="image"
                                    onChange={handleInputChange}

                                />
                            </div>

                            <div className="col-md-3">
                                <label for="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    autocomplete="off"
                                    name="address"

                                    placeholder="Address"
                                    value={address}

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="city" className="form-label">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    autocomplete="off"
                                    name="city"

                                    placeholder="city"
                                    value={city}

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="zipcode" className="form-label">
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zipcode"
                                    autocomplete="off"
                                    name="zipcode"

                                    placeholder="zipcode"
                                    value={zipcode}

                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="country" className="form-label">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    autocomplete="off"
                                    name="country"

                                    placeholder="country"
                                    value={country}

                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label for="role" className="form-label">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    className="form-control"

                                    value={role}
                                    placeholder="role"
                                    onChange={handleInputChange}
                                >
                                    <option value="customer" selected>
                                        Customer
                                    </option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                            

                            <div className="col-md-3">
                                <label for="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    name="isblocked"
                                    id="status"
                                    className="form-control"

                                    value={status}
                                    placeholder="Status"
                                    onChange={handleInputChange}
                                >
                                    <option value="false" selected>
                                        Active
                                    </option>
                                    <option value="true">In Active</option>
                                </select>
                            </div>


                            <div className="form-check col-md-4"></div>
                            <div className="form-check col-md-4"></div>
                            <div className="form-check col-md-4">
                                <button type="submit" className="btn btn-primary me-2 mt-2 justify-content-end">
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

export default NewUsers;