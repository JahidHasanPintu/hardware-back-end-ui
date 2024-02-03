import React, { useState } from 'react';
import { Card,Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../api/AuthContext';
import getBaseUrl from '../BaseURL/getBaseUrl';
// import { ReactComponent as Logo } from './logo.svg';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const baseUrl = getBaseUrl();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
                toast.success("Login Successful");
                const { from } = location.state || { from: { pathname: "/" } };
                navigate(from);
            } else {
                // handle login error
                toast.error("Login Failed")
            }
        } catch (error) {
            console.error(error);
            // handle login error
            toast.error("Login Failed")
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-start">
            <Card style={{ width: '400px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <div className="d-flex justify-content-center mb-3">
                        {/* <Logo width="50" height="50" /> */}
                    </div>
                    <h4 className="text-center mb-4">Login</h4>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                // value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                type="password"
                                // value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="my-4 w-100">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;