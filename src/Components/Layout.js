import React from 'react';
// import Dashboard from './Dashboard/Dashboard';
import Navbar from './Shared/Navbar/Navbar';
import Sidebar from './Shared/Sidebar/Sidebar';
import {Route, Routes } from 'react-router-dom';
import Categories from './Categories/Categories';
import NewCategory from './Categories/NewCategory';
import EditCategories from './Categories/EditCategories';
import Brands from './Brands/Brands';
import NewBrand from './Brands/NewBrand';
import Subcategories from './Subcategories/Subcategories';
import EditSubCategory from './Subcategories/EditSubCategory';
import NewSubcategories from './Subcategories/NewSubcategories';
import Products from './Products/Products';
import EditProducts from './Products/EditProducts';
import NewProducts from './Products/NewProducts';
import Users from './Users/Users';
import NewUsers from './Users/NewUsers';
import EditBrand from './Brands/EditBrand';
import Dashboard from './Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Orders from './Orders/Orders';
import OrderDetails from './Orders/OrderDetails/OrderDetails';
import Roles from './Roles/Roles';
import Permission from './Permission/Permission';
import NewRole from './Roles/NewRole';
import { useAuth } from '../api/AuthContext';
import Cupons from './Cupons/Cupons';
import EditCupons from './Cupons/EditCupons';
import NewCupons from './Cupons/NewCupons';
import EditUser from './Users/EditUser';
import EditRoles from './Roles/EditRoles';
const Layout = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className='main-wrapper text-left'>
            <PrivateRoute><Sidebar /></PrivateRoute>
            
            <div className='page-wrapper text-left'>
                <Navbar />
                <div className="m-3 text-left">
                    <Routes>

                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
                        
                        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>}></Route>
                        <Route path="/edit-cat" element={<PrivateRoute><EditCategories /></PrivateRoute>}></Route>
                        <Route path="/edit-cat/:catID" element={<PrivateRoute><EditCategories /></PrivateRoute>}></Route>
                        <Route path="/create-category" element={<PrivateRoute><NewCategory /></PrivateRoute>}></Route>

                        <Route path="/cupons" element={<PrivateRoute><Cupons /></PrivateRoute>}></Route>
                        <Route path="/edit-cupons" element={<PrivateRoute><EditCupons /></PrivateRoute>}></Route>
                        <Route path="/edit-cupons/:cuponID" element={<PrivateRoute><EditCupons /></PrivateRoute>}></Route>
                        <Route path="/create-cupons" element={<PrivateRoute><NewCupons /></PrivateRoute>}></Route>

                        <Route path="/brands" element={<PrivateRoute><Brands /></PrivateRoute>}></Route>
                        <Route path="/edit-brand" element={<PrivateRoute><EditBrand /></PrivateRoute>}></Route>
                        <Route path="/edit-brand/:BrandID" element={<PrivateRoute><EditBrand /></PrivateRoute>}></Route>
                        <Route path="/create-brand" element={<PrivateRoute><NewBrand /></PrivateRoute>}></Route>
                        <Route path="/subcategories" element={<PrivateRoute><Subcategories /></PrivateRoute>}></Route>
                        <Route path="/edit-subcategory" element={<PrivateRoute><EditSubCategory /></PrivateRoute>}></Route>
                        <Route path="/edit-subcategory/:subcatID" element={<PrivateRoute><EditSubCategory /></PrivateRoute>}></Route>
                        <Route path="/create-subcategories" element={<PrivateRoute><NewSubcategories /></PrivateRoute>}></Route>
                        <Route path="/products" element={<PrivateRoute><Products /> </PrivateRoute>}></Route>
                        <Route path="/edit-products" element={<PrivateRoute><EditProducts /></PrivateRoute>}></Route>
                        <Route path="/edit-products/:productID" element={<PrivateRoute><EditProducts /></PrivateRoute>}></Route>
                        <Route path="/create-product" element={<PrivateRoute><NewProducts /></PrivateRoute>}></Route>

                        <Route path="/users" element={<PrivateRoute><Users/> </PrivateRoute>}></Route>
                        <Route path="/create-user" element={<PrivateRoute><NewUsers /></PrivateRoute>}></Route>
                        <Route path="/edit-user" element={<PrivateRoute><EditUser /></PrivateRoute>}></Route>
                        <Route path="/edit-user/:userID" element={<PrivateRoute><EditUser /></PrivateRoute>}></Route>


                        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>}></Route>
                        <Route path="/order-details" element={<PrivateRoute><OrderDetails /></PrivateRoute>}></Route>
                        <Route path="/order-details/:orderID" element={<PrivateRoute><OrderDetails /></PrivateRoute>}></Route>
                        
                        <Route path="/roles" element={<PrivateRoute><Roles /></PrivateRoute>}></Route>
                        <Route path="/new-roles" element={<PrivateRoute><NewRole /></PrivateRoute>}></Route>
                        <Route path="/edit-roles" element={<PrivateRoute><EditRoles /></PrivateRoute>}></Route>
                        <Route path="/edit-roles/:roleID" element={<PrivateRoute><EditRoles /></PrivateRoute>}></Route>

                        <Route path="/permissions" element={<PrivateRoute><Permission /></PrivateRoute>}></Route>



                    </Routes>

                </div>
            </div>
        </div>
    );
};

export default Layout;