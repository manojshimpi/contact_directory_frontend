import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, postUserData } from '../../store/userSlice/userActions';

function ContactListpage() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>{
    return state.user;
  })
  const { status,userData ,postUserdetails } = user;

  const handleAddUser = () => {
    dispatch(
      postUserData({
        name: "Manoj Shimpi",
        email: "manoj@gmail.com",
        phone: "9876543210",
        address: "456 Another St, Some City",
      })
    );
  };

  useEffect(()=>{
    dispatch(fetchUserData())
  },[dispatch])
  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      ContactListpage1{JSON.stringify(userData,null,2)}
      <button onClick={handleAddUser}>Add User</button>
      <h1>Post user Data { JSON.stringify(postUserdetails,null,2)}</h1>
      </div>
      
  )
}

export default ContactListpage