import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../api/AuthContext';
import usePermissions from '../../../hooks/usePermissions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faBriefcase, faChartLine, faChevronDown, faColumns, faCircleDollarToSlot, faGear, faLayerGroup, faLinesLeaning, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { user } = useAuth();
  const permissions = usePermissions(user.role_id);
  const hasBrandPermission = permissions.includes('brands.view');
  const hasCatPermission = permissions.includes('categories.view');
  const hasSettingPermission = permissions.includes('settings.view');
  const hasOrderPermission = permissions.includes('orders.view');
  const hasProductPermission = permissions.includes('products.view');
  const hasSubCatPermission = permissions.includes('subcategories.view');
  const hasUserPermission = permissions.includes('user.view');
  const hasCuponsPermission = permissions.includes('coupons.view');
  return (
    <div className='text-start'>
      <nav className="sidebar overflow-auto">
        <div className="sidebar-header">
          <a href="/" className="sidebar-brand">
            Dutta<span>Hardware</span>
          </a>
          <div className="sidebar-toggler not-active">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="sidebar-body text-left">
          <ul className="nav">
            <li className="nav-item nav-category">Main</li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                <FontAwesomeIcon icon={faChartLine} className="link-icon" />
                <span className="link-title">Dashboard</span>
              </Link>
            </li>
            {hasOrderPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#orders" role="button" aria-expanded="false" aria-controls="orders">
                  <FontAwesomeIcon icon={faLinesLeaning} className="link-icon" />
                  <span className="link-title">Orders</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="orders">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                     
                      <NavLink to="/orders" className="nav-link">All Orders</NavLink>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink to="" className="nav-link">New Order</NavLink>
                    </li> */}

                  </ul>
                </div>
              </li>
            )}

            <li className="nav-item nav-category text-left">Inventory</li>
            {hasProductPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#emails" role="button" aria-expanded="false" aria-controls="emails">
                  <FontAwesomeIcon icon={faBox} className="link-icon" />
                  <span className="link-title">Products</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="emails">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      {/* <Link to = "/home">Home</Link> */}
                      <NavLink to="/products" className="nav-link">All Products</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="create-product" className="nav-link">Add New Product</NavLink>
                    </li>

                  </ul>
                </div>
              </li>
            )}

            {hasBrandPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#brands" role="button" aria-expanded="false" aria-controls="brands">
                  <FontAwesomeIcon icon={faBriefcase} className="link-icon" />
                  <span className="link-title">Brands</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="brands">
                  <ul className="nav sub-menu">
                    <li className="nav-item">

                      <NavLink to="/brands" className="nav-link">All Brands</NavLink>

                    </li>
                    <li className="nav-item">
                      <NavLink to="/create-brand" className="nav-link">Add New Brand</NavLink>
                    </li>

                  </ul>
                </div>
              </li>
            )}

            {hasCatPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#catgories" role="button" aria-expanded="false" aria-controls="catgories">
                  <FontAwesomeIcon icon={faLayerGroup} className="link-icon" />
                  <span className="link-title">Categories</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="catgories">
                  <ul className="nav sub-menu">
                    <li className="nav-item">

                      <NavLink to="/categories" className="nav-link">All Categories</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/create-category" className="nav-link">Add New Categories</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}


            {hasSubCatPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#subcatgories" role="button" aria-expanded="false" aria-controls="subcatgories">
                  <FontAwesomeIcon icon={faColumns} className="link-icon" />
                  <span className="link-title">Sub Categories</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="subcatgories">
                  <ul className="nav sub-menu">
                    <li className="nav-item">

                      <NavLink to="/subcategories" className="nav-link">All SubCategories</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/create-subcategories" className="nav-link">Add New SubCategories</NavLink>
                    </li>

                  </ul>
                </div>
              </li>
            )}

            {hasCuponsPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#cupons" role="button" aria-expanded="false" aria-controls="cupons">
                  <FontAwesomeIcon icon={faCircleDollarToSlot} className="link-icon" />
                  <span className="link-title">Cupons</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="cupons">
                  <ul className="nav sub-menu">
                    <li className="nav-item">

                      <NavLink to="/cupons" className="nav-link">All Cupons</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/create-cupons" className="nav-link">Add New Cupons</NavLink>
                    </li>

                  </ul>
                </div>
              </li>
            )}



            {hasUserPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#users" role="button" aria-expanded="false" aria-controls="users">
                  <FontAwesomeIcon icon={faUser} className="link-icon" />
                  <span className="link-title">Users</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="users">
                  <ul className="nav sub-menu">
                    <li className="nav-item">

                      <NavLink to="/users" className="nav-link">All Users</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/create-user" className="nav-link">Add New User</NavLink>
                    </li>

                  </ul>
                </div>
              </li>
            )}

            {hasSettingPermission && (
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#settings" role="button" aria-expanded="false" aria-controls="settings">
                  <FontAwesomeIcon icon={faGear} className="link-icon" />
                  <span className="link-title">Setting</span>
                  <FontAwesomeIcon icon={faChevronDown} className="link-arrow" />
                </a>
                <div className="collapse" id="settings">
                  <ul className="nav sub-menu">
                    <li className="nav-item">

                      <NavLink to="/roles" className="nav-link">Roles</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/permissions" className="nav-link">Permission</NavLink>
                    </li>

                  </ul>
                </div>
              </li>
            )}

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;