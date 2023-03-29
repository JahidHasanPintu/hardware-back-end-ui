// import React from 'react';

// const Modal = () => {
//     return (
//         <div class="modal fade" id="updateBrandModal" tabindex="-1" aria-labelledby="updateBrandModalLabel" aria-hidden="true">
//                 <div class="modal-dialog">
//                     <div class="modal-content">
//                         <div class="modal-header">
//                             <h5 class="modal-title" id="updateBrandModalLabel">Change Brand Details</h5>
//                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
//                         </div>
//                         <div class="modal-body">
//                             <form
//                                 className="forms-sample row"
//                                 id="from_input"
//                                 encType="multipart/form-data"
//                             // onSubmit={() => handleSubmit(singleBrand.brand_id)}
//                             >
//                                 <div className="col-md-4">
//                                     <label htmlFor="name" className="form-label">
//                                         Brand Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="name"
//                                         autoComplete="off"
//                                         name="brand_name"
//                                         defaultValue={singleBrand.brand_name}
//                                         placeholder="Brand Name"
//                                         value={singleBrand.brand_name}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4">
//                                     <label htmlFor="image" className="form-label">
//                                         Image
//                                     </label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         id="image"
//                                         name="brand_image"
//                                         placeholder="Images"
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-4">
//                                     <label htmlFor="status" className="form-label">
//                                         Status
//                                     </label>
//                                     <select
//                                         name="status"
//                                         id="status"
//                                         className="form-control"
//                                         // value={status}
//                                         defaultValue={singleBrand.status}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="active">Active</option>
//                                         <option value="inactive">Inactive</option>
//                                     </select>
//                                 </div>

//                                 <div className="form-check col-md-4"></div>
//                                 <div className="form-check col-md-4"></div>
//                                 <div className="form-check col-md-4">
//                                 </div>
//                             </form>
//                         </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="submit" onClick={() => handleSubmit(singleBrand.brand_id)} class="btn btn-primary">Update</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     );
// };

// export default Modal;