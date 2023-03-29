
import React from 'react';
import useCategories from '../../hooks/useCategories';


const NewSubcategories = () => {
    const [categories] = useCategories();

	
    return (
        <div className='text-start'>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Create Subcategory</h6>

                            <form
                                className="forms-sample row"
                                id="from_input"
                                onChange={""}
                                onSubmit={""}
                            >
                                <div className="col-md-3">
                                    <label for="name" className="form-label">
                                        Subcategory Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        autocomplete="off"
                                        name="brand_name"
                                        value={""}
                                        placeholder="Brand Name"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label for="status" className="form-label">
                                        Parent Category
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-control"
                                        
                                    >
                                        <option >Select Parent Category</option>
                                        {categories?.map((category, key) =>
                                        <option value={category.cat_id} >
                                        {category.cat_name}
                                    </option>
                                        )}

                                        
                                        
                                    </select>
                                </div>
                                {/* <div className="col-md-3">
                                    <label for="image" className="form-label">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="brand_image"
                                        placeholder="Email"
                                    />
                                </div> */}
                                
                                <div className="col-md-3">
                                    <label for="status" className="form-label">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-control"
                                        value={""}
                                    >
                                        <option value="active" selected>
                                            Active
                                        </option>
                                        <option value="inactive">In Active</option>
                                    </select>
                                </div>
                                

                                <div className="form-check col-md-4"></div>
                                <div className="form-check col-md-4"></div>
                                <div className="form-check col-md-4">
                                    <button type="submit" className="btn btn-primary me-2 mt-2 justify-content-end">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSubcategories;