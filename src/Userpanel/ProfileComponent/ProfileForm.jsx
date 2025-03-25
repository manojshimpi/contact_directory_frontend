import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateprofileData } from '../../store/userSlice/userActions';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

countries.registerLocale(en);

function ProfileForm() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user.userData);

  const [countryInfo, setCountryInfo] = useState({
    countryName: userData.country_name,
    countryCode: userData.country_code,
    dialCode: userData.dial_code,
  });

  const initialValues = {
    fullName: userData.name || '',
    country: userData.country_name || '',
    phone: userData.phone_number || '', // Ensure this is in E.164 format
    countryName: userData.country_name,
    countryCode: userData.country_code,
    dialCode: userData.dial_code,
    email: userData.email || '',
    about: userData.about || '', // Add about field here
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
      .matches(
        /^\+?[1-9]\d{1,14}$/, // E.164 format regex
        'Phone number must be in E.164 format (e.g., +14155552671)'
      )
      .test('is-valid-phone', 'Phone number is not valid', (value) => {
        try {
          // Remove spaces or any non-numeric characters
          const cleanedValue = value.replace(/\s+/g, '').replace(/[^0-9+]/g, '');

          if (cleanedValue) {
            const phoneNumber = parsePhoneNumber(cleanedValue);

            // Check if the phone number is valid and has at least 7 digits
            return phoneNumber && phoneNumber.isValid() && phoneNumber.nationalNumber.length >= 7;
          }
          return false;
        } catch (error) {
          return false;
        }
      })
      .required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    about: Yup.string().max(500, 'About section must be less than 500 characters'), // Add validation for "about"
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handlePhoneChange = (value, setFieldValue, setFieldError, setFieldTouched) => {
    const phoneValue = value || ''; // If value is undefined or null, set it to an empty string

    // Clean the phone number by removing spaces and non-numeric characters
    const cleanedValue = phoneValue.replace(/\s+/g, '').replace(/[^0-9+]/g, '');

    if (!cleanedValue || cleanedValue.length < 7 || cleanedValue.length > 15) {
      setCountryInfo({
        countryName: '',
        countryCode: '',
        dialCode: '',
      });
      setFieldValue('phone', value);
      setFieldError('phone', 'Phone number must be in E.164 format (e.g., +14155552671)');
      setFieldTouched('phone', true); // Mark the field as touched
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(cleanedValue);

      if (phoneNumber && phoneNumber.isValid()) {
        const countryCode = phoneNumber.country;
        const dialCode = phoneNumber.countryCallingCode;
        const countryName = countries.getName(countryCode, 'en', { select: 'official' }) || '';

        setCountryInfo({
          countryName: countryName,
          countryCode: countryCode,
          dialCode: `+${dialCode}`,
        });

        setFieldValue('phone', cleanedValue); // Set the phone number in E.164 format
        setFieldValue('countryName', countryName); // Update country dynamically based on the phone number
        setFieldError('phone', ''); // Clear the error message when the phone number is valid
        setFieldTouched('phone', true); // Ensure the field is marked as touched
      } else {
        setCountryInfo({
          countryName: '',
          countryCode: '',
          dialCode: '',
        });
        setFieldValue('phone', cleanedValue); // Reset the value if invalid
        setFieldError('phone', 'Invalid phone number'); // Set the error message
        setFieldTouched('phone', true); // Mark the field as touched
        setFieldValue('countryName', '');  // Reset country field if invalid phone number
      }
    } catch (error) {
      console.error('Error parsing phone number:', error);
      setCountryInfo({
        countryName: '',
        countryCode: '',
        dialCode: '',
      });
      setFieldError('phone', 'Error parsing phone number'); // Set the error message
      setFieldTouched('phone', true); // Mark the field as touched
      setFieldValue('countryName', '');  // Reset country field if error occurs
    }
  };

  const handlePhoneBlur = (setFieldTouched, setFieldError, setFieldValue, value) => {
    setFieldTouched('phone', true); // Mark the field as touched
    
    // Ensure value is a valid string before processing
    const phoneValue = value || ''; // If value is undefined or null, set it to an empty string
    
    // Short-circuit: If value is empty, show "required" error
    if (!phoneValue) return setFieldError('phone', 'Phone number is required');
  
    const cleanedValue = phoneValue.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  
    // Short-circuit: If the cleaned value exceeds 15 characters, show "too long" error
    if (cleanedValue.length > 15) return setFieldError('phone', 'Phone number is too long');
  
    try {
      const phoneNumber = parsePhoneNumber(cleanedValue);
      if (phoneNumber?.isValid()) {
        setFieldError('phone', ''); // Clear error if valid
        setFieldValue('phone', cleanedValue); // Set valid phone number
      } else {
        setFieldError('phone', 'Invalid phone number'); // Invalid phone
      }
    } catch (error) {
      console.error('Error parsing phone number on blur:', error);
      setFieldError('phone', 'Error parsing phone number');
    }
  };

  


  const handlePhoneFocus = (setFieldTouched, setFieldError, setFieldValue, value) => {
    setFieldTouched('phone', true); // Mark the field as touched when focus occurs
  
    // Ensure value is a valid string before processing
    const phoneValue = value || ''; // If value is undefined or null, set it to an empty string
  
    // Clean the phone number by removing spaces and non-numeric characters
    const cleanedValue = phoneValue.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
  
    // Short-circuit: If cleaned value exceeds 15 characters, show "too long" error
    if (cleanedValue.length > 15) return setFieldError('phone', 'Phone number is too long');
  
    try {
      const phoneNumber = parsePhoneNumber(cleanedValue);
      if (phoneNumber?.isValid()) {
        setFieldError('phone', ''); // Clear error if valid
        setFieldValue('phone', cleanedValue); // Set valid phone number
      } else {
        setFieldError('phone', 'Invalid phone number'); // Invalid phone number
      }
    } catch (error) {
      console.error('Error parsing phone number on focus:', error);
      setFieldError('phone', 'Error parsing phone number');
    }
  };
  
  const handleSubmit = async (values) => {
    // Normalize Email
    const normalizedEmail = values.email.trim().toLowerCase();

    // Slice Phone Number (Remove Country Code)
    const phoneNumberObject = parsePhoneNumber(values.phone);
    const phoneNumberSlice = phoneNumberObject ? phoneNumberObject.nationalNumber : '';

    // Prepare the data to be sent (for example, to an API)
    const formData = {
      name: values.fullName,
      email: normalizedEmail,
      phone_number: values.phone,  // Storing sliced phone number (without country code)
      country_name: countryInfo.countryName,
      country_code: countryInfo.countryCode,  // Country code from phone input
      dial_code: countryInfo.dialCode,  // Dial code from phone input
      about: values.about, // Add the "about" field value
    };

    await dispatch(updateprofileData(formData));
    await dispatch(fetchUserData());
  };

  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue, setFieldError, setFieldTouched, values }) => (
          <Form>
            {/* Full Name */}
            <div className="row mb-3">
              <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
              <div className="col-md-8 col-lg-9">
                <Field
                  name="fullName"
                  type="text"
                  className="form-control"
                  id="fullName"
                />
                <ErrorMessage name="fullName" component="div" className="text-danger" />
              </div>
            </div>

            {/* Country */}
            <div className="row mb-3">
              <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Country</label>
              <div className="col-md-8 col-lg-9">
                <Field
                  name="country"
                  type="text"
                  className="form-control"
                  id="Country"
                  value={values.countryName}  // Bind countryName dynamically
                  readOnly // Make it read-only since it's auto-updated based on the phone number
                />
                <ErrorMessage name="countryName" component="div" className="text-danger" />
              </div>
            </div>

            {/* Phone Number with Country Flags */}
            <div className="row mb-3">
              <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
              <div className="col-md-8 col-lg-9">
                <PhoneInput
                  international
                  defaultCountry={userData.countryCode || 'US'}
                  value={values.phone}
                  onFocus={(e) => handlePhoneFocus(setFieldTouched, setFieldError, setFieldValue, e.target.value)}
                  onChange={(value) => handlePhoneChange(value, setFieldValue, setFieldError, setFieldTouched)}
                  onBlur={() => handlePhoneBlur(setFieldTouched, setFieldError, setFieldValue, values.phone)}
                  className="form-control"
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phone" component="div" className="error-message text-danger" />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-3">
              <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
              <div className="col-md-8 col-lg-9">
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  id="Email"
                  readOnly
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
            </div>

            {/* About */}
            <div className="row mb-3">
              <label htmlFor="About" className="col-md-4 col-lg-3 col-form-label">About</label>
              <div className="col-md-8 col-lg-9">
                <Field
                  name="about"
                  as="textarea"
                  className="form-control"
                  id="About"
                  rows="3"
                  placeholder="Tell us about yourself"
                />
                <ErrorMessage name="about" component="div" className="text-danger" />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileForm;
