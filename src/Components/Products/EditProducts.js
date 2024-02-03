import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import useBrand from '../../hooks/useBrand';
import useCategories from '../../hooks/useCategories';
import useSubCategories from '../../hooks/useSubCategories';
import { useLocation, useNavigate } from 'react-router-dom';
import getBaseUrl from '../BaseURL/getBaseUrl';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useProductByID } from '../../hooks/useProductByID ';

const EditProducts = () => {
  const baseUrl = getBaseUrl();
  const [categories] = useCategories();
  const [subCategories] = useSubCategories();
  const [brands] = useBrand();

  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [productQunatity, setProductQunatity] = useState('');
  const [productCat, setProductCat] = useState(product.cat_id || '');
  const [subCat, setSubCat] = useState(product.subcat_id || '');
  const [brand, setBrand] = useState(product.brand_id || '');
  const [sku, setSku] = useState('');
  const [warranty, setWarranty] = useState('');
  const [isOffer, setIsOffer] = useState(product.isOffer ||'');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variations, setVariations] = useState([]);
  const [newVariations, setNewVariations] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [newSizes, setNewSizes] = useState([]);
  const [singleProduct, loading] = useProductByID(product.id);
  const [removedImages, setRemovedImages] = useState([]);
  const [removedVariation, setRemovedVariation] = useState([]);
  const [removedSizes, setRemovedSizes] = useState([]);

  const handleRemoveImage = (imageURL) => {
    const removedImage = imagePreviews.find((img) => img === imageURL);

    if (removedImage) {

      setRemovedImages((prevRemovedImages) => [...prevRemovedImages, removedImage]);
      setImagePreviews((prevImagePreviews) =>
        prevImagePreviews.filter((img) => img !== imageURL)
      );
    }
  };


  const handleInputChange = (event) => {

    const input = event.target;
    if (input.files && input.files.length > 0) {
      const imageFiles = Array.from(input.files);
      const imagePreviewsArray = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const reader = new FileReader();

        reader.onload = function (e) {
          setImagePreviews((prevImagePreviews) => [...prevImagePreviews, e.target.result]);
        };

        reader.readAsDataURL(file);
      }
    }



    const { name, value, files } = event.target;
    const product = location.state.product;

    if (name === 'product_name') {
      console.log(value);
      setProductName(value || product.name);
    } else if (name === 'images') {
      setProductImage(files[0]);
    } else if (name === 'description') {
      console.log(value);
      setProductDescription(value || product.description);
    } else if (name === 'price') {
      setProductPrice(value || product.price);
    } else if (name === 'old_price') {
      setOldPrice(value);
    } else if (name === 'quantity') {
      setProductQunatity(value || product.quantity);
    } else if (name === 'cat_id') {
      setProductCat(value || product.cat_id);
    } else if (name === 'brand_id') {
      setBrand(value || product.brand_id);
    } else if (name === 'subcat_id') {
      setSubCat(value || product.subcat_id);
    }
    else if (name === 'sku') {
      setSku(value);
    } else if (name === 'warranty') {
      setWarranty(value);
    } else if (name === 'offer') {
      setIsOffer(value);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('images', productImage);
    formData.append('description', content);
    formData.append('price', productPrice);
    formData.append('old_price', oldPrice);
    formData.append('quantity', productQunatity);
    formData.append('cat_id', productCat);
    formData.append('brand_id', brand);
    formData.append('subcat_id', subCat);
    formData.append('warranty', warranty);
    formData.append('sku', sku);
    formData.append('offer', isOffer);
    formData.append('removedImages', removedImages);
    formData.append('removedVariations', removedVariation);
    formData.append('removedSizes', removedSizes);
    // Convert variations array to a JSON string
    const variationsJson = JSON.stringify(newVariations);
    const sizesJson = JSON.stringify(newSizes);
    // Append the variations JSON string to the form data
    formData.append('variations', variationsJson);
    formData.append('sizes', sizesJson);

    try {
      const response = await axios.put(
        `${baseUrl}/products/${product.id}`,
        formData,
        // formValue,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      newVariations.forEach(async (variation, index) => {
        const variationsFormData = new FormData();
        variationsFormData.append('product_id', product.id);
        variationsFormData.append('color', variation.color);
        variationsFormData.append('quantity', variation.quantity);
        variationsFormData.append('price', variation.price);
        variationsFormData.append('images', variation.image);
        const responseVariations = await axios.post(
          `${baseUrl}/products/variation/create`,
          variationsFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      });


      console.log(response.data);

      toast.success('product updated successfully.');
      navigate('/products')

    } catch (error) {
      console.error(error);

      toast.error('Failed to update product.');
    }
  };



  const editorStyle = {
    height: '400px',
    width: '100%',
  };

  const [content, setContent] = useState(product.description || '');

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




  // Function to handle adding a new variation
  const addSize = () => {
    const addNewSize = {
      size: '',
      quantity: 0,
    };
    setSizes([...sizes, addNewSize]);
    setNewSizes([...newSizes, addNewSize])
  };
  const addVariation = () => {
    const addNewVariation = {
      color: '',
      quantity: 0,
      price: 0,
      images: null, // Initialize image with null or any default value
    };
    setVariations([...variations, addNewVariation]);
    setNewVariations([...newVariations, addNewVariation]);
  };

  // Function to handle removing a variation
  const removeSize = (index, size) => {
    const updatedSize = [...sizes];
    updatedSize.splice(index, 1);
    setSizes(updatedSize);

    setRemovedSizes((prevRemovedSizes) => [...prevRemovedSizes, size.id]);
  };
  const removeVariation = (index, variation) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
    setRemovedVariation((prevRemovedVariation) => [...prevRemovedVariation, variation.id]);
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

  useEffect(() => {
    if (singleProduct?.variations) {
      setVariations(singleProduct.variations);
    }
    if (singleProduct?.sizes) {
      setSizes(singleProduct.sizes);
    }
    if (singleProduct?.images) {
      setImagePreviews(singleProduct.images);
    }
  }, [singleProduct]);


  return (
    <div className='text-start '>

      <form
        id="from_input"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div class="card top-bar mb-2">
          <div class="card-body d-flex justify-content-between">
            <div className='title'>
              <h5 class="card-title">Edit Products</h5>
              <h6 class="card-subtitle mb-2 text-muted">Update product details</h6>
            </div>
            <div className='publish-button'>
              <button type="submit" class="btn btn-primary submit">
                Update
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
                      defaultValue={product.name}
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
                      defaultValue={product.price}
                      onChange={handleInputChange} name='price' type="number" class="form-control" placeholder="eg: $25" />
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="mb-3">
                    <label class="form-label">Old Price</label>
                    <input
                      defaultValue={product.oldPrice}
                      onChange={handleInputChange} name='old_price' type="number" class="form-control" placeholder="Discount price eg: $35" />
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="mb-3">
                    <label class="form-label">Quantiy</label>
                    <input
                      name='quantity'
                      defaultValue={product.quantity}
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
                      defaultValue={singleProduct?.sku}
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
                      defaultValue={singleProduct?.warranty}
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
                    Images
                  </label>
                  <div className='border'>
                    <div className="image-grid d-flex">
                      {imagePreviews.map((image) => (
                        <div key={image.id} className="bg-white image-preview-container w-25 h-25 position-relative">
                          <div className='d-flex justify-content-end align-items-start position-absolute top-0 end-0 p-2'>
                            <FontAwesomeIcon
                              onClick={() => handleRemoveImage(image)}
                              icon={faTimes}
                              size='lg'
                              className='cursor-pointer bg-danger rounded-circle p-1 text-white'
                              style={{ transition: 'background-color 0.3s ease-in-out' }}
                            />

                          </div>
                          <img src={image.src || image} alt="Preview" className="p-1 m-1 preview-image img-fluid img-thumbnail" />
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
                      <div className="col-sm-2">

                        <input
                          className='p-2 m-1 form-control'
                          type="file"
                          onChange={(e) => handleVariationChange(index, 'image', e.target.files[0])}
                        />

                      </div>
                      <div class="col-sm-2">
                        <img src={variation.images} alt='' className='img-fluid img-thumbnail  align-self-center' style={{ maxWidth: '50px', maxHeight: '50px' }} />
                      </div>
                      <div class="col-sm-2">
                        <button type="button" className='btn btn-danger m-1' onClick={() => removeVariation(index, variation)}>
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
                        <button type="button" className='btn btn-danger m-1' onClick={() => removeSize(index, size)}>
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
                        defaultValue={product.description}
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
                    value={productCat}
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
                    value={subCat}
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
                    value={brand}
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
                  
                  value={isOffer}
                  id="offerSelection">
                  <option selected disabled>Select</option>
                  
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>



            </div>
          </div>
        </div>
      </form>

    </div >
  );
};

export default EditProducts;