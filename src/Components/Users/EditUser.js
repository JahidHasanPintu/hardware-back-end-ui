import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import useRoles from '../../hooks/useRoles';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import { useLocation, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [roles] = useRoles();
    const baseUrl = getBaseUrl();
    const { user } = useAuth();
    const location = useLocation();
    const exUser = location.state.user;
    const navigate = useNavigate();

    const permissions = usePermissions(user.role_id);
    const hasCreatePermission = permissions.includes('user.create');

    const [fullName, setFullName] = useState(exUser.fullname||'');
    const [email, setEmail] = useState(exUser.email||'');
    const [phone, setPhone] = useState(exUser.phone||'');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState(exUser.address||'');
    const [zipcode, setZipcode] = useState(exUser.zipcode||'');
    const [city, setCity] = useState(exUser.city||'');
    const [division, setDivision] = useState(exUser.division||'');
    const [upazila, setUpazila] = useState(exUser.upazila||'');
    const [country, setCountry] = useState(exUser.country||'');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState(exUser.status||'');
    const [userImage, setUserImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'fullname') {
            setFullName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'phone') {
            setPhone(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'address') {
            setAddress(value);
        } else if (name === 'city') {
            setCity(value);
        } else if (name === 'division') {
            setDivision(value);
        } else if (name === 'upazila') {
            setUpazila(value);
        } else if (name === 'zipcode') {
            setZipcode(value);
        } else if (name === 'country') {
            setCountry(value);
        } else if (name === 'role') {
            setRole(value);
        } else if (name === 'isblocked') {
            setStatus(value);
        } else if (name === 'image') {
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
        formData.append('division', division);
        formData.append('upazila', upazila);
        formData.append('zipcode', zipcode);
        formData.append('country', country);
        formData.append('role', role);
        formData.append('status', status);
        formData.append('image', userImage);
      
        try {
          const response = await axios.put(
            `${baseUrl}/users/${exUser.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
      
          console.log(response.data);
          toast.success(response.data);
        } catch (error) {
          console.error(error);
          toast.error('Failed to update User.');
        }
      };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('fullname', fullName);
    //     formData.append('email', email);
    //     formData.append('phone', phone);
    //     formData.append('password', password);
    //     formData.append('address', address);
    //     formData.append('city', city);
    //     formData.append('division', division);
    //     formData.append('upazila', upazila);
    //     formData.append('zipcode', zipcode);
    //     formData.append('country', country);
    //     formData.append('role', role);
    //     formData.append('status', status);
    //     formData.append('image', userImage);

    //     const data = {
    //         fullname: fullName ,
    //         email: email,
    //         phone: phone,
    //         password: password,
    //         address: address,
    //         division: division,
    //         city: city,
    //         upazila: upazila,
    //         zipcode: zipcode,
    //         country : country,
    //         status: status,
    //         role: role
    //     }
    //     try {
    //         const response = await axios.put(
    //             `${baseUrl}/users/${exUser.id}`,
    //             data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             }
    //         );

    //         console.log(response.data);

    //         toast.success(response.data);
    //     } catch (error) {
    //         console.error(error);

    //         toast.error('Failed to update User.');
    //     }
    // };
    return (
        <div>
            {
                hasCreatePermission ? (
                    <div className='text-start'>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Update a user</h6>

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
                                                    defaultValue={exUser?.fullname}
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
                                                    defaultValue={exUser.phone}
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
                                                <label for="upazila" className="form-label">
                                                    Upazila
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="upazila"
                                                    autocomplete="off"
                                                    name="upazila"

                                                    placeholder="Upazila"
                                                    value={upazila}

                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label for="city" className="form-label">
                                                    District
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
                                                <label for="division" className="form-label">
                                                    Division
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="division"
                                                    autocomplete="off"
                                                    name="division"

                                                    placeholder="Division"
                                                    value={division}

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
                                                    <option value="" selected>
                                                        Select Role
                                                    </option>
                                                    {roles?.map((role, key) =>
                                                        <option value={role.id} >
                                                            {role.role}
                                                        </option>
                                                    )}

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
                                                    <option value="active" selected>
                                                        Active
                                                    </option>
                                                    <option value="inactive">In Active</option>
                                                    <option value="blocked">Block</option>
                                                </select>
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
                ) : (

                    <p>You don't have permission to view this component.</p>
                )
            }
        </div>

    );
};

export default EditUser;