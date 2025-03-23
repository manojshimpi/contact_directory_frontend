import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterData } from '../store/userSlice/userActions';
import { toast } from 'react-toastify';
import { useGoogleAuth } from '../utils/GoogleAuth/googleAuth';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state)=>{
    return state.user.user;
  })
  
  const {status,NormalRegisterdata} = userdata;
  // Use global Google authentication function
  const googleLogin = useGoogleAuth(
    (user, token) => {
      console.log("🎉 User Logged In:", user);
      navigate("/user"); // Redirect after success
    },
    (error) => {
      console.error("❌ Login Failed:", error);
    }
  );

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter full name!'),
    email: Yup.string().email('Please enter a valid Email address!').required('Please enter email ID!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters!').required('Please enter your password!'),
  });

  const handleSubmit = (values) => {
    console.log("🎉 Form Submitted", values);
    dispatch(postRegisterData(values));
    toast.success("Register Successfully");
    // Add your form submission logic here, such as API call or form data processing
  };

  return (
    <>
      <div>
        <main>
          <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center py-4">
                      <a href="index.html" className="logo d-flex align-items-center w-auto">
                        <img src="assets/img/logo.png" alt />
                        <span className="d-none d-lg-block">NiceAdmin</span>
                      </a>
                    </div>{/* End Logo */}
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                          <p className="text-center small">Enter your personal details to create an account</p>
                        </div>
                        <Formik
                          initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            
                          }}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                        >
                          {({ touched, errors }) => (
                            <Form className="row g-3 needs-validation" noValidate>
                              <div className="col-12">
                                <label htmlFor="yourName" className="form-label">Full Name</label>
                                <Field
                                  type="text"
                                  name="name"
                                  className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                  id="yourName"
                                />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                              </div>
                              <div className="col-12">
                                <label htmlFor="yourEmail" className="form-label">Email ID</label>
                                <Field
                                  type="email"
                                  name="email"
                                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                  id="yourEmail"
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                              </div>
                        
                              <div className="col-12">
                                <label htmlFor="yourPassword" className="form-label">Password</label>
                                <Field
                                  type="password"
                                  name="password"
                                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                  id="yourPassword"
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                              </div>
                            
                              <div className="col-12">
                                <button className="btn btn-primary w-100" type="submit">
                                  Create Account
                                </button>
                              </div>
                              <div className="col-12">
                                <p className="small mb-0">
                                  Already have an account? <NavLink to="/login">Log in</NavLink>
                                </p>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <button
                        onClick={googleLogin}
                        className="btn btn-google w-100 d-flex justify-content-center align-items-center p-3 border rounded-4 shadow-lg"
                      >
                        <i className="fab fa-google me-3" style={{ fontSize: "24px" }}></i> {/* Google icon from FontAwesome */}
                        <span className="text-white fs-5 fw-semibold">Login with Google</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main> {/* End #main */}
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short" />
        </a>
      </div>
    </>
  );
}

export default Register;
