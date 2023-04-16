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
const Layout = () => {
    return (
        <div className='main-wrapper text-left'>
            <Sidebar />
            <div className='page-wrapper text-left'>
                <Navbar />
                <div className="m-3 text-left">
                    <Routes>

                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
                        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>}></Route>
                        <Route path="/edit-cat" element={<PrivateRoute><EditCategories /></PrivateRoute>}></Route>
                        <Route path="/edit-cat/:catID" element={<PrivateRoute><EditCategories /></PrivateRoute>}></Route>
                        <Route path="/create-category" element={<PrivateRoute><NewCategory /></PrivateRoute>}></Route>
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



                    </Routes>

                </div>
            </div>
        </div>
    );
};

export default Layout;