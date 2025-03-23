import React, { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact, fetchContacts } from '../../../store/userSlice/actionContact';
import './addContact.css'

function Addcontact() {
  const dispatch = useDispatch();
  const statusCheck = useSelector((state) => state.user.contact.error);

  useEffect(() => {  
    dispatch(fetchContacts());
  }, [dispatch]);



  // Initialize form values
  let initialValuess = {
    name: '',
    email: '',
    mobile: '',
    category: ''
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter full name!'),
    email: Yup.string().email('Please enter a valid Email address!').required('Please enter email ID!'),
    mobile: Yup.string().min(10, 'Mobile number must be at least 10 digits!').required('Please enter mobile number!'),
    category: Yup.string().required('Please select a category!'),
  });



  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values))
     .then((action) => {
        
        if (action.payload && action.payload.status === '201') {
          resetForm(); // Reset the form if the status is 201
        }
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
      });
  };
  

  return (
    <div className="card shadow-lg my-5 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h5 className="card-title text-center mb-4 text-uppercase font-weight-bold">Add New Contact</h5>
        
        {/* Vertical Form */}
        <Formik
            initialValues={initialValuess}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
        {({ touched, errors }) => (
          <Form className="row g-3">
            {/* Left Gap (2 columns) */}
            <div className="col-md-2"></div>

            {/* Form Fields (Center) */}
            <div className="col-md-8">
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label form-label-custom">Full Name</label>
                <Field 
                  type="text" 
                  name="name" 
                  className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} 
                  id="inputName" 
                  placeholder="Enter your full name" 
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label form-label-custom">Email ID</label>
                <Field 
                  type="text" 
                  name="email" 
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} 
                  id="inputEmail" 
                  placeholder="Enter your email ID" 
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="inputMobile" className="form-label form-label-custom">Mobile No</label>
                <Field 
                  type="text" 
                  name="mobile" 
                  className={`form-control ${touched.mobile && errors.mobile ? 'is-invalid' : ''}`} 
                  id="inputMobile" 
                  placeholder="Enter your mobile number" 
                />
                <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="inputCategory" className="form-label form-label-custom">Category</label>
                <Field 
                  as="select" 
                  name="category" 
                  className={`form-control ${touched.category && errors.category ? 'is-invalid' : ''}`} 
                  id="inputCategory"
                >
                  <option value="">Select Category</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Colleagues">Colleagues</option>
                </Field>
                <ErrorMessage name="category" component="div" className="invalid-feedback" />
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <button 
                  type="submit" 
                  className="btn btn-primary mt-3 mb-3 gradient-custom shadow-sm"
                  style={{ width: '50%' }}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Right Gap (2 columns) */}
            <div className="col-md-2"></div>
          </Form>
        )}
        </Formik>
      </div>
    </div>
  );
}

export default Addcontact;
