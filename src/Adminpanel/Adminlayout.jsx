import React, { Suspense, useEffect } from 'react'
import Header from './Component/Header'
import Leftsidemenu from './Component/Leftsidemenu'
import Pagetitle from './Component/Pagetitle'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './Component/Footer'
import PrivateRoute from '../utils/ProtectedRoute/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../store/userSlice/userActions'

// Lazy load pages
const Dashboard = React.lazy(() => import('./Pages/Dashboard'))
const Profile = React.lazy(() => import('./Pages/Profile'))
const Addcontact = React.lazy(() => import('./Pages/Addcontact'))
const ContactListpage = React.lazy(() => import('./Pages/ContactListpage'))
const ContactDetailsPage = React.lazy(() => import('./Pages/ContactDetailsPage'))
const FavoriteContactsPage = React.lazy(() => import('./Pages/FavoriteContactsPage'))
const GroupsPage = React.lazy(() => import('./Pages/GroupsPage'))
const AssignContactstoGroups = React.lazy(() => import('./Pages/AssignContactstoGroups'))
const ChangePasswordPage = React.lazy(() => import('./Pages/ChangePasswordPage'))
const Faq = React.lazy(() => import('./Pages/Faq'))
const ContactSupportPage = React.lazy(() => import('./Pages/ContactSupportPage'))
const Showallmessage = React.lazy(() => import('./Pages/Showallmessage'))
const Notificationall = React.lazy(() => import('./Notificationall'))
const ErrorFound = React.lazy(() => import('./ErrorFound'))

function Adminlayout() {
    const navigate = useNavigate(); // useNavigate hook to navigate to routes
    const dispatch = useDispatch();
    const usertype = useSelector((state)=> state.user.user)
    const {userData } = usertype;
    
    useEffect(()=>{
     dispatch(fetchUserData())
    },[dispatch])

    useEffect(()=>{
       if(userData.type==='USER'){
        navigate('/user')
       }
       },[navigate,userData])

    return (
        <>
            <Header userdataglobal={userData}/>
            <Leftsidemenu />
            <main id="main" className="main">
             {/* <h1>{JSON.stringify(userData,null,2)}</h1>  */}
                <Pagetitle />
                <Suspense fallback={
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path="/addcontact" element={<PrivateRoute><Addcontact /></PrivateRoute>} />
                        <Route path="/viewcontact" element={<PrivateRoute><ContactListpage /></PrivateRoute>} />
                        <Route path='/contactdeatils' element={<PrivateRoute><ContactDetailsPage /></PrivateRoute>} />
                        <Route path='/favoritecontact' element={<PrivateRoute><FavoriteContactsPage /></PrivateRoute>} />
                        <Route path='/groupage' element={<PrivateRoute><GroupsPage /></PrivateRoute>} />
                        <Route path='/assigngroup' element={<PrivateRoute><AssignContactstoGroups /></PrivateRoute>} />
                        <Route path='/changepassword' element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />
                        <Route path='/faq' element={<Faq />} /> {/* No authentication required */}
                        <Route path='/contact' element={<ContactSupportPage />} /> {/* No authentication required */}
                        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path='/showallmessage' element={<PrivateRoute><Showallmessage /></PrivateRoute>} />
                        <Route path='/allnotification' element={<PrivateRoute><Notificationall /></PrivateRoute>} />
                        <Route path='*' element={<ErrorFound />} />
                    </Routes>

                </Suspense>
            </main>{/* End #main */}
            <Footer />
        </>
    )
}

export default Adminlayout;
