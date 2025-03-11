import React from 'react'
import Header from './Component/Header'
import Leftsidemenu from './Component/Leftsidemenu'
import Pagetitle from './Component/Pagetitle'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Footer from './Component/Footer'
import Profile from './Pages/Profile'
import Addcontact from './Pages/Addcontact'
import ContactListpage from './Pages/ContactListpage'
import ContactDetailsPage from './Pages/ContactDetailsPage'
import FavoriteContactsPage from './Pages/FavoriteContactsPage'
import GroupsPage from './Pages/GroupsPage'
import AssignContactstoGroups from './Pages/AssignContactstoGroups'
import ChangePasswordPage from './Pages/ChangePasswordPage'
import Faq from './Pages/Faq'
import ContactSupportPage from './Pages/ContactSupportPage'
import Showallmessage from './Pages/Showallmessage'
import Notificationall from './Notificationall'
import ErrorFound from './ErrorFound'

function Userlayout() {
    return (
        <>
            <Header />
            <Leftsidemenu />
            <main id="main" className="main">
                <Pagetitle />
            <Routes>
               <Route path='/' element={<Dashboard/>} ></Route>
               <Route path='/dashboard' element={<Dashboard/>} ></Route>
               <Route path='/addcontact' element={<Addcontact/>} />
               <Route path='/viewcontact' element={<ContactListpage/>} />
               <Route path='/contactdeatils' element={<ContactDetailsPage/>} />
               <Route path='/favoritecontact' element={<FavoriteContactsPage/>} />
               <Route path='/groupage' element={<GroupsPage/>} />
               <Route path='/assigngroup' element={<AssignContactstoGroups/>} />
               <Route path='/changepassword' element={<ChangePasswordPage/>} />
               <Route path='/faq' element={<Faq/>} />
               <Route path='/contact' element={<ContactSupportPage/>} />
               <Route path='/profile' element={<Profile/>} />
               <Route path='/showallmessage' element={<Showallmessage/>} />
               <Route path='/allnotification' element={<Notificationall/>} />
               <Route path='*' element={<ErrorFound/>} />

            </Routes>

            </main>{/* End #main */}
            <Footer/>
        </>
    )
}

export default Userlayout