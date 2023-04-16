import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useBrand from '../../hooks/useBrand';
import useCategories from '../../hooks/useCategories';
import useSubCategories from '../../hooks/useSubCategories';

const NewProducts = () => {
    const [categories] =useCategories();
    const [subCategories] =useSubCategories();
    const [brands] =useBrand();

    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQunatity, setProductQunatity] = useState('');
    const [productCat, setProductCat] = useState('');
    const [subCat, setSubCat] = useState('');
    const [brand, setBrand] = useState('');
    const handleInputChange = (event) => {
      const { name, value, files } = event.target;
  
      if (name === 'name') {
        setProductName(value);
      } else if (name === 'images') {
        setProductImage(files[0]);
      } else if (name === 'description') {
        setProductDescription(value);
      } else if (name === 'price') {
        setProductPrice(value);
      }
       else if (name === 'quantity') {
        setProductQunatity(value);
      }else if (name === 'cat_id') {
        setProductCat(value);
      }else if (name === 'brand_id') {
        setBrand(value);
      }else if (name === 'subcat_id') {
        setSubCat(value);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('images', productImage);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('quantity', productQunatity);
      formData.append('cat_id', productCat);
      formData.append('brand_id', brand);
      formData.append('subcat_id', subCat);
  
      try {
        const response = await axios.post(
          'http://localhost:5000/api/v1/products/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        console.log(response.data);
  
        toast.success('Product created successfully.');
      } catch (error) {
        console.error(error);
  
        toast.error('Failed to create product.');
      }
    };
    return (
        <div className='text-start '>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Upload Product</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Add new product</h6>
                    <form
                    id="from_input"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    >
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input
                                    name='name'
                                    onChange={handleInputChange} 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Product name" />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Category</label>
                                    <select 
                                    name='cat_id'
                                    onChange={handleInputChange}
                                    class="form-select" 
                                    id="statusSelection">
                                        <option selected disabled>Select Category</option>
                                        {categories?.map((category, key) =>
                                        <option value={category.cat_id} >
                                        {category.cat_name}
                                    </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Sub Category</label>
                                    <select 
                                    name='subcat_id'
                                    onChange={handleInputChange}
                                    class="form-select" 
                                    id="statusSelection">
                                        <option selected disabled>Select Subcategories</option>
                                        {subCategories?.map((subCategory, key) =>
                                        <option value={subCategory.subcat_id} >
                                        {subCategory.subcat_name}
                                    </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label 
                                    for="brandSelection" 
                                    class="form-label">Brand</label>
                                    <select 
                                    class="form-select" 
                                    name={"brand_id"}
                                    onChange={handleInputChange}
                                    id="brandSelection">
                                        <option selected disabled>Select Brand</option>
                                        {brands?.map((brand, key) =>
                                        <option value={brand.brand_id} >
                                        {brand.brand_name}
                                    </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        

                        <div class="row">
                            
                        <div className="col-md-3">
                        <label for="image" className="form-label">
                            Image
                        </label>
                        <input
                        onChange={handleInputChange}
                            type="file"
                            className="form-control"
                            id="image"
                            name="images"
                            placeholder="images"
                            multiple
                        />
                        </div>
                        <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Price</label>
                                    <input
                                    onChange={handleInputChange} name='price' type="number" class="form-control" placeholder="eg: $25" />
                                </div>
                            </div>
                        <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Quantiy</label>
                                    <input
                                    name='quantity'
                                    onChange={handleInputChange}
                                     type="number" class="form-control"
                                      placeholder="eg: 52" />
                                </div>
                            </div>

                        {/* <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Status</label>
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Status</option>
                                        <option value={"active"}>Active</option>
                                        <option value={"inactive"}>Inactive</option>
                                    </select>
                                </div>
                            </div> */}
                        </div>
                        <div class="row">
					<div class="col-md-12 grid-margin stretch-card">
						<div class="card">
							<div class="card-body">
								<h4 class="card-title">Product Description</h4>
								<p class="text-muted mb-3">Details</p>
								<textarea 
                                class="form-control" 
                                onChange={handleInputChange}
                                name="description" 
                                id="easyMdeExample" 
                                rows="10"></textarea>
							</div>
						</div>
					</div>
				</div>
                <button type="submit" class="btn btn-primary submit">
                        submit
                    </button>
                    </form>
                    
                </div>
            </div>


        </div>
    );
};

export default NewProducts;