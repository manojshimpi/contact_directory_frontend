import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchContacts, getContactByuserId, updateConatcts } from '../../../store/userSlice/actionContact';
import { useLocation, useNavigate } from 'react-router-dom';

const EditContactModal = ({ contactId, handleClose, pagination, filters, sort }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { contactsingleRecord, loading, error } = useSelector((state) => state.user.contact);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (contactId) {
      dispatch(getContactByuserId(contactId));
    }
  }, [dispatch, contactId]);

  const initialValues = {
    id: contactsingleRecord?._id || '',
    name: contactsingleRecord?.name || '',
    email: contactsingleRecord?.email || '',
    mobile: contactsingleRecord?.mobile || '',
    category: contactsingleRecord?.category || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter full name!'),
    email: Yup.string().email('Please enter a valid Email address!').required('Please enter email ID!'),
    mobile: Yup.string().min(10, 'Mobile number must be at least 10 digits!').required('Please enter mobile number!'),
    category: Yup.string().required('Please select a category!'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (initialValues.id) {
      try {
        await dispatch(updateConatcts(values)).then((action) => {
          if (action.payload && action.payload.status === '200') {
            if (modalRef.current) {
              modalRef.current.style.display = 'none';
              const backdrop = document.querySelector('.modal-backdrop');
              if (backdrop) {
                backdrop.style.display = 'none';
              }
            }

            dispatch({
              type: 'contact/updateSingleContact',
              payload: values, 
            });

            dispatch(fetchContacts({ page: pagination?.currentPage || 1, filters, sort }));

            handleClose();
            
            if (location.pathname === '/user/viewcontact') {
              navigate('/user/viewcontact');
            } else {
              navigate('/user/favoritecontact');
            }
          }
        });
      } catch (err) {
        console.error("Error updating contact:", err);
      }
    }
  };

  const modalStyle = {
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
      borderRadius: '15px',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
      borderBottom: '2px solid #ddd',
      paddingBottom: '20px',
    },
    modalTitle: {
      color: '#333',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    formField: {
      borderRadius: '10px',
      padding: '12px 15px',
      transition: 'border-color 0.3s ease-in-out',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      borderRadius: '30px',
      padding: '10px 20px',
      fontSize: '16px',
      width: '50%',
      transition: 'background-color 0.3s ease-in-out',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      borderColor: '#0056b3',
    },
  };

  return (
    <div
      className="modal fade"
      id="basicModal"
      tabIndex="-1"
      aria-labelledby="basicModalLabel"
      aria-hidden="true"
      ref={modalRef}
      onClick={handleClose}
      style={modalStyle.backdrop}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={modalStyle.modalContent}>
          <div className="modal-header" style={modalStyle.modalHeader}>
            <h5 className="modal-title" id="basicModalLabel" style={modalStyle.modalTitle}>
              Edit Contact
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ touched, errors }) => (
                <Form className="row g-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <Field
                        type="hidden"
                        name="id"
                        className="form-control"
                        id="inputName"
                      />
                      <label htmlFor="inputName" className="form-label">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                        id="inputName"
                        placeholder="Enter your full name"
                        style={modalStyle.formField}
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="inputEmail" className="form-label">
                        Email ID
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                        id="inputEmail"
                        placeholder="Enter your email ID"
                        style={modalStyle.formField}
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="inputMobile" className="form-label">
                        Mobile No
                      </label>
                      <Field
                        type="text"
                        name="mobile"
                        className={`form-control ${touched.mobile && errors.mobile ? 'is-invalid' : ''}`}
                        id="inputMobile"
                        placeholder="Enter your mobile number"
                        style={modalStyle.formField}
                      />
                      <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="inputCategory" className="form-label">
                        Category
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}
                        id="inputCategory"
                        style={modalStyle.formField}
                      >
                        <option value="">Select Category</option>
                        <option value="Family">Family</option>
                        <option value="Personal">Personal</option>
                        <option value="Friends">Friends</option>
                        <option value="Colleagues">Colleagues</option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="invalid-feedback" />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 mb-3"
                        style={modalStyle.button}
                        onMouseEnter={(e) => e.target.style.backgroundColor = modalStyle.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = modalStyle.button.backgroundColor}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
