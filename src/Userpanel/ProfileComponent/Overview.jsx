import React from 'react';
import { useSelector } from 'react-redux';  // Import useSelector to get user data from Redux store

function Overview() {
  const userData = useSelector((state) => state.user.user.userData);  // Fetch user data from the store

  // If userData is undefined or not available, you can use placeholders or handle loading states.
  if (!userData) {
    return <p>Loading...</p>; // Or you could show a loading spinner or a message until data is fetched.
  }

  return (
    <div className="tab-pane fade show active profile-overview" id="profile-overview">
      <h5 className="card-title">About</h5>
      <p className="small fst-italic">{userData.about || 'No information available'}</p>  {/* Dynamically display 'About' */}
      
      <h5 className="card-title">Profile Details</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Full Name</div>
        <div className="col-lg-9 col-md-8">{userData.name || 'N/A'}</div>  {/* Dynamically display Full Name */}
      </div>
      
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Country</div>
        <div className="col-lg-9 col-md-8">{userData.country_name || 'N/A'}</div>  {/* Dynamically display Country */}
      </div>
     
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-9 col-md-8">{userData.phone_number || 'N/A'}</div>  {/* Dynamically display Phone */}
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-9 col-md-8">{userData.email || 'N/A'}</div>  {/* Dynamically display Email */}
      </div>
    </div>
  );
}

export default Overview;
