import React, { useEffect } from 'react'
import ProfileForm from './ProfileForm'
import SettingForm from './SettingForm'
import ChangePasswordPage from './ChangePasswordPage'
import Overview from './Overview'
import { fetchUserData } from '../../store/userSlice/userActions'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user.userData);
  const {name} = userData;
  useEffect(()=>{
     dispatch(fetchUserData())
  },[dispatch])
  return (
   <>
   
   
 <section className="section profile">
  <div className="row">
    <div className="col-xl-4">
      <div className="card">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
          <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
          <h2>{name?name:'NA'}</h2>
           <div className="social-links mt-2">
            <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
            <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
            <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-8">
      <div className="card">
        <div className="card-body pt-3">
          {/* Bordered Tabs */}
          <ul className="nav nav-tabs nav-tabs-bordered">
            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
            </li>
          </ul>
          <div className="tab-content pt-2">
            
            <Overview/>
            <ProfileForm/>
            <SettingForm/>
            <ChangePasswordPage/>
          
          </div>{/* End Bordered Tabs */}
        </div>
      </div>
    </div>
  </div>
</section>

   
   
   </>
  )
}

export default Profile