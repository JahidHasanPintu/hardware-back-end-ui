import React from 'react';
// import Dashboard from './Dashboard/Dashboard';
import Navbar from './Shared/Navbar/Navbar';
import Sidebar from './Shared/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Categories from './Categories/Categories';
import NewCategory from './Categories/NewCategory';
import Brands from './Brands/Brands';
import NewBrand from './Brands/NewBrand';
import Subcategories from './Subcategories/Subcategories';
import NewSubcategories from './Subcategories/NewSubcategories';
import Products from './Products/Products';
import NewProducts from './Products/NewProducts';
import Users from './Users/Users';
import NewUsers from './Users/NewUsers';
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
                <Route path="/create-category" element={<NewCategory/>}></Route>
                <Route path="/brands" element={<Brands/>}></Route>
                <Route path="/create-brand" element={<NewBrand/>}></Route>
                <Route path="/subcategories" element={<Subcategories/>}></Route>
                <Route path="/create-subcategories" element={<NewSubcategories/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
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