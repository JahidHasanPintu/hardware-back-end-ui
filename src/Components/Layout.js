import React from 'react';
// import Dashboard from './Dashboard/Dashboard';
import Navbar from './Shared/Navbar/Navbar';
import Sidebar from './Shared/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
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
const Layout = () => {
    return (
        <div className='main-wrapper text-left'>
            <Sidebar/>
            <div className='page-wrapper text-left'>
                <Navbar/>
                <div className="page-content text-left">
                <Routes>
        
                {/* <Route path="/" element={<Dashboard/>}></Route> */}
                <Route path="/categories" element={<Categories/>}></Route>
                <Route path="/edit-cat" element={<EditCategories />}></Route>
                <Route path="/edit-cat/:catID" element={<EditCategories />}></Route>
                <Route path="/create-category" element={<NewCategory/>}></Route>
                <Route path="/brands" element={<Brands/>}></Route>
                <Route path="/edit-brand" element={<EditBrand/>}></Route>
                <Route path="/edit-brand/:BrandID" element={<EditBrand/>}></Route>
                <Route path="/create-brand" element={<NewBrand/>}></Route>
                <Route path="/subcategories" element={<Subcategories/>}></Route>
                <Route path="/edit-subcategory" element={<EditSubCategory/> }></Route>
                <Route path="/edit-subcategory/:subcatID" element={<EditSubCategory/> }></Route>
                <Route path="/create-subcategories" element={<NewSubcategories/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
                <Route path="/edit-products" element={<EditProducts/>}></Route>
                <Route path="/edit-products/:productID" element={<EditProducts/>}></Route>
                <Route path="/create-product" element={<NewProducts/>}></Route>
                <Route path="/users" element={<Users/>}></Route>
                <Route path="/create-user" element={<NewUsers/>}></Route>
                
                </Routes>
                    
                </div>
            </div>
        </div>
    );
};

export default Layout;