import React from 'react';

const NewProducts = () => {
    return (
        <div className='text-start '>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Upload Product</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Add new product</h6>
                    <form>
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control" placeholder="Product name" />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Category</label>
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Category</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Sub Category</label>
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Subcategories</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="brandSelection" class="form-label">Brand</label>
                                    <select class="form-select" id="brandSelection">
                                        <option selected disabled>Select Brand</option>
                                        <option>Oppo</option>
                                        <option>Redmi</option>
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
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            placeholder="Email"
                        />
                        </div>
                        <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Price</label>
                                    <input type="number" class="form-control" placeholder="eg: $25" />
                                </div>
                            </div>
                        <div class="col-sm-3">
                                <div class="mb-3">
                                    <label class="form-label">Quantiy</label>
                                    <input type="number" class="form-control" placeholder="eg: 52" />
                                </div>
                            </div>

                        <div class="col-sm-3">
                                <div class="mb-3">
                                    <label for="statusSelection" class="form-label">Status</label>
                                    <select class="form-select" id="statusSelection">
                                        <option selected disabled>Select Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
					<div class="col-md-12 grid-margin stretch-card">
						<div class="card">
							<div class="card-body">
								<h4 class="card-title">Product Description</h4>
								<p class="text-muted mb-3">Details</p>
								<textarea class="form-control" name="tinymce" id="easyMdeExample" rows="10"></textarea>
							</div>
						</div>
					</div>
				</div>

                    </form>
                    <button type="button" class="btn btn-primary submit">
                        submit
                    </button>
                </div>
            </div>


        </div>
    );
};

export default NewProducts;