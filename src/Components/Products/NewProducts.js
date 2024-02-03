import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useBrand from '../../hooks/useBrand';
import useCategories from '../../hooks/useCategories';
import useSubCategories from '../../hooks/useSubCategories';
import getBaseUrl from '../BaseURL/getBaseUrl';
import { useAuth } from '../../api/AuthContext';
import usePermissions from '../../hooks/usePermissions';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';


const NewProducts = () => {
  const baseUrl = getBaseUrl();
  const { user } = useAuth();
  const permissions = usePermissions(user.role_id);
  const hasCreatePermission = permissions.includes('products.create');
  const [categories] = useCategories(1,200,'','');
  const [catId, setCatId] = useState('');
  const [subCategories] = useSubCategories(1,200,'','',catId);
  const [brands] = useBrand(1,200);

  const [productName, setProductName] = useState('');
 
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [productQunatity, setProductQunatity] = useState('');
  const [productCat, setProductCat] = useState('');
  const [subCat, setSubCat] = useState('');
  const [brand, setBrand] = useState('');
  const [status, setStatus] = useState('');
  const [sku, setSku] = useState('');
  const [warranty, setWarranty] = useState('');
  const [isOffer, setIsOffer] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleInputChange = (event) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const imageFiles = Array.from(input.files);
      const imagePreviewsArray = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const reader = new FileReader();

        reader.onload = function (e) {
          const imagePreviewData = {
            id: file.name + i, // Using a unique identifier for each image
            src: e.target.result,
          };
          setImagePreviews((prevImagePreviews) => [...prevImagePreviews, imagePreviewData]);
        };

        reader.readAsDataURL(file);
      }
    }


    const { name, value, files } = event.target;

    if (name === 'product_name') {
      setProductName(value);
    } else if (name === 'images') {
      setProductImage(files[0]);
    } else if (name === 'description') {
      setProductDescription(value);
    } else if (name === 'price') {
      setProductPrice(value);
    } else if (name === 'old_price') {
      setOldPrice(value);
    }
    else if (name === 'quantity') {
      setProductQunatity(value);
    } else if (name === 'cat_id') {
      setProductCat(value);
      setCatId(value);
    } else if (name === 'brand_id') {
      setBrand(value);
    } else if (name === 'subcat_id') {
      setSubCat(value);
    } else if (name === 'status') {
      setStatus(value);
    } else if (name === 'sku') {
      setSku(value);
    } else if (name === 'warranty') {
      setWarranty(value);
    } else if (name === 'offer') {
      setIsOffer(value);
    }
  };

  const handleRemoveImage = (id) => {
    setImagePreviews((prevImagePreviews) => prevImagePreviews.filter((img) => img.id !== id));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('images', productImage);
    formData.append('description', content);
    formData.append('price', productPrice);
    formData.append('old_price', oldPrice);
    formData.append('quantity', productQunatity);
    formData.append('cat_id', productCat);
    formData.append('brand_id', brand);
    formData.append('subcat_id', subCat);
    formData.append('sku', sku);
    formData.append('warranty', warranty);
    formData.append('offer', isOffer);
    formData.append('status', status);

    // Convert variations array to a JSON string
    const variationsJson = JSON.stringify(variations);
    const sizesJson = JSON.stringify(sizes);
    // Append the variations JSON string to the form data
    formData.append('variations', variationsJson);
    formData.append('sizes', sizesJson);
    console.log(formData);
    try {
      const response = await axios.post(
        `${baseUrl}/products/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const productId = response.data.productId;
      
      
      variations.forEach(async (variation, index) => {
        const variationsFormData = new FormData();
        variationsFormData.append('product_id', productId);
        variationsFormData.append('color', variation.color);
        variationsFormData.append('quantity', variation.quantity);
        variationsFormData.append('price', variation.price);
        variationsFormData.append('images', variation.image);
        const responseVariations  = await axios.post(
          `${baseUrl}/products/variation/create`,
          variationsFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );


         // Assuming variation.image is the image file
      });
      
  
      

      console.log(response.data);

      toast.success('Product created successfully.');
    } catch (error) {
      console.error(error);

      toast.error('Failed to create product.');
    }
  };


  //  Text editor start from here 

  const editorStyle = {
    height: '400px',
    width: '100%',
  };

  const [content, setContent] = useState('');

  // Parent container style with height and width
  const parentContainerStyle = {
    height: '500px', // Set the desired height for the parent container
    width: '100%',
  };

  // Add custom formats for text color
  const ColorStyle = Quill.import('attributors/style/color');
  Quill.register(ColorStyle, true);

  // Add custom formats for bullet styles
  const Block = Quill.import('blots/block');
  Block.tagName = 'P';
  Quill.register(Block, true);


  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // Default formatting options
    [{ color: [] }], // Text color dropdown
    ['blockquote', 'code-block'], // Blockquote and code block
    [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and bullet lists
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
    ['image'], // Image insertion
    ['clean'], // Remove formatting
  ];

  //  Text Editor Ends Here 


  const [variations, setVariations] = useState([]);
  const [sizes, setSizes] = useState([]);

  // Function to handle adding a new variation
  const addSize = () => {
    const newSize = {
      size: '',
      quantity: 0,
    };
    setSizes([...sizes, newSize]);
  };
  const addVariation = () => {
    const newVariation = {
      color: '',
      quantity: 0,
      price: 0,
      images: null, // Initialize image with null or any default value
    };
    setVariations([...variations, newVariation]);
  };

  // Function to handle removing a variation
  const removeSize = (index) => {
    const updatedSize = [...sizes];
    updatedSize.splice(index, 1);
    setSizes(updatedSize);
  };
  const removeVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  // Function to handle changes to a variation's properties
  const handleSizeChange = (index, property, value) => {
    const updatedSize = [...sizes];
    updatedSize[index][property] = value;
    setSizes(updatedSize);
  };
  const handleVariationChange = (index, property, value) => {
    const updatedVariations = [...variations];
    if (property === 'image') {
      updatedVariations[index][property] = value; // Assuming 'value' is the file object
    } else {
      updatedVariations[index][property] = value;
    }
    setVariations(updatedVariations);
  };



  return (
    <div>
      {
        hasCreatePermission ? (
          <div className='text-start '>

            <form
              id="from_input"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div class="card top-bar mb-2">
                <div class="card-body d-flex justify-content-between">
                  <div className='title'>
                    <h5 class="card-title">Upload Product</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Add new product</h6>
                  </div>
                  <div className='publish-button'>
                    <button type="submit" class="btn btn-primary submit">
                      Publish
                    </button>
                  </div>
                </div>
              </div>

              <div className='product-details d-flex justify-content-center'>
                <div class="card left-bar w-75">
                  <div class="card-body">

                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-3">
                          <label class="form-label">Name</label>
                          <input
                            name='product_name'
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            placeholder="Product name" />
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="mb-3">
                          <label class="form-label">Price</label>
                          <input
                            onChange={handleInputChange} name='price' type="number" class="form-control" placeholder="eg: 25" />
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <div class="mb-3">
                          <label class="form-label">Old Price</label>
                          <input
                            onChange={handleInputChange} name='old_price' type="number" class="form-control" placeholder="Discount price eg: $35" />
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
                      <div class="col-sm-3">
                        <div class="mb-3">
                          <label class="form-label">SKU</label>
                          <input
                            name='sku'
                            onChange={handleInputChange}
                            type="text" class="form-control"
                            placeholder="eg: DH-54KDF" />
                        </div>
                      </div>

                      <div class="col-sm-3">
                        <div class="mb-3">
                          <label class="form-label">Warranty</label>
                          <input
                            name='warranty'
                            onChange={handleInputChange}
                            type="number" class="form-control"
                            placeholder="eg: 2" />
                        </div>
                      </div>

                    </div>
                    <div className='row'>
                      <div className="col-md-6 mb-3">
                        <label for="image" className="form-label">
                          Upload images
                        </label>
                        <div>
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
                      </div>
                    </div>
                    <div className='row'>
                      <div className="mb-3">
                        <label for="image" className="form-label">
                          Uploaded images
                        </label>
                        <div className='border'>
                          <div className="image-grid d-flex">
                            {imagePreviews.map((image) => (
                              <div key={image.id} className="bg-white image-preview-container w-25 h-25 position-relative">
                                <div className='d-flex justify-content-end align-items-start position-absolute top-0 end-0 p-2'>
                                  <FontAwesomeIcon
                                    onClick={() => handleRemoveImage(image.id)}
                                    icon={faTimes}
                                    size='lg'
                                    className='cursor-pointer bg-danger rounded-circle p-1 text-white'
                                    style={{ transition: 'background-color 0.3s ease-in-out' }}
                                  />

                                </div>

                                <img src={image.src} alt="Preview" className="p-1 preview-image img-fluid" />



                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="row add-color">
                      <div>
                        {variations.map((variation, index) => (
                          <div key={index} className='row'>
                            <div class="col-sm-2">
                              <div class="mb-3">
                                <input
                                  className='p-2 m-1 form-control'
                                  type="text"
                                  value={variation.color}
                                  onChange={(e) => handleVariationChange(index, 'color', e.target.value)}
                                  placeholder="Color"
                                />
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="mb-3">
                                <input
                                  className='p-2 m-1 form-control'
                                  type="number"
                                  value={variation.quantity}
                                  onChange={(e) => handleVariationChange(index, 'quantity', parseInt(e.target.value, 10))}
                                  placeholder="Quantity"
                                />
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="mb-3">
                                <input
                                  className='p-2 m-1 form-control'
                                  type="number"
                                  value={variation.price}
                                  onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value))}
                                  placeholder="Price"
                                />
                              </div>
                            </div>
                            <div className="col-sm-3">
                              
                                <input
                                  className='p-2 m-1 form-control'
                                  type="file"
                                  onChange={(e) => handleVariationChange(index, 'image', e.target.files[0])}
                                />
                              
                            </div>
                            <div class="col-sm-2">
                              <button type="button" className='btn btn-danger m-1' onClick={() => removeVariation(index)}>
                                <FontAwesomeIcon icon={faTrash} className="link-icon" />
                              </button>
                            </div>
                          </div>

                        ))}
                        <button type="button" className='btn btn-secondary m-1' onClick={addVariation}>
                          <FontAwesomeIcon icon={faPlus} className="link-icon" /> Add Color
                        </button>
                      </div>
                    </div>
                    <div class="row add-size mt-3">
                      <div>
                        {sizes.map((size, index) => (
                          <div key={index} className='row'>

                            <div class="col-sm-2">
                              <div class="mb-3">
                                <input
                                  className='p-2 m-1 form-control'
                                  type="text"
                                  value={size.size}
                                  onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                  placeholder="Size"
                                />
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="mb-3">
                                <input
                                  className='p-2 m-1 form-control'
                                  type="number"
                                  value={size.quantity}
                                  onChange={(e) => handleSizeChange(index, 'quantity', parseInt(e.target.value, 10))}
                                  placeholder="Quantity"
                                />
                              </div>
                            </div>

                            <div class="col-sm-2">
                              <button type="button" className='btn btn-danger m-1' onClick={() => removeSize(index)}>
                                <FontAwesomeIcon icon={faTrash} className="link-icon" />
                              </button>
                            </div>
                          </div>

                        ))}
                        <button type="button" className='btn btn-secondary m-1' onClick={addSize}>
                          <FontAwesomeIcon icon={faPlus} className="link-icon" /> Add Size
                        </button>
                      </div>
                    </div>
                    <div class="row  mb-2">
                      <div className="col-md-12 grid-margin stretch-card">
                        <div className="" style={parentContainerStyle}>
                          <div className="card-body h-auto">
                            <h4 className="card-title">Product Description</h4>
                            <p className="text-muted mb-3">Details</p>
                            <ReactQuill
                              value={content}
                              onChange={setContent}
                              // onChange={handleInputChange}
                              style={editorStyle}
                              modules={{
                                toolbar: {
                                  container: toolbarOptions,
                                },
                              }}
                              formats={[
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'color',
                                'blockquote',
                                'code-block',
                                'list',
                                'bullet',
                                'header',
                                'image',
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className='right-side-bar card w-25 ms-2'>
                  <div class="card-body">

                    <div class="">
                      <div class="mb-3">
                        <label for="statusSelection" class="form-label">Category</label>
                        <select
                          name='cat_id'
                          onChange={handleInputChange}
                          class="form-select"
                          id="statusSelection">
                          <option selected disabled>Select Category</option>
                          {categories?.map((category, key) =>
                            <option value={category.id} >
                              {category.cat_name}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div class="">
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
                    <div class="">
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
                            <option value={brand.id} >
                              {brand.brand_name}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="offerSelection" class="form-label">Is offer?</label>
                      <select
                        class="form-select"
                        name='offer'
                        onChange={handleInputChange}
                        id="offerSelection">
                        <option selected disabled>Select</option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    </div>
                    {/* <div class="mb-3">
                      <label for="statusSelection" class="form-label">Status</label>
                      <select
                        class="form-select"
                        name='status'
                        onChange={handleInputChange}
                        id="statusSelection">
                        <option selected disabled>Select Status</option>
                        <option value={"active"}>Active</option>
                        <option value={"inactive"}>Inactive</option>
                      </select>
                    </div> */}


                  </div>
                </div>
              </div>
            </form>

          </div >

        ) : (

          <p>You don't have permission to view this component.</p>
        )
      }
    </div >

  );
};

export default NewProducts;